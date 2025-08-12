-- migrate:up
ALTER TABLE public.users
RENAME CONSTRAINT uc_users_phone_number TO uk_users_phone_number;


-- migrate:down
ALTER TABLE public.users
RENAME CONSTRAINT uk_users_phone_number TO uc_users_phone_number;
