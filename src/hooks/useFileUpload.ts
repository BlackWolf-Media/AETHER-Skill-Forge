import { useState, useCallback } from 'react';

interface UseFileUploadOptions {
  maxFileSize?: number;
  allowedTypes?: string[];
  onUpload?: (files: AttachedFile[]) => void;
  onError?: (error: string) => void;
}

export interface AttachedFile {
  name: string;
  type: string;
  data: string;
  preview?: string;
  size: number;
}

/**
 * Custom hook for handling file uploads with validation
 */
export function useFileUpload(options: UseFileUploadOptions = {}) {
  const {
    maxFileSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain'],
    onUpload,
    onError,
  } = options;

  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > maxFileSize) {
      return `File "${file.name}" exceeds maximum size of ${maxFileSize / 1024 / 1024}MB`;
    }

    if (!allowedTypes.includes(file.type)) {
      return `File type "${file.type}" is not allowed`;
    }

    return null;
  }, [maxFileSize, allowedTypes]);

  const readFile = useCallback((file: File): Promise<AttachedFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const base64Data = (event.target?.result as string).split(',')[1];
        const attachedFile: AttachedFile = {
          name: file.name,
          type: file.type,
          data: base64Data,
          size: file.size,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        };
        resolve(attachedFile);
      };
      
      reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
      reader.readAsDataURL(file);
    });
  }, []);

  const uploadFiles = useCallback(async (fileList: FileList | File[]) => {
    setIsUploading(true);
    setError(null);

    try {
      const filesArray = Array.from(fileList);
      const validFiles: AttachedFile[] = [];

      for (const file of filesArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          onError?.(validationError);
          continue;
        }

        try {
          const attachedFile = await readFile(file);
          validFiles.push(attachedFile);
        } catch (readError) {
          const errorMsg = readError instanceof Error ? readError.message : 'Unknown error';
          setError(errorMsg);
          onError?.(errorMsg);
        }
      }

      if (validFiles.length > 0) {
        setFiles(prev => [...prev, ...validFiles]);
        onUpload?.(validFiles);
      }

      return validFiles;
    } finally {
      setIsUploading(false);
    }
  }, [validateFile, readFile, onUpload, onError]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => {
      const fileToRemove = prev[index];
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const clearFiles = useCallback(() => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
  }, [files]);

  return {
    files,
    isUploading,
    error,
    uploadFiles,
    removeFile,
    clearFiles,
    setError,
  };
}
