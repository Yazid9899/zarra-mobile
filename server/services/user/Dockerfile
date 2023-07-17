FROM node:lts-hydrogen


ENV NODE_ENV=production
ENV MONGO_SERVER=mongodb+srv://yazidsiddiq9899:2j3Jj1d6qMMgxcM1@hacktiv-p3-c2.a3salar.mongodb.net/
ENV PORT=4001


WORKDIR /user

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]



