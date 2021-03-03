FROM node:14.4.0-alpine as build

ADD . /code
WORKDIR /code
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as runtime

COPY --from=build /code/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]