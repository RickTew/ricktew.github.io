-- Applied to tews-inc (qegfhbseccinnxnzfhxw) on 27 Oct 2026 as migration
-- 20261027042616 aininja_gate_hit_atomic. Kept here as the record; it is not
-- re-run from this folder. The earlier migrations live only in the project's
-- migration table.
--
-- ricktew.com send and upload caps, made atomic. One call, one transaction,
-- one lock per door: a burst of requests at once counts itself. The row is
-- recorded before the send goes.

alter table public.aininja_intake_gate drop constraint if exists aininja_intake_gate_door_check;
alter table public.aininja_intake_gate add constraint aininja_intake_gate_door_check
  check (door = any (array['upload', 'submit', 'mailbox', 'notice']));

create or replace function public.aininja_gate_hit(
  p_door text,
  p_ip_hash text,
  p_intake text,
  p_hour integer,          -- per visitor, last hour
  p_sheet integer,         -- per intake id, 0 = no sheet limit
  p_soft_day integer,      -- site-wide day count past which the answer is 'held', 0 = none
  p_day integer,           -- site-wide day count past which the answer is 'day' (dropped)
  p_bucket_bytes bigint    -- aininja-intake bucket ceiling in bytes, 0 = not checked
) returns text
language plpgsql
security invoker
set search_path = ''
as $$
declare
  n integer;
  day_n integer;
begin
  if p_door not in ('upload', 'submit', 'mailbox', 'notice') then
    raise exception 'unknown door %', p_door;
  end if;
  perform pg_advisory_xact_lock(hashtext('aininja_intake_gate:' || p_door));

  delete from public.aininja_intake_gate where at < now() - interval '2 days';

  select count(*) into n from public.aininja_intake_gate
   where door = p_door and ip_hash = p_ip_hash and at > now() - interval '1 hour';
  if n >= p_hour then return 'visitor'; end if;

  if p_sheet > 0 then
    select count(*) into n from public.aininja_intake_gate
     where door = p_door and intake = p_intake;
    if n >= p_sheet then return 'sheet'; end if;
  end if;

  select count(*) into day_n from public.aininja_intake_gate
   where door = p_door and at > now() - interval '1 day';
  if day_n >= p_day then return 'day'; end if;

  if p_bucket_bytes > 0 then
    if (select coalesce(sum((o.metadata->>'size')::bigint), 0)
          from storage.objects o where o.bucket_id = 'aininja-intake') >= p_bucket_bytes then
      return 'full';
    end if;
  end if;

  insert into public.aininja_intake_gate (door, ip_hash, intake) values (p_door, p_ip_hash, p_intake);
  if p_soft_day > 0 and day_n >= p_soft_day then return 'held'; end if;
  return 'ok';
end;
$$;

revoke all on function public.aininja_gate_hit(text, text, text, integer, integer, integer, integer, bigint) from public, anon, authenticated;
grant execute on function public.aininja_gate_hit(text, text, text, integer, integer, integer, integer, bigint) to service_role;

-- The intake table is read and written only by the service role.
revoke all on table public.aininja_intake from anon, authenticated;
