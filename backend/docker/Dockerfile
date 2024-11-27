FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

# move dist src to expose and run
FROM node:20-alpine

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/package.json /usr/src/app/

WORKDIR /usr/src/app

CMD ["npm", "start"]

