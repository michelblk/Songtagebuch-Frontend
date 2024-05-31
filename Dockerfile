FROM --platform=amd64 node:20-alpine AS build
WORKDIR /app
RUN npm cache clean --force
COPY /src /app/src
COPY /angular.json /package.json /package-lock.json /tsconfig.app.json /tsconfig.json /app/
RUN npm install
RUN npm run build --omit=dev

FROM nginx:latest AS ngi
COPY --from=build /app/dist/songtagebuch/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
