FROM node:18.17.1 AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/telebrasilia /usr/share/nginx/html