/*global module*/

const SECTION = 'insights';
const APP_ID = 'rc-manager';
const FRONTEND_PORT = 8002;
const API_PORT = 9001;
const routes = {};

routes[`/beta/${SECTION}/${APP_ID}`] = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/${SECTION}/${APP_ID}`]      = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/beta/apps/${APP_ID}`]       = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/apps/${APP_ID}`]            = { host: `https://localhost:${FRONTEND_PORT}` };

routes[`/api/${APP_ID}`] = { host: `https://localhost:${API_PORT}` };

module.exports = { routes };
