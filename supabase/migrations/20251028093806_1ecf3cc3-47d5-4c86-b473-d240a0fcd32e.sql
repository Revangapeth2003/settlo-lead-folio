-- Drop the old check constraint
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS valid_status;

-- Add new check constraint with all status values including 'new' and 'negative'
ALTER TABLE public.leads ADD CONSTRAINT valid_status 
CHECK (status = ANY (ARRAY['new'::text, 'on_process'::text, 'positive'::text, 'negative'::text, 'completed'::text]));