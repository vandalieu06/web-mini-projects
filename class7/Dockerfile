FROM node:22-alpine
WORKDIR /app
RUN npm install -g live-server
EXPOSE 8080
CMD ["live-server", "--host=0.0.0.0", "--port=8080", "."]
