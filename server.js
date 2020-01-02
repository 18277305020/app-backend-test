const compression = require('compression');
const express = require('express');
const nextjs = require('next');
const bodyParser = require('body-parser');


//server
const serverApp = require('./server/app');


const http = require('http');
const Logger = require("./server/lib/Logger");
const server = http.createServer(serverApp);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({dev});
const handler = app.getRequestHandler();


//server.listen(port);
server.on("error", onError);
server.on("listening", onListening);


function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            Logger.error(bind + " requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            Logger.error(bind + " is already in use");
            process.exit(1);
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    Logger.debug("Listening on " + bind);
}

app.prepare()
    .then(() => {
        // Initialize express.js server.
        const expressServer = express();

        expressServer.use(bodyParser.json());
        expressServer.use(bodyParser.urlencoded({extended: true}));

        // Serve gzipped content where possible.
        expressServer.use(compression());


        expressServer.get('/assets/:id/main.css', (req, res) => {
            res.setHeader('Content-Type', 'text/css');
            res.setHeader('Cache-Control', 'public, max-age=2592000');
            res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
            res.send(sassResult.css);
        });

        // Send robots.txt file from /static folder.
        const options = {
            root: `${__dirname}/static/`,
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8',
            },
        };
        expressServer.get('/robots.txt', (req, res) => (
            res.status(200).sendFile('robots.txt', options)
        ));

        // Set browser caching for all static files.
        expressServer.use('/static', express.static(`${__dirname}/static`, {
            maxAge: '7d',
        }));

        expressServer.use('/api', serverApp)

        expressServer.get('*', (req, res) => {
            if (req.session && req.session.logined) {
                app.render(req, res, '/manager/user')
            } else {
                handler(req, res);
            }
        });

        expressServer.listen(port, err => {
            if (err) throw err;
            console.log('> Ready on localhost:3001');
        });
    });
