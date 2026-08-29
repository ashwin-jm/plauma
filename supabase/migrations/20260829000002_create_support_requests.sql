-- 1. Create the support_requests table
create table public.support_requests (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  email text not null,
  problem_description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security
alter table public.support_requests enable row level security;

-- 3. Allow anyone (including anonymous / unauthenticated) to insert
create policy "Anyone can submit a support request."
  on public.support_requests for insert
  with check ( true );

-- 4. Only authenticated users with an 'admin' role in their metadata can read
create policy "Admins can view support requests."
  on public.support_requests for select
  using (
    auth.uid() is not null
    and (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 5. Only admins can update
create policy "Admins can update support requests."
  on public.support_requests for update
  using (
    auth.uid() is not null
    and (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 6. Only admins can delete
create policy "Admins can delete support requests."
  on public.support_requests for delete
  using (
    auth.uid() is not null
    and (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
