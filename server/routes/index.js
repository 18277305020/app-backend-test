const express = require("express");
const router = express.Router();
const Logger = require("../lib/Logger");

router.get("/", function (req, res, next) {
  const params = req.query;
  switch (params.log) {
    case "info":
      Logger.info("info");
      break;
    case "debug":
      Logger.debug("debug");
      break;
    case "error":
      Logger.error("error");
      break;
    case "warn":
      Logger.warn("warn");
      break;
    default:
      break;
  }

  res.json({
    "WANHUATONG API": "active"
  });
});

module.exports = router;
