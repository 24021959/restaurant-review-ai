
-- Create google_api_keys table for storing user API keys
CREATE TABLE public.google_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  encrypted_key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  daily_limit INTEGER DEFAULT 10000,
  total_requests INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create api_usage_logs table for tracking API usage
CREATE TABLE public.api_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID REFERENCES public.google_api_keys(id) ON DELETE CASCADE NOT NULL,
  used_at TIMESTAMPTZ DEFAULT now(),
  request_type TEXT DEFAULT 'google_business_api',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.google_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for google_api_keys
CREATE POLICY "Users can view their own API keys" 
  ON public.google_api_keys 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own API keys" 
  ON public.google_api_keys 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API keys" 
  ON public.google_api_keys 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API keys" 
  ON public.google_api_keys 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS policies for api_usage_logs
CREATE POLICY "Users can view their own API usage logs" 
  ON public.api_usage_logs 
  FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM public.google_api_keys WHERE id = api_key_id
  ));

CREATE POLICY "Edge functions can insert usage logs" 
  ON public.api_usage_logs 
  FOR INSERT 
  WITH CHECK (true);

-- Edge functions can update API keys
CREATE POLICY "Edge functions can update API keys" 
  ON public.google_api_keys 
  FOR UPDATE 
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for google_api_keys
CREATE TRIGGER update_google_api_keys_updated_at 
  BEFORE UPDATE ON public.google_api_keys 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
