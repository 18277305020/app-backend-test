(function (routeConfig) {
    "use strict";

    routeConfig.init = function (app) {
        app.use("/", require("../routes/index"));
        app.use("/member", require("../routes/member"));
    };
})(module.exports);
