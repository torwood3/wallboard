FROM hypriot/rpi-node:boron

# Create app directory
WORKDIR /app

#Front end
WORKDIR /app/client

ADD client/package.json /app/client/
RUN npm install --production
ADD client/dist/ /app/client/dist

#Back end
WORKDIR /app/server

ADD server/package.json /app/server
RUN npm install --production
ADD server/app.js /app/server

WORKDIR /app

EXPOSE 8080
CMD ["node","/app/server/app.js"]
