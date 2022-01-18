FROM node:14

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY tsconfig.json tsconfig.build.json nest-cli.json .prettierrc .eslintrc.js ./
COPY src src

RUN yarn install
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
