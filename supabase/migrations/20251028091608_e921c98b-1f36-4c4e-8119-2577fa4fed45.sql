-- Add new status values to the leads table
-- The status column already exists, we just need to ensure it can accept the new values
-- Postgres text columns don't have enum constraints by default, so no changes needed to the column itself

-- Update the comment to document the allowed status values
COMMENT ON COLUMN public.leads.status IS 'Status of the lead: new, on_process, positive, negative, completed';