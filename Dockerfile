FROM node:lts as builder
LABEL version="0.0.1"
LABEL maintainer="shinjan@cse.iitb.ac.in"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts as production
LABEL version="0.0.1"
LABEL maintainer="shinjan@cse.iitb.ac.in"

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production \
	MOUNT_PREFIX=/api/v1 \
	DATABASE_HOST=mysql \
	DATABASE_PORT=3306 \
	DATABASE_USER=oneboard \
	DATABASE_PASSWORD=oneboard \
	DATABASE_NAME=oneboard \
	MQTT_HOST=mqtt://mosquitto

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
