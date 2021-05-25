FROM node:14.17.0-alpine as build

ENV SASS_PATH=node_modules/@ferlab/style/themes/cqdg/:src/style/themes/default

ENV REACT_APP_TOKEN_NAME=cqdg-token-cache
ENV REACT_APP_REFRESH_TOKEN_NAME=cqdg-refresh-token-cache
ENV REACT_APP_SESSION_TOKEN_NAME=cqdg-session-token-cache
ENV REACT_APP_API_URL=https://portal.qa.cqdg.ferlab.bio/arranger
ENV REACT_APP_KEYCLOAK_CONFIG="{\"realm\": \"CQDG\", \"url\": \"https://auth.qa.cqdg.ferlab.bio/auth/\", \"clientId\": \"cqdg-client\"}"

ADD . /code
WORKDIR /code
RUN npm install
RUN npm run build

RUN rm -rf node_modules
RUN npm install --only=prod

FROM nginx:stable-alpine as runtime

COPY --from=build /code/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /opt/entrypoint.sh
RUN chmod +x /opt/entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/opt/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]