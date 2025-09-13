FROM node:22 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:22-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./

EXPOSE 3006

CMD ["node", "dist/server.js"]
