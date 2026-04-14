-- Query to run in your Supabase SQL Editor (SQL menu on the left)

-- 1. Create the admins table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on basic RLS so it's secure by default (optional but good practice)
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the admins table (needed for login check on frontend)
-- We only expose the hashed password, which is secure enough for comparison
CREATE POLICY "Allow public read of admins" 
ON public.admins
FOR SELECT 
USING (true);

-- 2. Insert your initial admin user ("raja")
-- Here is the bcrypt hash for "hacker", which is your current password.
-- If you change your password in the future, you'll need to generate a new bcrypt hash.
INSERT INTO public.admins (username, password)
VALUES ('raja', '$2a$10$w/xG.x6tA6zUQK0LhT16Rej50n8k2z.4M/b897rXxzD5H8F5Z9Lzi')
ON CONFLICT (username) DO NOTHING;
