// client/src/components/FileUpload.js

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, XIcon } from '@heroicons/react/outline';

const FileUpload = ({
  onFileSelect,
  acceptedFiles = ['.pdf', '.docx', '.pptx', '.txt'],
  maxSize = 10 * 1024 * 1024,
}) => {
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const reason =
          rejectedFiles[0].errors[0]?.code === 'file-too-large'
            ? 'File too large (max 10MB)'
            : 'Invalid file type. Allowed: PDF, DOCX, PPTX, TXT';
        setError(reason);
        setSelectedFile(null);
        return;
      }
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileSelect(file);
        setError('');
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'text/plain': ['.txt'],
    },
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors dark:border-gray-600 dark:bg-gray-700"
    >
      <input {...getInputProps()} aria-label="File upload input" />
      {!selectedFile ? (
        <>
          {isDragActive ? (
            <p className="text-blue-500 dark:text-blue-400">Drop the file here...</p>
          ) : (
            <>
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Drag & drop or click to select a file
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Supported: PDF, DOCX, PPTX, TXT (max 10MB)
              </p>
            </>
          )}
        </>
      ) : (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Selected: {selectedFile.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <button
            onClick={removeFile}
            className="inline-flex items-center px-3 py-1 text-xs text-red-600 bg-red-100 rounded hover:bg-red-200"
            aria-label="Remove file"
          >
            <XIcon className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      )}
      {error && (
        <p className="mt-2 text-red-500 text-sm bg-red-50 p-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
