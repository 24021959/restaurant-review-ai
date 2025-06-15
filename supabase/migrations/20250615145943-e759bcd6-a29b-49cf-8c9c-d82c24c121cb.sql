
-- Abilita privilegi admin all’utente antonellobordoni@gmail.com tramite UUID
INSERT INTO public.user_roles (user_id, role)
VALUES ('93d83623-3b6a-46f2-aa90-2b09e9204fc9', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
