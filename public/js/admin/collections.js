(function() {
  var ProductCategories, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  ProductCategories = (function(_super) {

    __extends(ProductCategories, _super);

    function ProductCategories() {
      ProductCategories.__super__.constructor.apply(this, arguments);
    }

    ProductCategories.prototype.model = app.ProductCategory;

    ProductCategories.prototype.url = 'api/admin/categories';

    return ProductCategories;

  })(app.BaseCollection);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.ProductCategories = ProductCategories;

}).call(this);
