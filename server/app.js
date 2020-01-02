(function () {
    "use strict";

    // *** dependencies *** //
    const express = require("express");
    const nextjs = require('next');
    const session = require('express-session')
    const appConfig = require("./config/main-config.js");
    const routeConfig = require("./config/route-config.js");
    const errorConfig = require("./config/error-config.js");

    const dev = process.env.NODE_ENV !== 'production';

    // *** express instance *** //
    const app = express();

    app.use(session({
            secret: 'wanhuatong2018..',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 30
            },
            rolling: true
        })
    );

    app.use("/apidoc", express.static("apidoc"));

    const page = nextjs({dev});
    const handler = page.getRequestHandler();

    app.get('/app', (req, res) => {
        handler(req, res)
    });

    // *** config *** //
    appConfig.init(app, express);

    routeConfig.init(app);

    errorConfig.init(app);

    module.exports = app;
})();
