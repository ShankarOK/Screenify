import { type FormEvent, useState } from 'react';
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import ProgressStepper from "~/components/ProgressStepper";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const STEPS = [
    { label: "Uploading", status: "pending" as const },
    { label: "Extracting", status: "pending" as const },
    { label: "Analyzing", status: "pending" as const },
    { label: "Generating", status: "pending" as const },
];

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [showUploadError, setShowUploadError] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const handleFileSelect = (file: File | null) => {
        setFile(file);
        if (file) {
            setShowUploadError(false);
        }
    }

    // Check if all required fields are filled
    const isFormValid = companyName.trim() !== '' && jobTitle.trim() !== '' && file !== null;

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);
        setCurrentStep(0);

        try {
            // Step 1: Uploading resume
            setStatusText('Uploading resume...');
            setCurrentStep(0);
            const uploadedFile = await fs.upload([file]);
            if(!uploadedFile) {
                setStatusText('Error: Failed to upload file');
                setIsProcessing(false);
                return;
            }

            // Step 2: Extracting content
            setStatusText('Extracting content from PDF...');
            setCurrentStep(1);
            const imageFile = await convertPdfToImage(file);
            if(!imageFile.file) {
                setStatusText('Error: Failed to convert PDF to image');
                setIsProcessing(false);
                return;
            }

            const uploadedImage = await fs.upload([imageFile.file]);
            if(!uploadedImage) {
                setStatusText('Error: Failed to upload image');
                setIsProcessing(false);
                return;
            }

            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            }
            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            // Step 3: Analyzing with AI
            setStatusText('Analyzing with AI...');
            setCurrentStep(2);

            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription })
            )
            if (!feedback) {
                setStatusText('Error: Failed to analyze resume');
                setIsProcessing(false);
                return;
            }

            // Step 4: Generating results
            setStatusText('Generating results...');
            setCurrentStep(3);

            const feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0].text;

            data.feedback = JSON.parse(feedbackText);
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText('Analysis complete! Redirecting...');
            
            // Small delay to show completion
            await new Promise(resolve => setTimeout(resolve, 500));
            navigate(`/resume/${uuid}`);
        } catch (error) {
            setStatusText('An error occurred. Please try again.');
            setIsProcessing(false);
            console.error(error);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyNameValue = formData.get('company-name') as string;
        const jobTitleValue = formData.get('job-title') as string;

        // Validate required fields
        if(!companyNameValue || companyNameValue.trim() === '') {
            return;
        }
        if(!jobTitleValue || jobTitleValue.trim() === '') {
            return;
        }
        if(!file) {
            setShowUploadError(true);
            return;
        }

        handleAnalyze({ companyName: companyNameValue, jobTitle: jobTitleValue, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-200/10 rounded-full blur-3xl"></div>
            
            <Navbar />

            <section className="relative z-10 w-full max-w-[850px] mx-auto px-4 lg:px-6 pb-4 lg:pb-5 page-content-spacing">
                {isProcessing ? (
                    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 lg:gap-10 animate-fade-in">
                        {/* Processing Header */}
                        <div className="text-center px-4">
                            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 lg:mb-3">
                                Analyzing Your Resume
                            </h1>
                            <p className="text-base lg:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                                {statusText}
                            </p>
                        </div>

                        {/* Enhanced Progress Stepper */}
                        <div className="w-full">
                            <ProgressStepper 
                                steps={STEPS.map((step, idx) => ({
                                    ...step,
                                    status: idx < currentStep ? "completed" as const : idx === currentStep ? "active" as const : "pending" as const
                                }))}
                                currentStep={currentStep}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        {/* Compact Header Section */}
                        <div className="text-center mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-3">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">AI-Powered Analysis</span>
                            </div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5">
                                Upload Your Resume
                            </h1>
                            <p className="text-sm text-gray-600 max-w-lg mx-auto mb-1">
                                Get instant AI-powered insights and ATS compatibility scoring.
                            </p>
                            <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Your resume stays private and secure
                            </p>
                        </div>

                        {/* Premium Form Card */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-200/60 shadow-2xl p-5 lg:p-6">
                            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
                                {/* Row 1: Company Name | Job Title - Full Width Split */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                                    <div className="form-div w-full">
                                        <label htmlFor="company-name" className="form-label">
                                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Company Name <span className="required-asterisk">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="company-name" 
                                            placeholder="e.g. Google, Stripe, OpenAI" 
                                            id="company-name"
                                            required
                                            disabled={isProcessing}
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            className="custom-input"
                                        />
                                    </div>
                                    <div className="form-div w-full">
                                        <label htmlFor="job-title" className="form-label">
                                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.911 23.911 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Job Title <span className="required-asterisk">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="job-title" 
                                            placeholder="e.g. Software Engineer, Product Designer" 
                                            id="job-title"
                                            required
                                            disabled={isProcessing}
                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            className="custom-input"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Job Description (full width) */}
                                <div className="form-div w-full">
                                    <div className="flex items-center justify-between w-full mb-1.5">
                                        <label htmlFor="job-description" className="form-label mb-0">
                                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Job Description <span className="text-gray-500 font-normal text-xs">(Optional)</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    const text = await navigator.clipboard.readText();
                                                    setJobDescription(text);
                                                    // Trigger auto-resize
                                                    setTimeout(() => {
                                                        const textarea = document.getElementById('job-description') as HTMLTextAreaElement;
                                                        if (textarea) {
                                                            textarea.style.height = 'auto';
                                                            textarea.style.height = `${Math.max(75, textarea.scrollHeight)}px`;
                                                        }
                                                    }, 0);
                                                } catch (err) {
                                                    console.error('Failed to read clipboard:', err);
                                                }
                                            }}
                                            disabled={isProcessing}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Paste from clipboard"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            Paste
                                        </button>
                                    </div>
                                    <textarea 
                                        rows={3} 
                                        name="job-description" 
                                        placeholder="Paste the job description for tailored feedback (optional)" 
                                        id="job-description"
                                        disabled={isProcessing}
                                        value={jobDescription}
                                        onChange={(e) => {
                                            setJobDescription(e.target.value);
                                            const target = e.target as HTMLTextAreaElement;
                                            target.style.height = 'auto';
                                            target.style.height = `${Math.max(75, target.scrollHeight)}px`;
                                        }}
                                        className="custom-textarea"
                                        style={{ minHeight: '75px' }}
                                    />
                                </div>

                                {/* Row 3: Upload Resume (full width) */}
                                <div className="form-div w-full">
                                    <label htmlFor="uploader" className="form-label">
                                        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Upload Resume <span className="required-asterisk">*</span>
                                    </label>
                                    <FileUploader 
                                        onFileSelect={handleFileSelect} 
                                        disabled={isProcessing}
                                        showError={showUploadError}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button 
                                    className={`
                                        primary-button mt-0.5 py-3 text-sm font-semibold rounded-full transition-all duration-300
                                        ${isFormValid && !isProcessing 
                                            ? 'hover:shadow-xl hover:-translate-y-0.5 hover:shadow-blue-500/30' 
                                            : 'opacity-50 pointer-events-none'
                                        }
                                    `}
                                    type="submit"
                                    disabled={!isFormValid || isProcessing}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Analyze Resume
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}
export default Upload
