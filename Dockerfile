# Etapa 1 - Build
FROM node:22 AS build

WORKDIR /usr/src/app

# Instala dependências (com devDependencies para rodar o tsc)
COPY package*.json ./
RUN npm ci

# Copia todo o código
COPY . .

# Compila o TypeScript
RUN npm run build

# Etapa 2 - Produção
FROM node:22-slim

WORKDIR /usr/src/app

# Copia apenas as dependências de produção
COPY package*.json ./
RUN npm ci --only=production

# Copia artefatos do build
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3006

CMD ["node", "dist/server.js"]
