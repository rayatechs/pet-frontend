FROM node:20.9.0-alpine AS base
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM gradle:jdk17-alpine AS android
