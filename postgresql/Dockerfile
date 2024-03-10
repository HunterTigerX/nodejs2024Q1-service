
   FROM postgres:latest
   ENV POSTGRES_USER postgres
   ENV POSTGRES_PASSWORD postgres
   ENV POSTGRES_DB homelibrary
   COPY init.sql /docker-entrypoint-initdb.d/
   EXPOSE 4000
   # // 5432 default