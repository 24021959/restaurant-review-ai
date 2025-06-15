
-- 1. Tabella per le informazioni attività
CREATE TABLE public.business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  business_description TEXT,
  website TEXT,
  phone TEXT,
  address TEXT,
  communication_style TEXT, -- Formale/informale/personalizzato
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- 2. Tabella per i documenti e FAQ caricati dall’utente
CREATE TABLE public.business_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_profile_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Corpo del documento o FAQ
  type TEXT DEFAULT 'faq', -- faq, policy, ecc
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Abilita Row Level Security (RLS)
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_documents ENABLE ROW LEVEL SECURITY;

-- 4. Regole RLS: solo i proprietari delle attività possono leggere/scrivere le proprie info
CREATE POLICY "Utenti possono leggere/modificare solo i propri profili business"
  ON public.business_profiles
  FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Utenti possono leggere/modificare solo i propri documenti business"
  ON public.business_documents
  FOR ALL
  USING (
    business_profile_id IN (
      SELECT id FROM public.business_profiles WHERE user_id = auth.uid()
    )
  );
