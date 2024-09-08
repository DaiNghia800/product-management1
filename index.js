const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Trang chu");
});

app.get("/products", (req, res) => {
    res.send("Trang danh sach san pham");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})