import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '../lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
    disabled?: boolean;
    showError?: boolean;
}

const FileUploader = ({ onFileSelect, disabled = false, showError = false }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (disabled) return;
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect, disabled]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
        disabled,
    })

    const file = acceptedFiles[0] || null;



    return (
        <div className={`w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div 
                {...getRootProps()} 
                className={`
                    relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
                    ${showError 
                        ? 'border-red-400 bg-red-50/30' 
                        : isDragActive 
                        ? 'border-blue-500 bg-blue-50/50 scale-[1.02] shadow-lg' 
                        : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100/50 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-md'
                    }
                    ${disabled ? 'pointer-events-none' : ''}
                `}
            >
                <input {...getInputProps()} disabled={disabled} />

                <div className="p-6 lg:p-8">
                    {file ? (
                        <div 
                            className="flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all duration-200" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* PDF Icon */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center border border-red-200">
                                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            
                            {/* File Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-semibold text-gray-900 truncate mb-1">
                                    {file.name}
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                    <span className="text-gray-300">•</span>
                                    <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-200">
                                        Ready
                                    </span>
                                </div>
                            </div>
                            
                            {/* Remove Button */}
                            <button 
                                className="flex-shrink-0 p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors duration-200" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                                type="button"
                                aria-label="Remove file"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            {/* Upload Icon */}
                            <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4 border border-gray-200 shadow-sm">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            
                            {/* Upload Text - Compact */}
                            <div className="space-y-1 mb-3">
                                <p className="text-lg font-bold text-gray-900">
                                    {isDragActive ? 'Drop your file here' : 'Click to upload or drag and drop'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    PDF format only • Max {formatSize(maxFileSize)}
                                </p>
                            </div>
                            
                            {/* Helper Icons - Compact */}
                            <div className="flex items-center justify-center gap-1.5 text-gray-400">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-xs">Secure & Private</span>
                            </div>
                            {showError && (
                                <p className="text-xs text-red-600 font-medium mt-2">Please upload a resume file</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
