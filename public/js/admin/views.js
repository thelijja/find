(function() {
  var CategoryResultView, CategorySearchView, ProductCategoryEditView, ProductCategoryRowView, ProductCategoryView, _ref,
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
        code: '',
        name: ''
      });
      cat.on('save', this.itemSave, this);
      cat.on('delete', this.itemDelete, this);
      cat.on('edit', this.itemEdit, this);
      catEditView = new app.ProductCategoryEditView({
        model: cat
      });
      return this.$('tbody').prepend(catEditView.render().el);
    };

    CategoryResultView.prototype.itemSave = function(view) {
      var model, that;
      that = this;
      model = view.model;
      return model.save(null, {
        wait: true,
        success: function(rmodel, response) {
          var rowView, vel;
          vel = view.$el;
          rowView = new app.ProductCategoryRowView({
            model: model
          });
          vel.replaceWith(rowView.render().el);
          return vel.attr('id', model.get('id'));
        },
        error: function(rmodel, errors) {
          return that.showError('Error saving category item..');
        }
      });
    };

    CategoryResultView.prototype.itemDelete = function(view) {
      var model, that;
      that = this;
      model = view.model;
      return model.destroy({
        wait: true,
        success: function() {
          return view.remove();
        },
        error: function(rmodel, errors) {
          return that.showError('Error in deleting item..');
        }
      });
    };

    CategoryResultView.prototype.itemEdit = function(view) {
      var editView, model, vel;
      vel = view.$el;
      model = view.model;
      editView = new app.ProductCategoryEditView({
        model: model
      });
      vel.replaceWith(editView.render().el);
      return vel.attr('id', model.get('id'));
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

    ProductCategoryEditView.prototype.events = {
      'click .btn-save': 'save',
      'click .btn-delete': 'delete'
    };

    ProductCategoryEditView.prototype.render = function() {
      this.renderDefault();
      this.$el.attr('id', this.model.cid);
      return this;
    };

    ProductCategoryEditView.prototype.save = function() {
      this.model.set({
        code: this.$('.code-edit').val(),
        name: this.$('.name-edit').val()
      });
      return this.model.trigger('save', this);
    };

    ProductCategoryEditView.prototype["delete"] = function() {
      this.model.set({
        code: this.$('.code-edit').val(),
        name: this.$('.name-edit').val()
      });
      return this.model.trigger('delete', this);
    };

    return ProductCategoryEditView;

  })(app.BaseView);

  ProductCategoryRowView = (function(_super) {

    __extends(ProductCategoryRowView, _super);

    function ProductCategoryRowView() {
      ProductCategoryRowView.__super__.constructor.apply(this, arguments);
    }

    ProductCategoryRowView.prototype.tagName = 'tr';

    ProductCategoryRowView.prototype.template = app.BaseView.getTemplate('#tpl-category-row');

    ProductCategoryRowView.prototype.events = {
      'click .btn-edit': 'edit',
      'click .btn-delete': 'delete'
    };

    ProductCategoryRowView.prototype.render = function() {
      this.renderDefault();
      this.$el.attr('id', this.model.id);
      return this;
    };

    ProductCategoryRowView.prototype.edit = function() {
      return this.model.trigger('edit', this);
    };

    ProductCategoryRowView.prototype["delete"] = function() {
      return this.model.trigger('delete', this);
    };

    return ProductCategoryRowView;

  })(app.BaseView);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.ProductCategoryView = ProductCategoryView;

  this.app.CategorySearchView = CategorySearchView;

  this.app.CategoryResultView = CategoryResultView;

  this.app.ProductCategoryEditView = ProductCategoryEditView;

  this.app.ProductCategoryRowView = ProductCategoryRowView;

}).call(this);
