FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE ${PORT}
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
CMD ["/app/entrypoint.sh"]
