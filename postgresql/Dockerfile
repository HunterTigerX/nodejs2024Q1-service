FROM postgres:15-alpine
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB homelibrary
EXPOSE ${DB_PORT}
CMD ["npm", "run", "migration:run", "-c", "npm", "run", "migration:generatemigration"]

