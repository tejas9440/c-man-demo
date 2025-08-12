-- migrate:up

-- Users

CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    password text NOT NULL,
    create_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false NOT NULL ,
    deleted_at timestamp with time zone,
    deleted_by uuid,

    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT uc_users_phone_number UNIQUE (phone_number)
);


-- Products
CREATE TABLE public.products(
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price numeric(12,2) DEFAULT 0 NOT NULL,
    description text,
    create_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_products PRIMARY KEY (id)
);


-- Orders
CREATE TABLE public.orders(
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    product_id uuid NOT NULL,

    CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT fk_orders_products FOREIGN KEY (product_id) REFERENCES public.products(id)
);

-- migrate:down

DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.products;
DROP TABLE IF EXISTS public.users;

