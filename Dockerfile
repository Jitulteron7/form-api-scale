FROM node:17
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . ./
ENV PORT 8082
EXPOSE $PORT

CMD [ "npm","run", "dev"]

