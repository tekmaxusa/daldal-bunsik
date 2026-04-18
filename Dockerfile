# --- Build ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Vite bakes these in at build time (optional — pass via docker compose build args)
ARG VITE_GOOGLE_SCRIPT_URL
ARG VITE_ORDER_WHATSAPP
ARG VITE_ONLINE_ORDER_URL
ENV VITE_GOOGLE_SCRIPT_URL=$VITE_GOOGLE_SCRIPT_URL
ENV VITE_ORDER_WHATSAPP=$VITE_ORDER_WHATSAPP
ENV VITE_ONLINE_ORDER_URL=$VITE_ONLINE_ORDER_URL

RUN npm run build

# --- Serve static files ---
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
