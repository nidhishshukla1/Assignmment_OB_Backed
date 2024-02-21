CREATE DATABASE officebanao_todo_db;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  image_url TEXT
);