
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reviewText, businessName, reviewLanguage, businessDescription, communicationStyle, extraContext } = await req.json();

    let messages = [
      {
        role: "system",
        content: `Sei l’addetto alle risposte di un ristorante. Usa uno stile ${communicationStyle}. Riassumi e rispondi in modo gentile e positivo, rappresentando "${businessName}"${businessDescription ? " (" + businessDescription + ")" : ""}.`
      },
      {
        role: "user",
        content: `
Recensione da rispondere:
${reviewText}
${extraContext ? `
Informazioni aggiuntive attività/FAQ: ${extraContext}
` : ""}
Rispondi nella lingua: ${reviewLanguage || "italiano"}.`
      }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.6,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: err }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const data = await response.json();

    const answer = data.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err?.message || "Errore interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
