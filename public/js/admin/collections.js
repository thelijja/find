(function() {
  var FeatureCategories, ProductCategories, ProductCategoryTree, ProductFeatures, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  ProductCategories = (function(_super) {

    __extends(ProductCategories, _super);

    function ProductCategories() {
      ProductCategories.__super__.constructor.apply(this, arguments);
    }

    ProductCategories.prototype.model = app.ProductCategory;

    ProductCategories.prototype.url = 'api/admin/categories';

    ProductCategories.prototype.getAllExcept = function(id) {
      return _.reject(this.models, function(model) {
        return model.id === id;
      });
    };

    return ProductCategories;

  })(app.BaseCollection);

  FeatureCategories = (function(_super) {

    __extends(FeatureCategories, _super);

    function FeatureCategories() {
      FeatureCategories.__super__.constructor.apply(this, arguments);
    }

    FeatureCategories.prototype.model = app.FeatureCategory;

    FeatureCategories.prototype.url = 'api/admin/featurecats';

    return FeatureCategories;

  })(app.BaseCollection);

  ProductFeatures = (function(_super) {

    __extends(ProductFeatures, _super);

    function ProductFeatures() {
      ProductFeatures.__super__.constructor.apply(this, arguments);
    }

    ProductFeatures.prototype.model = app.ProductFeature;

    ProductFeatures.prototype.url = 'api/admin/features';

    return ProductFeatures;

  })(app.BaseCollection);

  ProductCategoryTree = (function(_super) {

    __extends(ProductCategoryTree, _super);

    function ProductCategoryTree() {
      ProductCategoryTree.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryTree.prototype.model = app.ProductCategoryTreeNode;

    ProductCategoryTree.prototype.url = 'api/lookup/categorytree';

    return ProductCategoryTree;

  })(app.BaseCollection);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.ProductCategories = ProductCategories;

  this.app.FeatureCategories = FeatureCategories;

  this.app.ProductFeatures = ProductFeatures;

  this.app.ProductCategoryTree = ProductCategoryTree;

}).call(this);
