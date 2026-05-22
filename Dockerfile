FROM alpine:latest
RUN apk add --no-cache wget unzip
RUN wget -q https://github.com/pocketbase/pocketbase/releases/download/v0.22.4/pocketbase_0.22.4_linux_amd64.zip \
    && unzip pocketbase_0.22.4_linux_amd64.zip \
    && chmod +x pocketbase \
    && rm pocketbase_0.22.4_linux_amd64.zip
EXPOSE 8090
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data", "--publicDir=/pb_public"]
