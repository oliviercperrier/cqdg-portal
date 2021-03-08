#!/bin/sh

export KEYCLOAK_REALM=${KEYCLOAK_REALM:-CQDG}
export KEYCLOAK_CLIENT_ID=${KEYCLOAK_CLIENT_ID:-cqdg-client}

cat > /usr/share/nginx/html/config.js <<- EndOfConf
window.env = {
    REACT_APP_API_URL:"$API_URL",
    REACT_APP_KEYCLOAK_CONFIG:{"realm": "$KEYCLOAK_REALM", "url": "$KEYCLOAK_URL", "clientId": "$KEYCLOAK_CLIENT_ID"}
}
EndOfConf

exec "$@"