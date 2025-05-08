'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';
import Button from '@/components/ui/button';

interface ImageUploadProps {
  initialImage?: string;
  onImageChange: (imageData: string | null) => void;
  className?: string;
  showCamera?: boolean;
}

export default function ImageUpload({ initialImage, onImageChange, className = '', showCamera = false }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB');
      return;
    }

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onImageChange(result);
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      setError('Failed to read file');
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // For webcam capture - simulated for now
  const handleCameraCapture = () => {
    setError('Camera capture not implemented yet');
    // In a real implementation, this would access the webcam and capture an image
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col items-center">
        {previewUrl ? (
          <div className="relative w-full max-w-xs">
            <div className="relative aspect-square rounded-md overflow-hidden border border-theme">
              <img 
                src={previewUrl} 
                alt="Character Portrait" 
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-center mt-2 text-muted">
              Click the preview to change the image
            </p>
          </div>
        ) : (
          <div 
            onClick={triggerFileInput}
            className="w-full max-w-xs aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
          >
            <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload a portrait</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG or GIF (max 5MB)</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <div className="flex gap-2 mt-4">
          {!previewUrl ? (
            <>
              <Button
                variant="secondary"
                onClick={triggerFileInput}
                disabled={isLoading}
                isLoading={isLoading}
                leftIcon={<Upload size={18} />}
                type="button"
              >
                Upload Image
              </Button>
              
              {showCamera && (
                <Button
                  variant="secondary"
                  onClick={handleCameraCapture}
                  disabled={isLoading}
                  leftIcon={<Camera size={18} />}
                  type="button"
                >
                  Take Photo
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={triggerFileInput}
              disabled={isLoading}
              isLoading={isLoading}
              leftIcon={<Upload size={18} />}
              type="button"
            >
              Change Image
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}