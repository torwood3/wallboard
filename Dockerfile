FROM hypriot/rpi-node:boron

# Create app directory
WORKDIR /app

# Install app dependencies
ADD package.json /app
RUN npm install --production

ADD app.js /app
ADD dist/ /app

EXPOSE 8081

CMD ["npm","start"]
