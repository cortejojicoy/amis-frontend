FROM node:14
WORKDIR /app
COPY package.json ./app
COPY . /app
RUN npm install
EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000