'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { Save, ArrowLeft } from 'lucide-react';

interface EditPageFooterProps {
  isSaving: boolean;
  onSave: (e: React.FormEvent) => Promise<void>;
}

export const EditPageFooter = ({
  isSaving,
  onSave
}: EditPageFooterProps) => {
  const router = useRouter();
  
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/library');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(e);
  };
  
  return (
    <div className="sticky-footer">
      <div className="container mx-auto px-4 max-w-full">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="secondary"
            onClick={handleCancel}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            size="sm"
            type="button"
            className="w-auto"
          >
            Back to Library
          </Button>
          
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSaving}
            isLoading={isSaving}
            leftIcon={<Save className="h-4 w-4" />}
            size="sm"
            type="button"
            className="w-auto"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};