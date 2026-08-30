-- Add user_id to link a support request to the user who created it
alter table public.support_requests
add column user_id uuid references auth.users(id);

-- Update the RLS policies to allow users to view their own requests (optional, but good practice)
create policy "Users can view their own support requests."
  on public.support_requests for select
  using (
    auth.uid() = user_id
  );
