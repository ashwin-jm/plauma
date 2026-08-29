-- 1. Create the public profiles table
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade primary key,
  email text not null,
  company_name text,
  phone_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security
alter table public.profiles enable row level security;

-- 3. Create RLS Policies
create policy "Users can view their own profile." 
  on public.profiles for select 
  using ( auth.uid() = id );

create policy "Users can update their own profile." 
  on public.profiles for update 
  using ( auth.uid() = id );

-- 4. Function to automatically create a profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, company_name, phone_number)
  values (
    new.id, 
    new.email, 
    -- We can extract additional data passed during signup from raw_user_meta_data
    new.raw_user_meta_data->>'company_name',
    new.raw_user_meta_data->>'phone_number'
  );
  return new;
end;
$$;

-- 5. Trigger the function every time a user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
