###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

RUN apk update && apk add curl
RUN apk add openssl-dev --no-cache \
  && mkdir /lib64 \
  && ln -s /lib/ld-musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2 \
  && wget -qO- https://downloads.sourceforge.net/project/videlibri/Xidel/Xidel%200.9.6/xidel-0.9.6.linux64.tar.gz \
  | tar -xzv xidel -C /bin

CMD [ "node", "dist/main.js" ]