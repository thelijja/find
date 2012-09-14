(function() {
  var CategoryResultView, CategorySearchView, ProductCategoryEditView, ProductCategoryRowView, ProductCategoryView, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  CategorySearchView = (function(_super) {

    __extends(CategorySearchView, _super);

    function CategorySearchView() {
      CategorySearchView.__super__.constructor.apply(this, arguments);
    }

    return CategorySearchView;

  })(app.SearchCriteriaView);

  CategoryResultView = (function(_super) {

    __extends(CategoryResultView, _super);

    function CategoryResultView() {
      CategoryResultView.__super__.constructor.apply(this, arguments);
    }

    CategoryResultView.prototype.createItemDisplayView = function(model) {
      return new ProductCategoryRowView({
        model: model
      });
    };

    CategoryResultView.prototype.createItemEditView = function(model) {
      return new ProductCategoryEditView({
        model: model
      });
    };

    CategoryResultView.prototype.createEmptyModel = function() {
      return new app.ProductCategory({
        code: '',
        name: ''
      });
    };

    return CategoryResultView;

  })(app.SearchResultTableView);

  ProductCategoryView = (function(_super) {

    __extends(ProductCategoryView, _super);

    function ProductCategoryView() {
      ProductCategoryView.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryView.prototype.initialize = function() {
      this.model.on('search', this.search, this);
      this.model.on('reset', this.reset, this);
      this.searchView = new app.CategorySearchView({
        model: this.model,
        template: '#tpl-category-search'
      });
      return this.resultView = new app.CategoryResultView({
        collection: this.collection,
        template: '#tpl-category-results'
      });
    };

    ProductCategoryView.prototype.renader = function() {};

    ProductCategoryView.prototype.search = function() {
      return this.collection.fetch();
    };

    ProductCategoryView.prototype.reset = function() {
      return this.collection.reset([]);
    };

    return ProductCategoryView;

  })(app.BaseView);

  ProductCategoryEditView = (function(_super) {

    __extends(ProductCategoryEditView, _super);

    function ProductCategoryEditView() {
      ProductCategoryEditView.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryEditView.prototype.template = app.BaseView.getTemplate('#tpl-category-edit');

    ProductCategoryEditView.prototype.readInputs = function() {
      return this.model.set({
        code: this.$('.code-edit').val(),
        name: this.$('.name-edit').val()
      });
    };

    return ProductCategoryEditView;

  })(app.TableItemEditView);

  ProductCategoryRowView = (function(_super) {

    __extends(ProductCategoryRowView, _super);

    function ProductCategoryRowView() {
      ProductCategoryRowView.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryRowView.prototype.template = app.BaseView.getTemplate('#tpl-category-row');

    return ProductCategoryRowView;

  })(app.TableItemDisplayView);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.ProductCategoryView = ProductCategoryView;

  this.app.CategorySearchView = CategorySearchView;

  this.app.CategoryResultView = CategoryResultView;

  this.app.ProductCategoryEditView = ProductCategoryEditView;

  this.app.ProductCategoryRowView = ProductCategoryRowView;

}).call(this);
