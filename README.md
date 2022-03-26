
    npm run build:ssr
    Move the dist over to your server
    install PM2
    npm install pm2 -g
    On your server, use PM2 to run the server bundled app
    pm2 start dist/server.js
    If you're using Nginx, or other web servers, make sure to redirect requests to the port that the app started with PM2 is listening on.
credentials: user: tom pass: Belgrade2010

pm2 start ./path/main.js

also can use pm2 stop all

when rendering use the command:
also make sure that proper packages are installed on frontend server.  (npm and Express)
typically use pre-rendering
    `ng run front-user:prerender --routes-file routes.txt --no-guess-routes`
