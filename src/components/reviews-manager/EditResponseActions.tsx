
import React from 'react';
import { Button } from "@/components/ui/button";

interface EditResponseActionsProps {
  onGenerate: () => void;
  onSave: () => void;
  onCancel: () => void;
  genLoading?: boolean;
}

export default function EditResponseActions({
  onGenerate,
  onSave,
  onCancel,
  genLoading = false,
}: EditResponseActionsProps) {
  return (
    <div className="flex gap-2 justify-between mt-4">
      <Button 
        type="button" 
        variant="secondary" 
        onClick={onGenerate} 
        disabled={genLoading}
      >
        {genLoading ? "Generazione..." : "Risposta AI"}
      </Button>
      <div className="flex gap-2 ml-auto">
        <Button onClick={onSave}>Salva</Button>
        <Button variant="outline" onClick={onCancel}>Annulla</Button>
      </div>
    </div>
  );
}
