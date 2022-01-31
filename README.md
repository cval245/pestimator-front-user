
    npm run build:ssr
    Move the dist over to your server
    install PM2
    npm install pm2 -g
    On your server, use PM2 to run the server bundled app
    pm2 start dist/server.js
    If you're using Nginx, or other web servers, make sure to redirect requests to the port that the app started with PM2 is listening on.
credentials: user: tim pass: Belgrade2010

