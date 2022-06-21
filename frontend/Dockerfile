FROM node:14-alpine

WORKDIR /app

COPY . /app

RUN npm set strict-ssl false
RUN npm i -g @angular/cli
RUN npm i -g @ionic/cli
RUN npm i

EXPOSE 8100

CMD ["ionic","serve"]