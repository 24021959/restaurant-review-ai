import React from 'react';
import { useOpenAIGenerateReply } from "@/hooks/useOpenAIGenerateReply";
import { Button } from "@/components/ui/button";

interface EditResponseModalProps {
  review: {
    id: string;
    customer: string;
    rating: number;
    date: string;
    text: string;
    aiResponse?: string;
    status: 'pending' | 'approved' | 'published';
    confidence?: number;
  };
  editedResponse: string;
  onEditedResponseChange: (response: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditResponseModal({
  review,
  editedResponse,
  onEditedResponseChange,
  onSave,
  onCancel
}: EditResponseModalProps) {
  const { generateReply, loading: genLoading } = useOpenAIGenerateReply();

  const handleGenerate = async () => {
    const aiResp = await generateReply({
      reviewText: review.text,
      businessName: "Il tuo ristorante", // TODO: si può rendere dinamico, prendere da profilo
      reviewLanguage: "italiano",
      businessDescription: "",
      communicationStyle: "formale",
      extraContext: ""
    });
    if (aiResp) {
      onEditedResponseChange(aiResp);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Modifica Risposta</h2>
      <textarea
        className="border rounded p-2 w-full min-h-[120px] resize-vertical"
        value={editedResponse}
        onChange={e => onEditedResponseChange(e.target.value)}
      />
      <div className="flex gap-2 justify-between mt-4">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleGenerate} 
          disabled={genLoading}
        >
          {genLoading ? "Generazione..." : "Risposta AI"}
        </Button>
        <div className="flex gap-2 ml-auto">
          <Button onClick={onSave}>Salva</Button>
          <Button variant="outline" onClick={onCancel}>Annulla</Button>
        </div>
      </div>
    </div>
  );
}
