CREATE SCHEMA IF NOT EXISTS "main";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "main"."transport_category" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) UNIQUE NOT NULL,
    "created_at" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "main"."passenger"(
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(25) UNIQUE NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "main"."spent"(
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) NOT NULL,
    "date" TIMESTAMP DEFAULT current_timestamp,
    "description" VARCHAR(100) NOT NULL,
    "value" NUMERIC NOT NULL,
    "category_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY ("category_id") REFERENCES "main"."category",
    FOREIGN KEY ("user_id") REFERENCES "main"."user"
);

INSERT INTO "main"."category" ("name") VALUES
('Food'),
('Fun'),
('Education'),
('Health'),
('Transportation'),
('Another');