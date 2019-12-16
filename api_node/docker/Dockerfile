FROM node:10-alpine AS modules
WORKDIR /app

# Install dependencies
ENV NODE_ENV=production
COPY ./api_node/app/package*.json ./
RUN npm install

FROM node:10-alpine
WORKDIR /app

COPY ./api_node/app/ /app/
COPY --from=modules /app/node_modules /app/node_modules

COPY ./api_node/docker/entrypoint.sh /usr/bin/entrypoint

EXPOSE 80

ENTRYPOINT ["/usr/bin/entrypoint"]
