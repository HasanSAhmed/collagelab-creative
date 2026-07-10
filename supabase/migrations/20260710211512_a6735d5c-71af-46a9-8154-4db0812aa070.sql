-- Roles infrastructure
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- ad_inquiries: public can insert, only admins can read/modify
DROP POLICY IF EXISTS "Anyone can submit an ad inquiry" ON public.ad_inquiries;
CREATE POLICY "Anyone can submit an ad inquiry"
  ON public.ad_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read ad inquiries" ON public.ad_inquiries;
CREATE POLICY "Admins can read ad inquiries"
  ON public.ad_inquiries FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update ad inquiries" ON public.ad_inquiries;
CREATE POLICY "Admins can update ad inquiries"
  ON public.ad_inquiries FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete ad inquiries" ON public.ad_inquiries;
CREATE POLICY "Admins can delete ad inquiries"
  ON public.ad_inquiries FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- submissions: public can insert, only admins can read/modify
DROP POLICY IF EXISTS "Anyone can submit work" ON public.submissions;
CREATE POLICY "Anyone can submit work"
  ON public.submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read submissions" ON public.submissions;
CREATE POLICY "Admins can read submissions"
  ON public.submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update submissions" ON public.submissions;
CREATE POLICY "Admins can update submissions"
  ON public.submissions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete submissions" ON public.submissions;
CREATE POLICY "Admins can delete submissions"
  ON public.submissions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- subscribers: public can insert, only admins can read/modify
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read subscribers" ON public.subscribers;
CREATE POLICY "Admins can read subscribers"
  ON public.subscribers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update subscribers" ON public.subscribers;
CREATE POLICY "Admins can update subscribers"
  ON public.subscribers FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete subscribers" ON public.subscribers;
CREATE POLICY "Admins can delete subscribers"
  ON public.subscribers FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Storage policies for the private 'submissions' bucket
DROP POLICY IF EXISTS "Anyone can upload to submissions bucket" ON storage.objects;
CREATE POLICY "Anyone can upload to submissions bucket"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'submissions');

DROP POLICY IF EXISTS "Admins can read submission files" ON storage.objects;
CREATE POLICY "Admins can read submission files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'submissions' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update submission files" ON storage.objects;
CREATE POLICY "Admins can update submission files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'submissions' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'submissions' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete submission files" ON storage.objects;
CREATE POLICY "Admins can delete submission files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'submissions' AND public.has_role(auth.uid(), 'admin'));