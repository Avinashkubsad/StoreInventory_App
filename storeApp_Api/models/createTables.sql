-- models/createTables.sql

CREATE TABLE item_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type_id INTEGER REFERENCES item_types(id),
  stock INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20)
);

CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE purchase_details (
  id SERIAL PRIMARY KEY,
  purchase_id INTEGER REFERENCES purchases(id),
  item_id INTEGER REFERENCES items(id),
  quantity INTEGER NOT NULL
);
