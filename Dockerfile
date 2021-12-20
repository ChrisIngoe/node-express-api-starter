# Common build stage
FROM node:14.14.0-alpine3.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app

EXPOSE 3001

# Production build stage
ENV NODE_ENV production

CMD ["npm", "run", "start"]
