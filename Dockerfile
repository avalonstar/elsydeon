# Build Step: Development 
FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN apk add --no-cache --virtual .build-deps alpine-sdk python
RUN yarn
RUN apk del .build-deps

COPY . .

RUN yarn build

# Build Step: Production 
FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN apk add --no-cache --virtual .build-deps alpine-sdk python
RUN yarn --production
RUN apk del .build-deps

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start"]
