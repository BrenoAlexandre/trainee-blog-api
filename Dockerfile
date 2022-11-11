FROM node

WORKDIR /dist
COPY package*.json yarn*.json ./

COPY . .

RUN yarn --production --ignore-platform
CMD ["npm", "start"]
EXPOSE 3001
