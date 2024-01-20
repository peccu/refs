FROM alpine:latest as build

ARG ARG bar
ENV V 1.0
ADD https://
COPY packages.json
RUN apk add bash

FROM alpine:latest

COPY --from=build /app /

EXPOSE 8080
VOLUME /app
VOLUME /data

ENTRYPOINT /bin/bash
COMMAND ['-c', 'ls']
