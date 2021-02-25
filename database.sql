CREATE DATABASE yelp;

CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE restaurants(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL,
  user_id VARCHAR(255) NOT NULL
);