const Visit = require("../../models/views-visit.model");

module.exports.viewer = async (req, res) => {
    const sumViewers = await Visit.countDocuments();
    res.render("admin/pages/statistics/index", {
        pageTitle: "Trang thống kê lượt xem trang",
        sumViewers: sumViewers
    });
};