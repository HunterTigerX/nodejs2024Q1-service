# Use the official PostgreSQL image as the base image
   FROM postgres:latest

   # Set the environment variables
   ENV POSTGRES_USER HunterTigerX
   ENV POSTGRES_PASSWORD PostgressPassword
   ENV POSTGRES_DB HomeLibrary

   # Copy the SQL script to initialize the database
   COPY init.sql /docker-entrypoint-initdb.d/

   # Expose the PostgreSQL port
   EXPOSE 5432