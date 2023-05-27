# Stage Build
FROM node:18-alpine as builder
WORKDIR /usr/app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn prisma:client:gen
RUN yarn build

# Stage Run
FROM node:18-alpine
WORKDIR /usr/app
COPY package.json ./
RUN yarn install --production

COPY --from=builder /usr/app/prisma ./prisma
COPY --from=builder /usr/app/dist ./dist

RUN npx prisma generate

EXPOSE 3001
CMD yarn start:prod

