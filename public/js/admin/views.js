(function() {
  var CategoryResultView, CategorySearchView, FeatureCategoryEditView, FeatureCategoryResultView, FeatureCategoryRowView, FeatureCategorySearchView, FeatureCategoryView, ProductCategoryEditView, ProductCategoryRowView, ProductCategoryView, ProductFeatureEditView, ProductFeatureResultView, ProductFeatureRowView, ProductFeatureSearchView, ProductFeatureView, _ref,
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
      model.set('parentCode', '');
      if (!_.isUndefined(model.get('parent_id')) && model.get('parent_id') > 0) {
        model.set('parentCode', this.collection.get(model.get('parent_id')).get('code'));
      }
      return new ProductCategoryRowView({
        model: model,
        categories: this.collection
      });
    };

    CategoryResultView.prototype.createItemEditView = function(model) {
      return new ProductCategoryEditView({
        model: model,
        categories: this.collection
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

    ProductCategoryView.prototype.close = function() {
      if (this.searchView != null) this.searchView.close();
      if (this.resultView != null) return this.resultView.close();
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
        name: this.$('.name-edit').val(),
        parent_id: this.$('#parentId').val()
      });
    };

    ProductCategoryEditView.prototype.render = function() {
      var cat, otherCats, _i, _len;
      ProductCategoryEditView.__super__.render.apply(this, arguments);
      otherCats = this.options.categories.getAllExcept(this.model.id);
      for (_i = 0, _len = otherCats.length; _i < _len; _i++) {
        cat = otherCats[_i];
        this.$('#parentId').append('<option value="' + cat.id + '">' + cat.get('code') + '</option>');
      }
      if (this.model.has('parent_id')) {
        this.$("#parentId option[value='" + this.model.get('parent_id') + "']").attr('selected', "selected");
      }
      return this;
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

  FeatureCategorySearchView = (function(_super) {

    __extends(FeatureCategorySearchView, _super);

    function FeatureCategorySearchView() {
      FeatureCategorySearchView.__super__.constructor.apply(this, arguments);
    }

    return FeatureCategorySearchView;

  })(app.SearchCriteriaView);

  FeatureCategoryResultView = (function(_super) {

    __extends(FeatureCategoryResultView, _super);

    function FeatureCategoryResultView() {
      FeatureCategoryResultView.__super__.constructor.apply(this, arguments);
    }

    FeatureCategoryResultView.prototype.createItemDisplayView = function(model) {
      return new FeatureCategoryRowView({
        model: model
      });
    };

    FeatureCategoryResultView.prototype.createItemEditView = function(model) {
      return new FeatureCategoryEditView({
        model: model
      });
    };

    FeatureCategoryResultView.prototype.createEmptyModel = function() {
      return new app.FeatureCategory({
        code: '',
        name: ''
      });
    };

    return FeatureCategoryResultView;

  })(app.SearchResultTableView);

  FeatureCategoryView = (function(_super) {

    __extends(FeatureCategoryView, _super);

    function FeatureCategoryView() {
      FeatureCategoryView.__super__.constructor.apply(this, arguments);
    }

    FeatureCategoryView.prototype.initialize = function() {
      this.model.on('search', this.search, this);
      this.model.on('reset', this.reset, this);
      this.searchView = new app.FeatureCategorySearchView({
        model: this.model,
        template: '#tpl-featurecat-search'
      });
      return this.resultView = new app.FeatureCategoryResultView({
        collection: this.collection,
        template: '#tpl-featurecat-results'
      });
    };

    FeatureCategoryView.prototype.renader = function() {};

    FeatureCategoryView.prototype.search = function() {
      return this.collection.fetch();
    };

    FeatureCategoryView.prototype.reset = function() {
      return this.collection.reset([]);
    };

    FeatureCategoryView.prototype.close = function() {
      if (this.searchView != null) this.searchView.close();
      if (this.resultView != null) return this.resultView.close();
    };

    return FeatureCategoryView;

  })(app.BaseView);

  FeatureCategoryEditView = (function(_super) {

    __extends(FeatureCategoryEditView, _super);

    function FeatureCategoryEditView() {
      FeatureCategoryEditView.__super__.constructor.apply(this, arguments);
    }

    FeatureCategoryEditView.prototype.template = app.BaseView.getTemplate('#tpl-featurecat-edit');

    FeatureCategoryEditView.prototype.readInputs = function() {
      return this.model.set({
        code: this.$('.code-edit').val(),
        name: this.$('.name-edit').val()
      });
    };

    return FeatureCategoryEditView;

  })(app.TableItemEditView);

  FeatureCategoryRowView = (function(_super) {

    __extends(FeatureCategoryRowView, _super);

    function FeatureCategoryRowView() {
      FeatureCategoryRowView.__super__.constructor.apply(this, arguments);
    }

    FeatureCategoryRowView.prototype.template = app.BaseView.getTemplate('#tpl-featurecat-row');

    return FeatureCategoryRowView;

  })(app.TableItemDisplayView);

  ProductFeatureSearchView = (function(_super) {

    __extends(ProductFeatureSearchView, _super);

    function ProductFeatureSearchView() {
      ProductFeatureSearchView.__super__.constructor.apply(this, arguments);
    }

    return ProductFeatureSearchView;

  })(app.SearchCriteriaView);

  ProductFeatureResultView = (function(_super) {

    __extends(ProductFeatureResultView, _super);

    function ProductFeatureResultView() {
      ProductFeatureResultView.__super__.constructor.apply(this, arguments);
    }

    ProductFeatureResultView.prototype.createItemDisplayView = function(model) {
      return new ProductFeatureRowView({
        model: model
      });
    };

    ProductFeatureResultView.prototype.createItemEditView = function(model) {
      return new ProductFeatureEditView({
        model: model
      });
    };

    ProductFeatureResultView.prototype.createEmptyModel = function() {
      return new app.ProductFeature({
        name: '',
        importance: 0
      });
    };

    return ProductFeatureResultView;

  })(app.SearchResultTableView);

  ProductFeatureView = (function(_super) {

    __extends(ProductFeatureView, _super);

    function ProductFeatureView() {
      ProductFeatureView.__super__.constructor.apply(this, arguments);
    }

    ProductFeatureView.prototype.initialize = function() {
      this.model.on('search', this.search, this);
      this.model.on('reset', this.reset, this);
      this.searchView = new app.ProductFeatureSearchView({
        model: this.model,
        template: '#tpl-feature-search'
      });
      return this.resultView = new app.ProductFeatureResultView({
        collection: this.collection,
        template: '#tpl-feature-results'
      });
    };

    ProductFeatureView.prototype.renader = function() {};

    ProductFeatureView.prototype.search = function() {
      return this.collection.fetch();
    };

    ProductFeatureView.prototype.reset = function() {
      return this.collection.reset([]);
    };

    ProductFeatureView.prototype.close = function() {
      if (this.searchView != null) this.searchView.close();
      if (this.resultView != null) return this.resultView.close();
    };

    return ProductFeatureView;

  })(app.BaseView);

  ProductFeatureEditView = (function(_super) {

    __extends(ProductFeatureEditView, _super);

    function ProductFeatureEditView() {
      ProductFeatureEditView.__super__.constructor.apply(this, arguments);
    }

    ProductFeatureEditView.prototype.tagName = 'div';

    ProductFeatureEditView.prototype.template = app.BaseView.getTemplate('#tpl-feature-edit');

    ProductFeatureEditView.prototype.isModalEditView = function() {
      return true;
    };

    ProductFeatureEditView.prototype.render = function() {
      this.$el.empty();
      this.$el.html(this.template({
        m: this.model.toJSON()
      }));
      $('#modal-temp-placeholder').html(this.el);
      this.$('#modal-feature-edit').modal();
      return this;
    };

    ProductFeatureEditView.prototype.hideModal = function() {
      return this.$('#modal-feature-edit').modal('hide');
    };

    ProductFeatureEditView.prototype.readInputs = function() {
      return this.model.set({
        name: this.$('#feature-name').val(),
        data_type: this.$('#feature-datatype').val(),
        importance: this.$('#feature-importance').val(),
        description: this.$('#feature-desc').val()
      });
    };

    return ProductFeatureEditView;

  })(app.TableItemEditView);

  ProductFeatureRowView = (function(_super) {

    __extends(ProductFeatureRowView, _super);

    function ProductFeatureRowView() {
      ProductFeatureRowView.__super__.constructor.apply(this, arguments);
    }

    ProductFeatureRowView.prototype.template = app.BaseView.getTemplate('#tpl-feature-row');

    return ProductFeatureRowView;

  })(app.TableItemDisplayView);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.ProductCategoryView = ProductCategoryView;

  this.app.CategorySearchView = CategorySearchView;

  this.app.CategoryResultView = CategoryResultView;

  this.app.ProductCategoryEditView = ProductCategoryEditView;

  this.app.ProductCategoryRowView = ProductCategoryRowView;

  this.app.FeatureCategoryView = FeatureCategoryView;

  this.app.FeatureCategorySearchView = FeatureCategorySearchView;

  this.app.FeatureCategoryResultView = FeatureCategoryResultView;

  this.app.FeatureCategoryEditView = FeatureCategoryEditView;

  this.app.FeatureCategoryRowView = FeatureCategoryRowView;

  this.app.ProductFeatureView = ProductFeatureView;

  this.app.ProductFeatureSearchView = ProductFeatureSearchView;

  this.app.ProductFeatureResultView = ProductFeatureResultView;

  this.app.ProductFeatureEditView = ProductFeatureEditView;

  this.app.ProductCategoryRowView = ProductCategoryRowView;

}).call(this);
