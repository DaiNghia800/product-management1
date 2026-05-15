const homeRoute = require("./home.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");
const middleware = require("../../middlewares/client/category.middleware");
const middleware2 = require("../../middlewares/client/cart.middleware");
const orderRoute = require("./order.route");
const userRoute = require("./user.route");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");
const logVisit = require("../../middlewares/client/logVisit.middleware");

module.exports = (app) => {
    app.use(middleware.category);
    app.use(middleware2.cart);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.general);
    app.use(logVisit);
    app.use("/", homeRoute);
    app.use("/products", productRoute);
    app.use("/cart", cartRoute);
    app.use("/order", orderRoute);
    app.use("/user", userRoute);
    app.get("*", (req, res) => {
        res.render("client/pages/errors/404", {
          pageTitle: "404 Not Found",
        });
    });
}