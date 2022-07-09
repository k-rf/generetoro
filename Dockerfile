# Test ########################################################################
FROM node:16-bullseye as test

WORKDIR /usr/src

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn install

COPY . .

RUN yarn test

# Build #######################################################################
FROM node:16-bullseye as build

WORKDIR /usr/src

COPY --from=test /usr/src .

RUN yarn global add @nestjs/cli
RUN yarn build

# Run #########################################################################
FROM node:16-alpine as run

WORKDIR /usr/src

COPY --from=build /usr/src/dist ./dist
COPY --from=build /usr/src/node_modules ./node_modules

ENTRYPOINT [ "node" ]
CMD [ "dist/main" ]
