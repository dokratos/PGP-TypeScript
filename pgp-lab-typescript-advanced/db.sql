CREATE DATABASE tsecommerce;

CREATE TABLE carts(
    ID SERIAL PRIMARY KEY
);

CREATE TABLE products(
    ID SERIAL PRIMARY KEY,
    name text,
    description text,
    image text,
    price numeric,
    stock numeric,
    category text
);

CREATE TABLE cartItems(
    ID SERIAL PRIMARY KEY,
    product_id INTEGER UNIQUE,
    FOREIGN KEY (product_id) REFERENCES products (id),
    cart_id INTEGER,
    FOREIGN KEY (cart_id) REFERENCES carts (id),
    quantity INTEGER,
    name text,
    price numeric,
);