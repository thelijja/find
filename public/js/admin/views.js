(function() {
  var CategoryResultView, CategorySearchView, ProductCategoryEditView, ProductCategoryView, _ref,
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

  })(app.BaseView);

  CategoryResultView = (function(_super) {

    __extends(CategoryResultView, _super);

    function CategoryResultView() {
      CategoryResultView.__super__.constructor.apply(this, arguments);
    }

    CategoryResultView.prototype.el = '#result-area';

    CategoryResultView.prototype.events = {
      'click #btn-add': 'createCategory'
    };

    CategoryResultView.prototype.initialize = function() {
      this.$el.empty();
      this.$el.html($('#tpl-category-results').html());
      return this.render();
    };

    CategoryResultView.prototype.render = function() {};

    CategoryResultView.prototype.createCategory = function() {
      var cat, catEditView;
      cat = new app.ProductCategory({
        id: '',
        code: '',
        name: ''
      });
      catEditView = new app.ProductCategoryEditView({
        model: cat
      });
      return this.$('tbody').prepend(catEditView.render().el);
    };

    return CategoryResultView;

  })(app.BaseView);

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

  })(app.BaseView);

  ProductCategoryEditView = (function(_super) {

    __extends(ProductCategoryEditView, _super);

    function ProductCategoryEditView() {
      ProductCategoryEditView.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryEditView.prototype.tagName = 'tr';

    ProductCategoryEditView.prototype.template = app.BaseView.getTemplate('#tpl-category-edit');

    ProductCategoryEditView.prototype.render = function() {
      return this.renderDefault();
    };

    return ProductCategoryEditView;

  })(app.BaseView);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.ProductCategoryView = ProductCategoryView;

  this.app.CategorySearchView = CategorySearchView;

  this.app.CategoryResultView = CategoryResultView;

  this.app.ProductCategoryEditView = ProductCategoryEditView;

}).call(this);
