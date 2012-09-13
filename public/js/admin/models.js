(function() {
  var ProductCategory, ProductCategorySearchModel, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  ProductCategorySearchModel = (function(_super) {

    __extends(ProductCategorySearchModel, _super);

    function ProductCategorySearchModel() {
      ProductCategorySearchModel.__super__.constructor.apply(this, arguments);
    }

    return ProductCategorySearchModel;

  })(app.BaseModel);

  ProductCategory = (function(_super) {

    __extends(ProductCategory, _super);

    function ProductCategory() {
      ProductCategory.__super__.constructor.apply(this, arguments);
    }

    ProductCategory.prototype.urlRoot = '/api/admin/categories';

    ProductCategory.prototype["default"] = {
      code: "",
      name: ""
    };

    return ProductCategory;

  })(app.BaseModel);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.ProductCategory = ProductCategory;

  this.app.ProductCategorySearchModel = ProductCategorySearchModel;

}).call(this);
