# Etapa 1: compilación
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Las variables VITE_* se incrustan en el build: pásalas con --build-arg.
ARG VITE_FORM_ENDPOINT
ARG VITE_NEWSLETTER_ENDPOINT
ARG VITE_GA4_ID
ARG VITE_META_PIXEL_ID
RUN npm run build

# Etapa 2: servidor estático sin privilegios de root
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
