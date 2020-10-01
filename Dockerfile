# Build Step: Development 
FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

# Build Step: Production 
FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start"]
