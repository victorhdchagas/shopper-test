FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

# move dist src to expose and run
FROM node:20-alpine

COPY --from=builder /usr/src/app/dist /usr/src/app/dist

WORKDIR /usr/src/app

CMD ["node", "dist/main"]

