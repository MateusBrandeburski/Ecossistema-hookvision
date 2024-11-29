-- init-db.sql

-- CREATE DATABASE webhook;

-- CREATE ROLE farol WITH LOGIN PASSWORD 'vamovamo12';
-- ALTER ROLE farol CREATEDB;
-- GRANT ALL PRIVILEGES ON DATABASE webhook TO farol;


CREATE TABLE IF NOT EXISTS pagamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150),
    email VARCHAR(150),
    status VARCHAR(50),
    valor FLOAT,
    forma_pagamento VARCHAR(50),
    parcelas VARCHAR(50),
    status_no_sistema VARCHAR(50) NOT NULL,
    data VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE,
    senha VARCHAR(256) NOT NULL,
    token VARCHAR(20) NOT NULL,
    data VARCHAR(20)
);

