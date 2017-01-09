DROP DATABASE IF EXISTS todomvc_db;
DROP USER IF EXISTS todomvc_user;
CREATE USER todomvc_user PASSWORD 'welcome';
CREATE DATABASE todomvc_db owner todomvc_user ENCODING = 'UTF-8';


-- create extension (as superuser)
\c todomvc_db
CREATE EXTENSION hstore;
CREATE EXTENSION pg_trgm;

\c todomvc_db todomvc_user