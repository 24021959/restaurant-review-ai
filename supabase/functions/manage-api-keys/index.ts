
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

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      throw new Error('Unauthorized');
    }

    const { action, ...params } = await req.json();

    switch (action) {
      case 'list':
        const { data: keys } = await supabaseClient
          .from('google_api_keys')
          .select('id, name, encrypted_key, is_active, daily_limit, total_requests, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        const processedKeys = keys?.map(key => ({
          ...key,
          key_preview: key.encrypted_key.substring(0, 8),
          daily_usage: Math.floor(Math.random() * key.daily_limit * 0.7) // Simulazione usage
        })) || [];

        return new Response(
          JSON.stringify({ keys: processedKeys }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case 'add':
        const { name, key } = params;
        
        const { data: newKey, error: insertError } = await supabaseClient
          .from('google_api_keys')
          .insert({
            user_id: user.id,
            name,
            encrypted_key: key, // In produzione dovrebbe essere criptata
            is_active: true,
            daily_limit: 10000
          })
          .select()
          .single();

        if (insertError) throw insertError;

        return new Response(
          JSON.stringify({ success: true, key: newKey }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case 'toggle':
        const { keyId, isActive } = params;
        
        const { error: toggleError } = await supabaseClient
          .from('google_api_keys')
          .update({ is_active: isActive })
          .eq('id', keyId)
          .eq('user_id', user.id);

        if (toggleError) throw toggleError;

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case 'delete':
        const { keyId: deleteKeyId } = params;
        
        const { error: deleteError } = await supabaseClient
          .from('google_api_keys')
          .delete()
          .eq('id', deleteKeyId)
          .eq('user_id', user.id);

        if (deleteError) throw deleteError;

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      default:
        throw new Error('Invalid action');
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
