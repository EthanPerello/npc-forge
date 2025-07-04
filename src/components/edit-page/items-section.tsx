'use client';

import React from 'react';
import { Character } from '@/lib/types';
import Button from '@/components/ui/button';
import { FormSection, RegenerateButton } from './shared';
import { PlusCircle, Trash2 } from 'lucide-react';

interface ItemsSectionProps {
  character: Character;
  onArrayInputChange: <T extends unknown>(field: keyof Character, value: T[]) => void;
  onRegenerateField: (field: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  isFieldRegenerating: (field: string, index?: number, subField?: string) => boolean;
  regeneratingFields: Set<string>;
}

export const ItemsSection = ({
  character,
  onArrayInputChange,
  onRegenerateField,
  isFieldRegenerating,
  regeneratingFields
}: ItemsSectionProps) => {
  
  // Check if any item field is loading
  const hasItemLoading = Array.from(regeneratingFields).some(field => 
    field.startsWith('item_')
  );

  // Add a new item
  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) return;
    
    const newItem = "New item description";
    const updatedItems = character.items ? [...character.items, newItem] : [newItem];
    onArrayInputChange('items', updatedItems);
  };
  
  // Remove an item
  const handleRemoveItem = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character || !character.items) return;
    
    const updatedItems = [...character.items];
    updatedItems.splice(index, 1);
    onArrayInputChange('items', updatedItems);
  };
  
  return (
    <FormSection title="Items">
      {/* Loading overlay when any item is regenerating */}
      {hasItemLoading && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-200 border-t-blue-600 dark:border-blue-700 dark:border-t-blue-300"></div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Regenerating items...
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="secondary" 
          onClick={handleAddItem}
          leftIcon={<PlusCircle className="h-4 w-4" />}
          type="button"
        >
          Add Item
        </Button>
      </div>
      
      {character.items && character.items.length > 0 ? (
        <div className="space-y-3">
          {character.items.map((item, index) => {
            const isItemLoading = isFieldRegenerating('item', index);
            
            return (
              <div 
                key={index} 
                className={`mb-2 flex ${
                  isItemLoading ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800' : ''
                }`}
              >
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...character.items!];
                    newItems[index] = e.target.value;
                    onArrayInputChange('items', newItems);
                  }}
                  className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  disabled={isItemLoading}
                />
                <RegenerateButton
                  field={`item_${index}`}
                  onClick={(e) => onRegenerateField(`item_${index}`, e)}
                  isLoading={isItemLoading}
                />
                <button
                  type="button"
                  onClick={handleRemoveItem(index)}
                  className="ml-2 p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                  title="Remove Item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
          <p className="text-muted">No items available. Add an item to get started.</p>
        </div>
      )}
    </FormSection>
  );
};