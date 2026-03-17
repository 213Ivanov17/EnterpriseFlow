-- Това е допълнителна база данни за недвижими имоти (отделен проект)
CREATE DATABASE IF NOT EXISTS realestatedb;
USE realestatedb;

CREATE TABLE properties (
    property_id INT PRIMARY KEY AUTO_INCREMENT,
    address VARCHAR(255),
    city VARCHAR(100),
    price DECIMAL(12, 2),
    bedrooms INT,
    bathrooms INT,
    property_type VARCHAR(50)
);

CREATE TABLE agents (
    agent_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE sales (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    agent_id INT,
    sale_date DATE,
    sale_price DECIMAL(12, 2),
    FOREIGN KEY (property_id) REFERENCES properties(property_id),
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
);

INSERT INTO properties (address, city, price, bedrooms, bathrooms, property_type) VALUES
('ул. Витоша 10', 'София', 250000, 3, 2, 'апартамент'),
('бул. България 25', 'Пловдив', 180000, 2, 1, 'апартамент'),
('кв. Лозенец', 'София', 450000, 4, 3, 'къща');

INSERT INTO agents (first_name, last_name, phone, email) VALUES
('Петя', 'Димитрова', '0888123456', 'petya@realestate.bg'),
('Стефан', 'Колев', '0889234567', 'stefan@realestate.bg');