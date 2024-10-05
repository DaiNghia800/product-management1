const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {

    const listCategory = await ProductCategory.find({
        deleted: false
    });

    res.render("admin/pages/products-category/index", {
        title: "Trang danh muc san pham",
        listCategory: listCategory
    })
};

module.exports.create = async (req, res) => {
    const listCategory = await ProductCategory.find({
      deleted: false
    });

    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        listCategory: listCategory
    });
}

module.exports.createPost = async (req, res) => {
    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const countRecord = await ProductCategory.countDocuments();
        req.body.position = countRecord + 1;
    }

    const record = new ProductCategory(req.body);
    record.save();
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
};

module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const listCategory = await ProductCategory.find({
        _id : id, 
        deleted : false
    });

    const itemEdit = await ProductCategory.findOne({
        _id: id, 
        deleted: false
    });

    res.render("admin/pages/products-category/edit" , {
        pageTitle: "Trang edit san pham",
        listCategory: listCategory,
        category: itemEdit
    });
}

module.exports.editPath = async (req, res) => {
    const id = req.params.id;

    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        delete req.body.position;
    }

    await ProductCategory.updateOne({
        _id: id,
        deleted: false
    }, req.body);
    
    req.flash("success", "Cập nhật thành công!");
    res.redirect(`back`);
}