const Router = require("express").Router;
const taskRoute = require("./task/taskRoute");
module.exports = () => {
    const router = Router();
    taskRoute(router);
    return router;
};
