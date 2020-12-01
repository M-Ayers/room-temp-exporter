FROM node:lts-alpine

WORKDIR /room-temp-exporter/
COPY package.json package-lock.json /room-temp-exporter/
RUN npm ci --only=production
COPY . /room-temp-exporter/

EXPOSE 3030

CMD npm start
