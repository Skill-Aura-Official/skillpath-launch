-- Add storage bucket for profile files
INSERT INTO storage.buckets (id, name, public) VALUES ('profiles', 'profiles', true);

-- Create storage policies for profile files
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload their own avatars and resumes" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatars and resumes" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatars and resumes" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'profiles' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Insert dummy user accounts for testing
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  raw_user_meta_data
) VALUES 
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'student@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '{"full_name": "John Student"}'
),
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'recruiter@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '{"full_name": "Jane Recruiter"}'
);

-- Insert corresponding profiles
INSERT INTO profiles (
  user_id,
  email,
  full_name,
  role,
  bio,
  location,
  phone,
  skills,
  is_verified
) VALUES 
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'student@example.com',
  'John Student',
  'student',
  'Computer Science student passionate about web development and AI.',
  'San Francisco, CA',
  '+1 (555) 123-4567',
  ARRAY['JavaScript', 'React', 'Python', 'Machine Learning'],
  true
),
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  'recruiter@example.com',
  'Jane Recruiter',
  'recruiter',
  'Experienced tech recruiter helping companies find top talent.',
  'New York, NY',
  '+1 (555) 987-6543',
  ARRAY['Recruiting', 'Talent Acquisition', 'Technical Hiring'],
  true
);