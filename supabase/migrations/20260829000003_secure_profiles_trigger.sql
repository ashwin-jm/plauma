-- 1. Create a secure version of the handle_new_user function
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
    coalesce(new.raw_user_meta_data->>'company_name', ''),
    coalesce(new.raw_user_meta_data->>'phone_number', '')
  );
  return new;
exception when others then
  -- In case of failure, don't rollback the auth.users insert.
  -- Log a warning instead (this will be visible in Postgres logs).
  raise warning 'Profile creation failed for user %: %', new.id, sqlerrm;
  return new;
end;
$$;
