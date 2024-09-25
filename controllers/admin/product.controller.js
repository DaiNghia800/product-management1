const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
    const find = {
      deleted: false
    };

    // Lọc theo trạng thái 
    if(req.query.status) {
        find.status = req.query.status;
    }
    // Hết lọc theo trạng thái

    // Tìm kiếm 
    if(req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
      }
    // Hết tìm kiếm 
    
    // Phân trang 
    let page = 1;
    let limitItems = 4;

    if(req.query.page) {
        page = parseInt(req.query.page);
    }

    if(req.query.limit) {
        limitItems = parseInt(req.query.limit);
    }

    const totalProducts = await Product.countDocuments(find);
    const totalPages = Math.ceil(totalProducts / limitItems); 
    // console.log(totalPages);

    const skip = (page - 1) * limitItems;
    //Hết Phân trang 

    const products = await Product
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort({
      position: "desc"
    });

    res.render("admin/pages/products/index", {
        title: "Trang product",
        products: products,
        totalPage: totalPages,
        currentPage: page
    })
};

module.exports.changeStatus = async (req, res) => {
    await Product.updateOne({
        _id: req.body.id
    },{
        status: req.body.status
    });

    req.flash('success', 'Đổi trạng thái thành công!');

    res.json(
        {   code: "success"
        }
    );
};

module.exports.changeMulti = async (req, res) => {
    switch (req.body.status) {
        case 'active':
        case 'inactive':
          await Product.updateMany({
            _id: req.body.ids
          }, {
            status: req.body.status
          });

          req.flash('success', 'Đổi trạng thái thành công!');
    
          res.json({
            code: "success"
          });
          break;
        case 'delete':
          await Product.updateMany({
            _id: req.body.ids
          }, {
            deleted: true
          });
    
          res.json({
            code: "success",
            message: "Xóa thành công!"
          });
          break;
        default:
          res.json({
            code: "error",
            message: "Trạng thái không hợp lệ!"
          });
          break;
      }
};

module.exports.delete = async (req, res) => {
    await Product.updateOne({
        _id: req.body.id
    },{
        deleted: true
    });
    
    req.flash('success', 'Xóa thành công!');

    res.json(
        {   
          code: "success"
        }
    );
};

module.exports.changePosition = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id
  },{
    position: req.body.position
  });
  
  req.flash('success', 'Đổi vị trí thành công!');

  res.json(
      {   
        code: "success"
      }
  );
};

module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    title : "Thêm mới sản phẩm"
  })
};

module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  
  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  }

  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  // console.log(req.file);
  // console.log(req.body);

  const record = new Product(req.body);
  await record.save();
  res.redirect(`/${systemConfig.prefixAdmin}/products`);
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne(
    {
      _id: id,
      deleted: false
    });

  res.render("admin/pages/products/edit", {
    product : product,
    pageTitile: "Trang edit"
  });
};

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  }

  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  await Product.updateOne({
    _id: id,
    deleted: false
  }, req.body);

  req.flash("success", "Cập nhật thành công!");
  res.redirect("back");
}

module.exports.detail = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({
    _id: id,
    deleted: false
  });

  res.render("admin/pages/products/detail", {
    pageTitle: "Chi tiết sản phẩm",
    product: product
  });
}  


