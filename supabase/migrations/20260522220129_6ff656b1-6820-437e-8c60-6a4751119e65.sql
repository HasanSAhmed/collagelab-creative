
-- subscribers
CREATE TABLE public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);

-- submissions
CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_name text NOT NULL,
  creator_email text NOT NULL,
  title text NOT NULL,
  medium text NOT NULL,
  description text NOT NULL,
  link text,
  file_path text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit" ON public.submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ad_inquiries
CREATE TABLE public.ad_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  budget text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.ad_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can inquire" ON public.ad_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

-- storage bucket (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('submissions', 'submissions', false);

CREATE POLICY "Anyone can upload submissions" ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'submissions');
