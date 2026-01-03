import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '../lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
    disabled?: boolean;
    showError?: boolean;
}

const FileUploader = ({ onFileSelect, disabled = false, showError = false }: FileUploaderProps) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isValidating, setIsValidating] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [internalFile, setInternalFile] = useState<File | null | undefined>(undefined);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (disabled) return;
        
        // Clear any existing interval
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
        
        const file = acceptedFiles[0] || null;
        setInternalFile(file);

        if (file) {
            setIsValidating(true);
            setUploadProgress(0);
            
            // Simulate validation progress
            progressIntervalRef.current = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        if (progressIntervalRef.current) {
                            clearInterval(progressIntervalRef.current);
                            progressIntervalRef.current = null;
                        }
                        setIsValidating(false);
                        setUploadProgress(100);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 50);
        }

        onFileSelect?.(file);
    }, [onFileSelect, disabled]);

    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
        disabled,
    })

    const file = acceptedFiles[0] || null;
    const hasRejection = fileRejections.length > 0;

    useEffect(() => {
        if (file && !isValidating) {
            setUploadProgress(100);
        }
    }, [file, isValidating]);

    // Reset state when file is cleared
    useEffect(() => {
        if (!file && !internalFile) {
            // Clear any running intervals
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
            setUploadProgress(0);
            setIsValidating(false);
        }
    }, [file, internalFile]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, []);

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Immediately clear the interval and reset state
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
        
        // Clear internal state immediately
        setInternalFile(null);
        setUploadProgress(0);
        setIsValidating(false);
        
        // Notify parent
        onFileSelect?.(null);
        
        // Force dropzone reset by incrementing key
        setResetKey(prev => prev + 1);
    };

    // Use internal file state to determine what to show
    // If internalFile is explicitly null (cleared), don't show file even if dropzone still has it
    // If internalFile is undefined (not set yet), use dropzone's file
    const displayFile = internalFile !== undefined ? internalFile : file;

    return (
        <div className={`w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} key={resetKey}>
            <div 
                {...getRootProps()} 
                className={`
                    relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
                    ${showError || hasRejection
                        ? 'border-red-400 bg-red-50/30' 
                        : isDragActive 
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50/90 to-purple-50/70 scale-[1.01] shadow-xl ring-4 ring-blue-200/40' 
                        : 'border-gray-300 bg-gradient-to-br from-gray-50/90 to-white hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-purple-50/40 hover:shadow-lg hover:ring-2 hover:ring-blue-200/30'
                    }
                    ${disabled ? 'pointer-events-none' : ''}
                `}
            >
                {/* Animated Background Gradient */}
                {isDragActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
                )}

                <input {...getInputProps()} disabled={disabled} />

                <div className="relative p-5 lg:p-6">
                    {displayFile ? (
                        <div 
                            className="space-y-4" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* File Card */}
                            <div className="flex items-center gap-4 p-4 bg-white/95 backdrop-blur-sm rounded-xl border-2 border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                                {/* PDF Icon with Animation */}
                                <div className="flex-shrink-0 relative">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 via-red-50 to-red-200 flex items-center justify-center border-2 border-red-200/60 shadow-md">
                                        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    {!isValidating && uploadProgress === 100 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center animate-bounce-subtle">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                
                                {/* File Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm lg:text-base font-bold text-gray-900 truncate mb-1.5">
                                        {displayFile.name}
                                    </p>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                            </svg>
                                            <p className="text-xs font-medium text-gray-600">
                                                {formatSize(displayFile.size)}
                                            </p>
                                        </div>
                                        <span className="text-gray-300">•</span>
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                                            isValidating 
                                                ? 'text-blue-700 bg-blue-50 border-blue-200' 
                                                : uploadProgress === 100
                                                ? 'text-green-700 bg-green-50 border-green-200'
                                                : 'text-gray-700 bg-gray-50 border-gray-200'
                                        }`}>
                                            {isValidating ? 'Validating...' : uploadProgress === 100 ? 'Ready' : 'Processing'}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Remove Button */}
                                <button 
                                    className="flex-shrink-0 p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200 border border-transparent hover:border-red-200 z-10 relative" 
                                    onClick={handleRemove}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    type="button"
                                    aria-label="Remove file"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Progress Bar */}
                            {isValidating && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-medium text-gray-600">Validating file...</span>
                                        <span className="font-bold text-blue-600">{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-sm"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-3">
                            {/* Animated Upload Icon */}
                            <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center mb-4 border-2 border-gray-200/60 shadow-lg transition-all duration-300 ${
                                isDragActive ? 'scale-110 rotate-3' : 'hover:scale-105'
                            }`}>
                                <svg className={`w-8 h-8 text-blue-600 transition-transform duration-300 ${isDragActive ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            
                            {/* Upload Text */}
                            <div className="space-y-2 mb-2">
                                <p className={`text-base font-bold transition-colors duration-300 ${
                                    isDragActive ? 'text-blue-600' : 'text-gray-900'
                                }`}>
                                    {isDragActive ? '✨ Drop your file here' : 'Drop your resume here or click to upload'}
                                </p>
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>PDF format</span>
                                    <span>•</span>
                                    <span>Max {formatSize(maxFileSize)}</span>
                                </div>
                            </div>
                            
                            {/* Error Messages */}
                            {(showError || hasRejection) && (
                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-xs font-semibold text-red-700">
                                        {hasRejection 
                                            ? fileRejections[0].errors[0]?.code === 'file-too-large'
                                                ? 'File is too large. Maximum size is 5MB.'
                                                : 'Invalid file type. Please upload a PDF file.'
                                            : 'Please upload a resume file'}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
