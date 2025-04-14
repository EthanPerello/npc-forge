'use client';

interface DialogueDisplayTabProps {
  dialogueLines: string[];
}

export default function DialogueDisplayTab({ dialogueLines }: DialogueDisplayTabProps) {
  if (!dialogueLines.length) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
        <p className="text-gray-600 dark:text-gray-400">No dialogue available for this character.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
        {dialogueLines.map((line, index) => (
          <div 
            key={index} 
            className={`
              mb-4 last:mb-0 p-3 rounded-lg relative
              ${index % 2 === 0 
                ? 'bg-indigo-50 dark:bg-indigo-900/30' 
                : 'bg-blue-50 dark:bg-blue-900/20'
              }
            `}
          >
            <div className="italic text-gray-700 dark:text-gray-300">
              "{line}"
            </div>
            
            {/* Optional: Small character indicator */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-500 flex items-center justify-center text-xs">
              <span className="text-white">
                {index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border border-gray-200 rounded-lg dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
          Usage Tip
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          These dialogue lines can be used in-game for NPC conversations, quest interactions, or idle chatter. 
          Copy and paste them into your game's dialogue system or use them as inspiration for more extensive conversations.
        </p>
      </div>
    </div>
  );
}