import { type FormEvent, useState } from 'react';
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Loader from "~/components/Loader";
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
        const jobDescription = formData.get('job-description') as string || '';

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

            <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 lg:py-16">
                {isProcessing ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-10 animate-fade-in">
                        {/* Processing Header */}
                        <div className="text-center mb-4">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6 shadow-lg">
                                <Loader size="lg" />
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                                Analyzing Your Resume
                            </h1>
                            <p className="text-xl text-gray-600 font-medium">{statusText}</p>
                        </div>

                        {/* Enhanced Progress Stepper */}
                        <div className="w-full max-w-4xl">
                            <ProgressStepper 
                                steps={STEPS.map((step, idx) => ({
                                    ...step,
                                    status: idx < currentStep ? "completed" as const : idx === currentStep ? "active" as const : "pending" as const
                                }))}
                                currentStep={currentStep}
                            />
                        </div>

                        {/* Processing Animation */}
                        <div className="flex flex-col items-center gap-4 mt-8">
                            <div className="flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-lg">
                                <Loader size="md" />
                                <span className="text-lg font-semibold text-gray-700">Processing your resume...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-6">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">AI-Powered Analysis</span>
                            </div>
                            {/* <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                                Get <span className="text-gradient">Smart Feedback</span><br />for Your Dream Job
                            </h1> */}
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Upload your resume and get instant AI-powered insights.
                            </p>
                        </div>

                        {/* Enhanced Form Card */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-200/60 shadow-2xl p-8 lg:p-10 max-w-4xl mx-auto">
                            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                                {/* Form Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="form-div">
                                        <label htmlFor="company-name" className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Company Name <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="company-name" 
                                            placeholder="e.g. Google" 
                                            id="company-name"
                                            required
                                            disabled={isProcessing}
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-gray-50/50"
                                        />
                                    </div>
                                    <div className="form-div">
                                        <label htmlFor="job-title" className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.911 23.911 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Job Title <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="job-title" 
                                            placeholder="e.g. Software Engineer" 
                                            id="job-title"
                                            required
                                            disabled={isProcessing}
                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-gray-50/50"
                                        />
                                    </div>
                                </div>

                                <div className="form-div">
                                    <label htmlFor="job-description" className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Job Description <span className="text-gray-500 font-normal text-sm">(Optional)</span>
                                    </label>
                                    <textarea 
                                        rows={4} 
                                        name="job-description" 
                                        placeholder="Paste the job description here for personalized feedback..." 
                                        id="job-description"
                                        disabled={isProcessing}
                                        className="w-full p-4 pt-5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-gray-50/50 resize-y min-h-[100px]"
                                        style={{ minHeight: '100px' }}
                                        onInput={(e) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            target.style.height = 'auto';
                                            target.style.height = `${Math.max(100, target.scrollHeight)}px`;
                                        }}
                                    />
                                </div>

                                <div className="form-div">
                                    <label htmlFor="uploader" className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Upload Resume <span className="text-red-500">*</span>
                                    </label>
                                    <FileUploader 
                                        onFileSelect={handleFileSelect} 
                                        disabled={isProcessing}
                                        showError={showUploadError}
                                    />
                                </div>

                                <button 
                                    className={`
                                        primary-button mt-2 py-4 text-lg font-semibold rounded-full transition-all duration-300
                                        ${isFormValid && !isProcessing 
                                            ? 'hover:shadow-xl hover:-translate-y-0.5 hover:shadow-blue-500/30' 
                                            : 'opacity-50 pointer-events-none'
                                        }
                                    `}
                                    type="submit"
                                    disabled={!isFormValid || isProcessing}
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <Loader size="sm" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Analyze Resume
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Features Preview */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { icon: "📊", title: "ATS Score", desc: "Get your resume's ATS compatibility score" },
                                { icon: "✨", title: "AI Insights", desc: "Receive personalized improvement suggestions" },
                                { icon: "🚀", title: "Fast Analysis", desc: "Get results in seconds, not hours" },
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60">
                                    <span className="text-2xl">{feature.icon}</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                        <p className="text-sm text-gray-600">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}
export default Upload
