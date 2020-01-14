(function (routeConfig) {
    "use strict";

    routeConfig.init = function (app) {
        app.use("/", require("../routes/index"));
        app.use("/member", require("../routes/member"));
        app.use("/department", require("../routes/department"));
        app.use("/library", require("../routes/library"));
    };
})(module.exports);
