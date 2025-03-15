import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableOptionProps {
  id: string;
  children: React.ReactNode;
}

export function DraggableOption({ id, children }: DraggableOptionProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-move p-2 bg-white border rounded shadow-sm">
      {children}
    </div>
  );
}
