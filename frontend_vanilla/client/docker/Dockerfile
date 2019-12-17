FROM node:10-alpine AS modules
WORKDIR /root/src

RUN apk add --no-cache git --update

# Install dependencies
COPY ./frontend_vanilla/client/app/package.json ./
COPY ./frontend_vanilla/client/app/package-lock.json ./
RUN npm install

FROM registry.caffeina.co/devops/nador-images/frontend-vanilla-client/master/frontend_client

WORKDIR /root/src

COPY ./frontend_vanilla/client/app/ ./
COPY ./frontend_vanilla/common/views ./views
COPY ./frontend_vanilla/common/fixtures ./fixtures
COPY ./frontend_vanilla/common/locales ./locales
COPY --from=modules /root/src/node_modules ./node_modules

COPY ./frontend_vanilla/client/docker/entrypoint.sh /usr/bin/entrypoint

# Keep here because some task in gulp depends on this variable
ARG WITH_SERVER
ENV WITH_SERVER=$WITH_SERVER
# Keep here or won't install necessary node_modules!
ENV NODE_ENV=production
RUN npm run build:production

ENV WORKDIR=/app
WORKDIR $WORKDIR
