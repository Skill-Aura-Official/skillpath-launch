-- Insert dummy accounts for testing
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, aud, role) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'cazador_op@skillmatchr.com',
  crypt('#Tbh0fficial', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Alex Student"}',
  'authenticated',
  'authenticated'
),
(
  '22222222-2222-2222-2222-222222222222',
  'hunter_is_back@skillmatchr.com',
  crypt('#Tbh0fficial', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Sarah Recruiter"}',
  'authenticated',
  'authenticated'
),
(
  '33333333-3333-3333-3333-333333333333',
  'admin@skillmatchr.com',
  crypt('admin', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Admin User"}',
  'authenticated',
  'authenticated'
);

-- Insert corresponding profiles for test accounts
INSERT INTO public.profiles (id, user_id, email, full_name, role, is_verified, is_active) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'cazador_op@skillmatchr.com',
  'Alex Student',
  'student',
  true,
  true
),
(
  '22222222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222222',
  'hunter_is_back@skillmatchr.com',
  'Sarah Recruiter',
  'recruiter',
  true,
  true
),
(
  '33333333-3333-3333-3333-333333333333',
  '33333333-3333-3333-3333-333333333333',
  'admin@skillmatchr.com',
  'Admin User',
  'admin',
  true,
  true
);