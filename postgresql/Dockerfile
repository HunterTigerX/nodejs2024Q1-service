
   FROM postgres:latest
   ENV POSTGRES_USER HunterTigerX
   ENV POSTGRES_PASSWORD PostgressPassword
   ENV POSTGRES_DB HomeLibrary
   COPY init.sql /docker-entrypoint-initdb.d/
   EXPOSE 5432