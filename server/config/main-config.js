(function (appConfig) {
  "use strict";

  // *** main dependencies *** //
  const cookieParser = require("cookie-parser");
  const bodyParser = require("body-parser");
  const flash = require("connect-flash");
  const Logger = require("../lib/Logger");

  // *** load environment variables *** //
  require("dotenv").config();

  appConfig.init = function (app, express) {
    // *** view engine *** //
    app.set("view engine", "html");

    // *** app middleware *** //

    Logger.initRequestLogger(app);


    // *** cross domain requests *** //
    const allowCrossDomain = function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      next();
    };

    app.use(allowCrossDomain);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(flash());
  };
})(module.exports);
