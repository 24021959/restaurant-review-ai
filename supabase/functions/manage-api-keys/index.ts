
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;
    
    if (!user) throw new Error("User not authenticated");

    const { action, ...body } = await req.json();

    switch (action) {
      case 'list':
        return await listApiKeys(supabaseClient, user.id);
      
      case 'add':
        return await addApiKey(supabaseClient, user.id, body);
      
      case 'toggle':
        return await toggleApiKey(supabaseClient, user.id, body);
      
      case 'delete':
        return await deleteApiKey(supabaseClient, user.id, body);
      
      default:
        throw new Error("Invalid action");
    }

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    );
  }
});

async function listApiKeys(supabase: any, userId: string) {
  const { data: keys, error } = await supabase
    .from('google_api_keys')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Aggiungi informazioni di utilizzo (simulato per ora)
  const keysWithUsage = keys.map((key: any) => ({
    ...key,
    key_preview: key.encrypted_key?.substring(0, 8),
    daily_usage: Math.floor(Math.random() * key.daily_limit), // TODO: implementare tracking reale
    daily_limit: 10000 // Limite standard Google Business API
  }));

  return new Response(
    JSON.stringify({ keys: keysWithUsage }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

async function addApiKey(supabase: any, userId: string, { name, key }: any) {
  // Cripta la chiave (implementazione semplificata)
  const encryptedKey = btoa(key); // TODO: implementare crittografia reale
  
  const { data, error } = await supabase
    .from('google_api_keys')
    .insert({
      user_id: userId,
      name,
      encrypted_key: encryptedKey,
      is_active: true
    })
    .select()
    .single();

  if (error) throw error;

  return new Response(
    JSON.stringify({ success: true, key: data }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

async function toggleApiKey(supabase: any, userId: string, { keyId, isActive }: any) {
  const { error } = await supabase
    .from('google_api_keys')
    .update({ is_active: isActive })
    .eq('id', keyId)
    .eq('user_id', userId);

  if (error) throw error;

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

async function deleteApiKey(supabase: any, userId: string, { keyId }: any) {
  const { error } = await supabase
    .from('google_api_keys')
    .delete()
    .eq('id', keyId)
    .eq('user_id', userId);

  if (error) throw error;

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}
