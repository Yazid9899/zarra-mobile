FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV APP_SERVICE_URL=http://app:4002
ENV USER_SERVICE_URL=http://user:4001

WORKDIR /orchestrator-graphQL

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]



