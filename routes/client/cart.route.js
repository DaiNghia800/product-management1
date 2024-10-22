const express = require("express");
const route = express.Router();

const controller = require("../../controllers/client/cart.controller");

route.get("/", controller.index);

route.post("/add/:id", controller.addCart);

route.get("/delete/:id", controller.delete);

route.patch("/update", controller.updatePatch);

module.exports = route;