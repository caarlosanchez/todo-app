CREATE DATABASE todos_app;
USE todos_app;

CREATE TABLE users(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20),
	surname VARCHAR(20),
	gender VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,    
	created_at TIMESTAMP NOT NULL
);

CREATE TABLE todos(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_user INT UNSIGNED,
    content VARCHAR(250) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    state VARCHAR(10),
	FOREIGN KEY (id_user) REFERENCES users (id)
);