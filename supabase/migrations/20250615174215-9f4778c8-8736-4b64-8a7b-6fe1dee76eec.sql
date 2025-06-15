
-- 1. Tabella recensioni provenienti da Google
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_profile_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE NOT NULL,
  google_review_id TEXT UNIQUE,
  customer_name TEXT,
  rating INTEGER,
  review_text TEXT,
  review_language TEXT,
  review_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabella risposte alle recensioni generate/salvate
CREATE TABLE public.review_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE NOT NULL,
  ai_response TEXT,
  edited_response TEXT,
  response_status TEXT CHECK (response_status IN ('pending', 'approved', 'sent')) DEFAULT 'pending',
  confidence INTEGER,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabella delle notifiche/email inviate agli utenti
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT, -- es: new_review, end_trial, system
  title TEXT,
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Log scraping giornaliero (monitoraggio operazioni)
CREATE TABLE public.scraping_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_profile_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
  executed_at TIMESTAMPTZ DEFAULT now(),
  status TEXT, -- success/failure/rate_limited
  message TEXT
);

-- 5. RLS Policy: solo titolari delle business profile possono agire su reviews/responses/notifications/scraping_logs
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraping_logs ENABLE ROW LEVEL SECURITY;

-- Policies recensioni
CREATE POLICY "Puoi vedere solo le tue recensioni" ON public.reviews
  FOR SELECT USING (
    business_profile_id IN (
      SELECT id FROM business_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Puoi inserire recensioni solo sulle tue attività" ON public.reviews
  FOR INSERT WITH CHECK (
    business_profile_id IN (
      SELECT id FROM business_profiles WHERE user_id = auth.uid()
    )
  );

-- Policies risposte
CREATE POLICY "Puoi vedere solo le tue risposte recensione" ON public.review_responses
  FOR SELECT USING (
    review_id IN (
      SELECT id FROM reviews
      WHERE business_profile_id IN (
        SELECT id FROM business_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Puoi inserire/modificare risposte solo sulle tue recensioni" ON public.review_responses
  FOR INSERT WITH CHECK (
    review_id IN (
      SELECT id FROM reviews
      WHERE business_profile_id IN (
        SELECT id FROM business_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Puoi aggiornare le tue risposte" ON public.review_responses
  FOR UPDATE USING (
    review_id IN (
      SELECT id FROM reviews
      WHERE business_profile_id IN (
        SELECT id FROM business_profiles WHERE user_id = auth.uid()
      )
    )
  );

-- Policies notifiche
CREATE POLICY "Utente vede solo le proprie notifiche" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Utente può inserire le proprie notifiche" ON public.notifications
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Utente può aggiornare stato lettura notifiche" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Policies scraping logs
CREATE POLICY "Vedi log scraping solo delle tue attività" ON public.scraping_logs
  FOR SELECT USING (
    business_profile_id IN (
      SELECT id FROM business_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Scrivi log scraping solo sulle tue attività" ON public.scraping_logs
  FOR INSERT WITH CHECK (
    business_profile_id IN (
      SELECT id FROM business_profiles WHERE user_id = auth.uid()
    )
  );
