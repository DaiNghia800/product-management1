const homeRoute = require("./home.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");
const middleware = require("../../middlewares/client/category.middleware");
const middleware2 = require("../../middlewares/client/cart.middleware");
const orderRoute = require("./order.route");
const userRoute = require("./user.route");
const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) => {
    app.use(middleware.category);
    app.use(middleware2.cart);
    app.use(userMiddleware.infoUser);
    app.use("/", homeRoute);
    app.use("/products", productRoute);
    app.use("/cart", cartRoute);
    app.use("/order", orderRoute);
    app.use("/user", userRoute);
}