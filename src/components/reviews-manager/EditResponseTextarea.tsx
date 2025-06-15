
import React from 'react';

interface EditResponseTextareaProps {
  value: string;
  onChange: (val: string) => void;
}

export default function EditResponseTextarea({ value, onChange }: EditResponseTextareaProps) {
  return (
    <textarea
      className="border rounded p-2 w-full min-h-[120px] resize-vertical"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
