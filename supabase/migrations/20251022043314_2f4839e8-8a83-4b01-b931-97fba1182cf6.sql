-- Add status column to leads table
ALTER TABLE public.leads 
ADD COLUMN status TEXT NOT NULL DEFAULT 'on_process';

-- Add a check constraint for valid status values
ALTER TABLE public.leads
ADD CONSTRAINT valid_status CHECK (status IN ('on_process', 'positive', 'completed'));