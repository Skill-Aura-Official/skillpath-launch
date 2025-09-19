-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('student', 'recruiter', 'admin');

-- Create enum for job types
CREATE TYPE job_type AS ENUM ('full_time', 'part_time', 'internship', 'contract');

-- Create enum for work modes
CREATE TYPE work_mode AS ENUM ('remote', 'onsite', 'hybrid');

-- Create enum for application status
CREATE TYPE application_status AS ENUM ('pending', 'shortlisted', 'rejected', 'selected');

-- Create profiles table for extended user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'student',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  resume_url TEXT,
  skills TEXT[],
  education JSONB,
  experience JSONB,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create companies table for recruiter company information
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recruiter_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  industry TEXT,
  company_size TEXT,
  location TEXT,
  founded_year INTEGER,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (recruiter_id) REFERENCES public.profiles(user_id)
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recruiter_id UUID NOT NULL,
  company_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT,
  requirements TEXT,
  required_skills TEXT[],
  job_type job_type NOT NULL,
  work_mode work_mode NOT NULL,
  location TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  duration_months INTEGER,
  application_deadline DATE,
  is_external BOOLEAN NOT NULL DEFAULT false,
  external_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  views_count INTEGER NOT NULL DEFAULT 0,
  applications_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (recruiter_id) REFERENCES public.profiles(user_id),
  FOREIGN KEY (company_id) REFERENCES public.companies(id)
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  student_id UUID NOT NULL,
  status application_status NOT NULL DEFAULT 'pending',
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES public.profiles(user_id),
  UNIQUE(job_id, student_id)
);

-- Create saved jobs table
CREATE TABLE public.saved_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  student_id UUID NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES public.profiles(user_id),
  UNIQUE(job_id, student_id)
);

-- Create messages table for chat functionality
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  application_id UUID,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (sender_id) REFERENCES public.profiles(user_id),
  FOREIGN KEY (receiver_id) REFERENCES public.profiles(user_id),
  FOREIGN KEY (application_id) REFERENCES public.applications(id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for companies
CREATE POLICY "Everyone can view verified companies" ON public.companies
  FOR SELECT USING (is_verified = true);

CREATE POLICY "Recruiters can view their own companies" ON public.companies
  FOR SELECT USING (recruiter_id = auth.uid());

CREATE POLICY "Recruiters can insert their own company" ON public.companies
  FOR INSERT WITH CHECK (recruiter_id = auth.uid());

CREATE POLICY "Recruiters can update their own company" ON public.companies
  FOR UPDATE USING (recruiter_id = auth.uid());

-- Create RLS policies for jobs
CREATE POLICY "Everyone can view published jobs" ON public.jobs
  FOR SELECT USING (is_published = true AND is_active = true);

CREATE POLICY "Recruiters can view their own jobs" ON public.jobs
  FOR SELECT USING (recruiter_id = auth.uid());

CREATE POLICY "Recruiters can insert their own jobs" ON public.jobs
  FOR INSERT WITH CHECK (recruiter_id = auth.uid());

CREATE POLICY "Recruiters can update their own jobs" ON public.jobs
  FOR UPDATE USING (recruiter_id = auth.uid());

-- Create RLS policies for applications
CREATE POLICY "Students can view their own applications" ON public.applications
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Recruiters can view applications for their jobs" ON public.applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.recruiter_id = auth.uid()
    )
  );

CREATE POLICY "Students can insert their own applications" ON public.applications
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own applications" ON public.applications
  FOR UPDATE USING (student_id = auth.uid());

CREATE POLICY "Recruiters can update applications for their jobs" ON public.applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.recruiter_id = auth.uid()
    )
  );

-- Create RLS policies for saved jobs
CREATE POLICY "Students can manage their own saved jobs" ON public.saved_jobs
  FOR ALL USING (student_id = auth.uid());

-- Create RLS policies for messages
CREATE POLICY "Users can view their own messages" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update their own sent messages" ON public.messages
  FOR UPDATE USING (sender_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_companies_recruiter_id ON public.companies(recruiter_id);
CREATE INDEX idx_jobs_recruiter_id ON public.jobs(recruiter_id);
CREATE INDEX idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX idx_jobs_published ON public.jobs(is_published, is_active);
CREATE INDEX idx_jobs_skills ON public.jobs USING GIN(required_skills);
CREATE INDEX idx_applications_job_id ON public.applications(job_id);
CREATE INDEX idx_applications_student_id ON public.applications(student_id);
CREATE INDEX idx_saved_jobs_student_id ON public.saved_jobs(student_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON public.messages(receiver_id);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();