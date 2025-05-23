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
  fieldLoadingStates: Record<string, boolean>;
}

export const ItemsSection = ({
  character,
  onArrayInputChange,
  onRegenerateField,
  fieldLoadingStates
}: ItemsSectionProps) => {
  
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
          {character.items.map((item, index) => (
            <div key={index} className="mb-2 flex">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...character.items!];
                  newItems[index] = e.target.value;
                  onArrayInputChange('items', newItems);
                }}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
              <RegenerateButton
                field={`item_${index}`}
                onClick={(e) => onRegenerateField(`item_${index}`, e)}
                isLoading={fieldLoadingStates[`item_${index}`] || false}
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
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
          <p className="text-muted">No items available. Add an item to get started.</p>
        </div>
      )}
    </FormSection>
  );
};