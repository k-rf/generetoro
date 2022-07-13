# Test ########################################################################
FROM node:16-bullseye as test

ARG NOTION_KEY
ARG NOTION_DATABASE_ID
ARG NOTION_TEMPLATE_DAILY_ID
ARG NOTION_TEMPLATE_WEEKLY_ID
ARG NOTION_REMIND_COLUMN
ARG NOTION_TAG_COLUMN
ARG NOTION_ELEMENT_COLUMN
ARG NOTION_TAG_DAILY
ARG NOTION_TAG_WEEKLY

ENV NOTION_KEY=${NOTION_KEY}
ENV NOTION_DATABASE_ID=${NOTION_DATABASE_ID}
ENV NOTION_TEMPLATE_DAILY_ID=${NOTION_TEMPLATE_DAILY_ID}
ENV NOTION_TEMPLATE_WEEKLY_ID=${NOTION_TEMPLATE_WEEKLY_ID}
ENV NOTION_REMIND_COLUMN=${NOTION_REMIND_COLUMN}
ENV NOTION_TAG_COLUMN=${NOTION_TAG_COLUMN}
ENV NOTION_ELEMENT_COLUMN=${NOTION_ELEMENT_COLUMN}
ENV NOTION_TAG_DAILY=${NOTION_TAG_DAILY}
ENV NOTION_TAG_WEEKLY=${NOTION_TAG_WEEKLY}

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
