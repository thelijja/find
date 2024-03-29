(function() {
  var FeatureCategory, FeatureCategorySearchModel, FeatureSearchModel, ProductCategory, ProductCategorySearchModel, ProductCategoryTreeNode, ProductFeature, _ref,
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

    ProductCategory.prototype.defaults = {
      code: "",
      name: ""
    };

    return ProductCategory;

  })(app.BaseModel);

  FeatureCategorySearchModel = (function(_super) {

    __extends(FeatureCategorySearchModel, _super);

    function FeatureCategorySearchModel() {
      FeatureCategorySearchModel.__super__.constructor.apply(this, arguments);
    }

    return FeatureCategorySearchModel;

  })(app.BaseModel);

  FeatureCategory = (function(_super) {

    __extends(FeatureCategory, _super);

    function FeatureCategory() {
      FeatureCategory.__super__.constructor.apply(this, arguments);
    }

    FeatureCategory.prototype.urlRoot = 'api/admin/featurecats';

    FeatureCategory.prototype.defaults = {
      code: "",
      name: ""
    };

    return FeatureCategory;

  })(app.BaseModel);

  FeatureSearchModel = (function(_super) {

    __extends(FeatureSearchModel, _super);

    function FeatureSearchModel() {
      FeatureSearchModel.__super__.constructor.apply(this, arguments);
    }

    return FeatureSearchModel;

  })(app.BaseModel);

  ProductFeature = (function(_super) {

    __extends(ProductFeature, _super);

    function ProductFeature() {
      ProductFeature.__super__.constructor.apply(this, arguments);
    }

    ProductFeature.prototype.urlRoot = 'api/admin/features';

    return ProductFeature;

  })(app.BaseModel);

  ProductCategoryTreeNode = (function(_super) {

    __extends(ProductCategoryTreeNode, _super);

    function ProductCategoryTreeNode() {
      ProductCategoryTreeNode.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryTreeNode.prototype.urlRoot = 'api/lookup/categorytree';

    return ProductCategoryTreeNode;

  })(app.BaseModel);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.ProductCategory = ProductCategory;

  this.app.ProductCategorySearchModel = ProductCategorySearchModel;

  this.app.FeatureCategory = FeatureCategory;

  this.app.FeatureCategorySearchModel = FeatureCategorySearchModel;

  this.app.FeatureSearchModel = FeatureSearchModel;

  this.app.ProductFeature = ProductFeature;

  this.app.ProductCategoryTreeNode = ProductCategoryTreeNode;

}).call(this);
