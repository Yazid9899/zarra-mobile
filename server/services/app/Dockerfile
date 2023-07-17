FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://postgres:DDDlaskjnvlVVsca@db.juhhukkbdqofsbmcavun.supabase.co:5432/postgres"


WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]



