# Build
FROM node:lts as build-stage
ENV NODE_ENV development
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build -- --output-path=./dist/out --configuration production

# TEST
FROM trion/ng-cli-karma as test-stage
WORKDIR /app
COPY --from=build-stage /app ./
RUN npm run test

# DEPLOY
FROM nginx:latest as deploy-stage
COPY --from=build-stage /app/dist/out /usr/share/nginx/html

# and away we go...
EXPOSE 80