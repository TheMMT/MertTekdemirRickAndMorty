import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableAreaProps {
  id: string;
  children: React.ReactNode;
}

export function DroppableArea({ id, children }: DroppableAreaProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="p-4 border-2 border-dashed rounded min-h-[100px]">
      {children}
    </div>
  );
}

