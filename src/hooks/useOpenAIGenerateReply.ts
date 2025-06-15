
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GenerateOptions {
  reviewText: string;
  businessName: string;
  reviewLanguage?: string;
  businessDescription?: string;
  communicationStyle?: string;
  extraContext?: string;
}

export function useOpenAIGenerateReply() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const generateReply = async (opts: GenerateOptions): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke("generate-ai-reply", {
        body: opts,
      });
      if (error || data?.error) {
        setError(data?.error || error?.message || "Errore generazione risposta");
        setLoading(false);
        return null;
      }
      setResult(data.answer);
      setLoading(false);
      return data.answer;
    } catch (e: any) {
      setError(e?.message || "Errore generazione risposta");
      setLoading(false);
      return null;
    }
  };

  return {
    generateReply,
    loading,
    result,
    error,
    setResult
  };
}
