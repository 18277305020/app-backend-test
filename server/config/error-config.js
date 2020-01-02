(function (errorConfig) {
  "use strict";

  // *** error handling ***
  const Logger = require('../lib/Logger');

  errorConfig.init = function (app) {
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      const err = new Error("Not Found");
      err.status = 404;
      next(err);
    });

    app.use(function (err, req, res, next) {
      Logger.error(err);
      res.status(err.status || 500).json({
        message: err.message,
        error: "Internal Server Error"
      });
    });
  };
})(module.exports);
