FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . . 
RUN npm run build
EXPOSE $APP_PORT
CMD npm run start:$NODE_ENV
