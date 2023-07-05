CREATE SCHEMA IF NOT EXISTS "main";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "main"."transport_category" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"name" VARCHAR(50) UNIQUE NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "main"."staff_position" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"name" VARCHAR(50) UNIQUE NOT NULL,
	"description" VARCHAR(100) NOT NULL,
	"salary" NUMERIC NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "main"."location" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"address" VARCHAR(255) NOT NULL,
	"category_id" UUID NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp,
	"is_station" BOOLEAN NOT NULL,
	FOREIGN KEY ("category_id") REFERENCES "main"."transport_category"
);

CREATE TABLE IF NOT EXISTS "main"."route" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"name" VARCHAR(50) UNIQUE NOT NULL,
	"location_start_id" UUID NOT NULL,
	"location_destiny_id" UUID NOT NULL,
	"distance" NUMERIC NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp,
	FOREIGN KEY ("location_start_id") REFERENCES "main"."location",
	FOREIGN KEY ("location_destiny_id") REFERENCES "main"."location"
);

CREATE TABLE IF NOT EXISTS "main"."vehicle" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"category_id" UUID NOT NULL,
	"manufacturer" VARCHAR(50) NOT NULL,
	"model" VARCHAR(50) NOT NULL,
	"year" NUMERIC NOT NULL,
	"capacity" NUMERIC NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "main"."vehicle_route" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"vehicle_id" UUID NOT NULL,
	"route_id" UUID NOT NULL,
	"time_init" TIME NOT NULL,
	"time_end" TIME NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp,
	FOREIGN KEY ("vehicle_id") REFERENCES "main"."vehicle",
	FOREIGN KEY ("route_id") REFERENCES "main"."route"
);

CREATE TABLE IF NOT EXISTS "main"."passenger" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"name" VARCHAR(50) NOT NULL,
	"email" VARCHAR(128) NOT NULL,
	"phone" VARCHAR(20) UNIQUE NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "main"."transportation" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"date" DATE NOT NULL,
	"passenger_id" UUID NOT NULL,
	"vehicle_id" UUID NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp,
	FOREIGN KEY ("vehicle_id") REFERENCES "main"."vehicle",
	FOREIGN KEY ("passenger_id") REFERENCES "main"."passenger"
);

CREATE TABLE IF NOT EXISTS "main"."ticket" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"price" NUMERIC NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "main"."payment" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"ticket_id" UUID NOT NULL,
	"method" VARCHAR(50) NOT NULL,
	"date" TIMESTAMP DEFAULT current_timestamp,
	"passenger_id" UUID NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp,
	FOREIGN KEY ("ticket_id") REFERENCES "main"."ticket",
	FOREIGN KEY ("passenger_id") REFERENCES "main"."passenger"
);

CREATE TABLE IF NOT EXISTS "main"."staff" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"name" VARCHAR(50) UNIQUE NOT NULL,
	"position_id" UUID NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp,
	FOREIGN KEY ("position_id") REFERENCES "main"."staff_position"
);

CREATE TABLE IF NOT EXISTS "main"."staff_vehicle" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"vehicle_id" UUID NOT NULL,
	"staff_id" UUID NOT NULL,
	"shift_start" TIMESTAMP NOT NULL,
	"shift_finish" TIMESTAMP NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp,
	FOREIGN KEY ("vehicle_id") REFERENCES "main"."vehicle",
	FOREIGN KEY ("staff_id") REFERENCES "main"."staff"
);

CREATE TABLE IF NOT EXISTS "main"."feedback" (
	"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"passenger_id" UUID NOT NULL,
	"date" TIMESTAMP DEFAULT current_timestamp,
	"comment" VARCHAR(255),
	"rating" NUMERIC NOT NULL,
	"created_at" TIMESTAMP DEFAULT current_timestamp,
	FOREIGN KEY ("passenger_id") REFERENCES "main"."passenger"
);
