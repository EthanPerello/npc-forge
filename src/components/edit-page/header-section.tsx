'use client';

import { ArrowLeft, Trash2 } from 'lucide-react';
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface HeaderSectionProps {
  characterName: string;
  isDeleting: boolean;
  onDelete: (e: React.MouseEvent) => void;
}

export const HeaderSection = ({
  characterName,
  isDeleting,
  onDelete
}: HeaderSectionProps) => {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleCancelDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };
  
  const handleDeleteConfirm = (e: React.MouseEvent) => {
    if (!showDeleteConfirm) {
      e.preventDefault();
      e.stopPropagation();
      setShowDeleteConfirm(true);
      return;
    }
    
    onDelete(e);
  };
  
  const handleBack = () => {
    router.push('/library');
  };
  
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center">
        <Button
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            handleBack();
          }}
          className="mr-4"
          type="button"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Character: {characterName}</h1>
      </div>
      
      {/* Delete Character Button */}
      {showDeleteConfirm ? (
        <div className="flex items-center">
          <span className="mr-2 text-sm text-red-600 dark:text-red-400">Confirm delete?</span>
          <Button
            variant="secondary"
            onClick={handleCancelDelete}
            className="mr-2"
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onDelete}
            isLoading={isDeleting}
            type="button"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      ) : (
        <Button
          variant="danger"
          onClick={handleDeleteConfirm}
          type="button"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Character
        </Button>
      )}
    </div>
  );
};