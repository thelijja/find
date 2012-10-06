(function() {
  var CategoryResultView, CategorySearchView, FeatureCategoryEditView, FeatureCategoryResultView, FeatureCategoryRowView, FeatureCategorySearchView, FeatureCategoryView, FeatureMainView, ProductCategoryAreaView, ProductCategoryEditView, ProductCategoryNodeView, ProductCategoryRowView, ProductCategoryTreeView, ProductCategoryView, ProductFeatureEditView, ProductFeatureResultView, ProductFeatureRowView, _ref,
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
      this.model = new app.ProductCategorySearchModel();
      this.collection = new app.ProductCategories();
      this.collection.fetch();
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
      this.model = new app.FeatureCategorySearchModel;
      this.collection = new app.FeatureCategories;
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

  ProductCategoryNodeView = (function(_super) {

    __extends(ProductCategoryNodeView, _super);

    function ProductCategoryNodeView() {
      ProductCategoryNodeView.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryNodeView.prototype.tagName = 'li';

    ProductCategoryNodeView.prototype.render = function() {
      var aEl, children, inputEl, labelEl;
      if (this.model.has('children') && this.model.get('children').length > 0) {
        inputEl = this.make("input", {
          "type": "checkbox"
        });
        labelEl = this.make("label", {
          "for": this.model.id,
          "class": "parent"
        }, this.model.get('name'));
        $(labelEl).append(this.make("i", {
          "class": "icon-th-list pull-right"
        }));
        this.$el.append(inputEl);
        this.$el.append(labelEl);
        children = new app.ProductCategoryTree(this.model.get('children'));
        this.$el.append((new app.ProductCategoryTreeView({
          collection: children
        })).render().el);
      } else {
        aEl = this.make("label", {
          "for": this.model.id
        }, this.model.get('name'));
        $(aEl).append(this.make("i", {
          "class": "icon-th-list pull-right"
        }));
        this.$el.append(aEl);
      }
      return this;
    };

    return ProductCategoryNodeView;

  })(app.BaseView);

  ProductCategoryTreeView = (function(_super) {

    __extends(ProductCategoryTreeView, _super);

    function ProductCategoryTreeView() {
      ProductCategoryTreeView.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryTreeView.prototype.tagName = 'ul';

    ProductCategoryTreeView.prototype.render = function() {
      var thatEl;
      thatEl = this.$el;
      this.collection.each(function(item) {
        return thatEl.append((new app.ProductCategoryNodeView({
          model: item
        })).render().el);
      });
      return this;
    };

    return ProductCategoryTreeView;

  })(app.BaseView);

  ProductCategoryAreaView = (function(_super) {

    __extends(ProductCategoryAreaView, _super);

    function ProductCategoryAreaView() {
      ProductCategoryAreaView.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryAreaView.prototype.el = 'div.left-area';

    ProductCategoryAreaView.prototype.events = {
      'click i': 'categorySelected'
    };

    ProductCategoryAreaView.prototype.initialize = function() {
      return this.collection.on('reset', this.render, this);
    };

    ProductCategoryAreaView.prototype.render = function() {
      var treeBody;
      this.$el.empty();
      treeBody = (new app.ProductCategoryTreeView({
        collection: this.collection
      })).render().el;
      return this.$el.append(this.make("div", {
        "class": "css-treeview"
      }, treeBody));
    };

    ProductCategoryAreaView.prototype.categorySelected = function(e) {
      var categoryId;
      categoryId = $(e.target).parent().attr('for');
      return this.collection.trigger('selected', categoryId);
    };

    return ProductCategoryAreaView;

  })(app.BaseView);

  ProductFeatureRowView = (function(_super) {

    __extends(ProductFeatureRowView, _super);

    function ProductFeatureRowView() {
      ProductFeatureRowView.__super__.constructor.apply(this, arguments);
    }

    ProductFeatureRowView.prototype.template = app.BaseView.getTemplate('#tpl-feature-row');

    ProductFeatureRowView.prototype.initialize = function() {
      var dt, fc;
      if (this.model.get('data_type') != null) {
        dt = this.options.datatypes.get(this.model.get('data_type'));
      }
      if (dt != null) {
        this.model.set({
          dataTypeDesc: dt.get('name')
        });
      }
      if (this.model.get('feature_category_id') != null) {
        fc = this.options.featurecats.get(this.model.get('feature_category_id'));
      }
      if (fc != null) {
        return this.model.set({
          featureCategory: fc.get('name')
        });
      }
    };

    return ProductFeatureRowView;

  })(app.TableItemDisplayView);

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
      (new app.LookupDropDownView({
        el: '#feature-category',
        collection: this.options.featurecats
      })).render();
      (new app.LookupDropDownView({
        el: '#feature-datatype',
        collection: this.options.datatypes
      })).render();
      if (this.model.has('feature_category_id')) {
        this.$("#feature-category option[value='" + this.model.get('feature_category_id') + "']").attr('selected', "selected");
      }
      if (this.model.has('data_type')) {
        this.$("#feature-datatype option[value='" + this.model.get('data_type') + "']").attr('selected', "selected");
      }
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
        description: this.$('#feature-desc').val(),
        feature_category_id: this.$('#feature-category').val()
      });
    };

    return ProductFeatureEditView;

  })(app.TableItemEditView);

  ProductFeatureResultView = (function(_super) {

    __extends(ProductFeatureResultView, _super);

    function ProductFeatureResultView() {
      ProductFeatureResultView.__super__.constructor.apply(this, arguments);
    }

    ProductFeatureResultView.prototype.createItemDisplayView = function(model) {
      return new ProductFeatureRowView({
        model: model,
        productcats: this.categories,
        featurecats: this.featurecats,
        datatypes: this.datatypes
      });
    };

    ProductFeatureResultView.prototype.createItemEditView = function(model) {
      return new ProductFeatureEditView({
        model: model,
        productcats: this.categories,
        featurecats: this.featurecats,
        datatypes: this.datatypes
      });
    };

    ProductFeatureResultView.prototype.createEmptyModel = function() {
      return new app.ProductFeature({
        name: '',
        importance: 0,
        product_category_id: this.productCategoryId
      });
    };

    ProductFeatureResultView.prototype.initialize = function() {
      ProductFeatureResultView.__super__.initialize.apply(this, arguments);
      this.categories = new app.LookupEntries(null, {
        url: app.lookupApiUrl.get('category')
      });
      this.featurecats = new app.LookupEntries(null, {
        url: app.lookupApiUrl.get('featurecat')
      });
      this.datatypes = new app.LookupEntries(null, {
        url: app.lookupApiUrl.get('datatype')
      });
      this.categories.fetch();
      this.featurecats.fetch();
      return this.datatypes.fetch();
    };

    ProductFeatureResultView.prototype.render = function() {
      ProductFeatureResultView.__super__.render.apply(this, arguments);
      if (this.productCategoryId > 0) {
        return this.$('h3').html(this.categories.get(this.productCategoryId).get('name'));
      }
    };

    ProductFeatureResultView.prototype.productCategoryId = -1;

    return ProductFeatureResultView;

  })(app.SearchResultTableView);

  FeatureMainView = (function(_super) {

    __extends(FeatureMainView, _super);

    function FeatureMainView() {
      FeatureMainView.__super__.constructor.apply(this, arguments);
    }

    FeatureMainView.prototype.initialize = function() {
      this.productCategories = new app.ProductCategoryTree;
      this.productCategories.on('selected', this.selected, this);
      this.features = new app.ProductFeatures;
      this.productCategoryView = new app.ProductCategoryAreaView({
        collection: this.productCategories
      });
      this.resultView = new app.ProductFeatureResultView({
        el: 'div.right-area',
        collection: this.features,
        template: '#tpl-feature-results'
      });
      return this.productCategories.fetch();
    };

    FeatureMainView.prototype.selected = function(categoryId) {
      var that;
      that = this;
      return $.ajax({
        url: that.features.url + '/' + categoryId,
        dataType: 'json',
        success: function(resp) {
          that.resultView.productCategoryId = categoryId;
          return that.features.reset(resp);
        }
      });
    };

    FeatureMainView.prototype.close = function() {
      if (this.productCategoryView != null) this.productCategoryView.close();
      if (this.resultView != null) return this.resultView.close();
    };

    return FeatureMainView;

  })(app.BaseView);

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

  this.app.FeatureMainView = FeatureMainView;

  this.app.ProductCategoryAreaView = ProductCategoryAreaView;

  this.app.ProductCategoryTreeView = ProductCategoryTreeView;

  this.app.ProductCategoryNodeView = ProductCategoryNodeView;

  this.app.ProductFeatureResultView = ProductFeatureResultView;

  this.app.ProductFeatureEditView = ProductFeatureEditView;

  this.app.ProductCategoryRowView = ProductCategoryRowView;

}).call(this);
