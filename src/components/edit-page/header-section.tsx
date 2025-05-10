'use client';

import { ArrowLeft, Trash2 } from 'lucide-react';
import Button from '@/components/ui/button';

interface HeaderSectionProps {
  characterName: string;
  showDeleteConfirm: boolean;
  isDeleting: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onCancelDelete: (e: React.MouseEvent) => void;
  onBack: () => void;
}

export const HeaderSection = ({
  characterName,
  showDeleteConfirm,
  isDeleting,
  onDelete,
  onCancelDelete,
  onBack
}: HeaderSectionProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            onBack();
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
            onClick={onCancelDelete}
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
          onClick={onDelete}
          type="button"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Character
        </Button>
      )}
    </div>
  );
};