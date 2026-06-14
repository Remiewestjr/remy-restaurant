CREATE DATABASE remie_restaurant;

USE remie_restaurant;

CREATE TABLE commandes (

id INT AUTO_INCREMENT PRIMARY KEY,

nom_client VARCHAR(100),

table_numero VARCHAR(20),

commande TEXT,

total DECIMAL(10,2),

paiement VARCHAR(50),

date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);