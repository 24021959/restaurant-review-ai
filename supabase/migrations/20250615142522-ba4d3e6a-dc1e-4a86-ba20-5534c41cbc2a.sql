
-- Add custom_communication_style to business_profiles
ALTER TABLE public.business_profiles
ADD COLUMN custom_communication_style TEXT NULL;
