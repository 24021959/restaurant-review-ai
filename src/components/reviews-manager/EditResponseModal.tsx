
import React from 'react';
import { useOpenAIGenerateReply } from "@/hooks/useOpenAIGenerateReply";
import EditResponseModalTitle from './EditResponseModalTitle';
import EditResponseTextarea from './EditResponseTextarea';
import EditResponseActions from './EditResponseActions';

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
      businessName: "Il tuo ristorante",
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
      <EditResponseModalTitle />
      <EditResponseTextarea
        value={editedResponse}
        onChange={onEditedResponseChange}
      />
      <EditResponseActions
        onGenerate={handleGenerate}
        onSave={onSave}
        onCancel={onCancel}
        genLoading={genLoading}
      />
    </div>
  );
}
