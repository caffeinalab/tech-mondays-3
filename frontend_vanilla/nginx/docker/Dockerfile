ARG CI_COMMIT_REF_NAME
ARG CI_REGISTRY
ARG CI_PROJECT_PATH
FROM ${CI_REGISTRY}/${CI_PROJECT_PATH}/${CI_COMMIT_REF_NAME}/frontend_client:latest AS frontend_client
FROM nginx:alpine

COPY ./frontend_vanilla/common/assets/optimized /var/assets
COPY ./frontend_vanilla/nginx/config /etc/config
COPY ./frontend_vanilla/nginx/docker/entrypoint.sh /usr/bin/entrypoint
COPY --from=frontend_client /root/src/dist/public /var/static

ENTRYPOINT entrypoint
