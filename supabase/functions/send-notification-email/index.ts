
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { to, subject, html } = await req.json();
    const res = await resend.emails.send({
      from: "RecensionePro <notifiche@recensionepro.app>",
      to: [to],
      subject,
      html,
    });
    console.log("Email inviata", { result: res });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e: any) {
    console.error("Errore invio:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      headers: corsHeaders,
      status: 500,
    });
  }
});
