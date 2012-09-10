(function() {
  var CategoryResultView, CategorySearchView, ProductCategoryView, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  CategorySearchView = (function(_super) {

    __extends(CategorySearchView, _super);

    function CategorySearchView() {
      CategorySearchView.__super__.constructor.apply(this, arguments);
    }

    CategorySearchView.prototype.el = '#search-area';

    CategorySearchView.prototype.initialize = function() {
      this.$el.empty();
      this.$el.html($('#tpl-category-search').html());
      return this.render();
    };

    CategorySearchView.prototype.render = function() {};

    return CategorySearchView;

  })(Backbone.View);

  CategoryResultView = (function(_super) {

    __extends(CategoryResultView, _super);

    function CategoryResultView() {
      CategoryResultView.__super__.constructor.apply(this, arguments);
    }

    CategoryResultView.prototype.el = '#result-area';

    CategoryResultView.prototype.initialize = function() {
      this.$el.empty();
      this.$el.html($('#tpl-category-results').html());
      return this.render();
    };

    CategoryResultView.prototype.render = function() {};

    return CategoryResultView;

  })(Backbone.View);

  ProductCategoryView = (function(_super) {

    __extends(ProductCategoryView, _super);

    function ProductCategoryView() {
      ProductCategoryView.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryView.prototype.initialize = function() {
      this.searchView = new app.CategorySearchView(this.model);
      return this.resultView = new app.CategoryResultView(this.collection);
    };

    ProductCategoryView.prototype.renader = function() {};

    return ProductCategoryView;

  })(Backbone.View);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.ProductCategoryView = ProductCategoryView;

  this.app.CategorySearchView = CategorySearchView;

  this.app.CategoryResultView = CategoryResultView;

}).call(this);
