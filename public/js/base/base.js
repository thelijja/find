(function() {
  var BaseCollection, BaseModel, BaseRouter, BaseView, LookupApiUrl, LookupDropDownView, LookupEntries, LookupEntry, SearchCriteriaView, SearchResultTableView, TableItemDisplayView, TableItemEditView, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseModel = (function(_super) {

    __extends(BaseModel, _super);

    function BaseModel() {
      BaseModel.__super__.constructor.apply(this, arguments);
    }

    BaseModel.prototype.stringify = function() {
      return JSON.stringify(this);
    };

    BaseModel.prototype.log = function() {
      return console.log(this.stringify());
    };

    return BaseModel;

  })(Backbone.Model);

  BaseCollection = (function(_super) {

    __extends(BaseCollection, _super);

    function BaseCollection() {
      BaseCollection.__super__.constructor.apply(this, arguments);
    }

    BaseCollection.prototype.stringify = function() {
      return JSON.stringify(this);
    };

    BaseCollection.prototype.log = function() {
      return console.log(this.stringify());
    };

    return BaseCollection;

  })(Backbone.Collection);

  BaseView = (function(_super) {

    __extends(BaseView, _super);

    function BaseView() {
      BaseView.__super__.constructor.apply(this, arguments);
    }

    BaseView.getTemplate = function(selector) {
      var tpl;
      tpl = $(selector);
      return _.template(tpl.html());
    };

    BaseView.prototype.renderDefault = function() {
      this.$el.html(this.template({
        m: this.model.toJSON()
      }));
      return this;
    };

    BaseView.prototype.showError = function(msg) {
      return alert(msg);
    };

    BaseView.prototype.removeWithFade = function() {
      var that;
      that = this;
      return this.$el.fadeOut('fast', function() {
        return that.remove();
      });
    };

    BaseView.prototype.close = function() {
      this.undelegateEvents();
      return this.$el.empty();
    };

    return BaseView;

  })(Backbone.View);

  LookupEntry = (function(_super) {

    __extends(LookupEntry, _super);

    function LookupEntry() {
      LookupEntry.__super__.constructor.apply(this, arguments);
    }

    return LookupEntry;

  })(BaseModel);

  LookupEntries = (function(_super) {

    __extends(LookupEntries, _super);

    function LookupEntries() {
      LookupEntries.__super__.constructor.apply(this, arguments);
    }

    LookupEntries.prototype.model = LookupEntry;

    LookupEntries.prototype.url = '';

    LookupEntries.prototype.initialize = function(model, args) {
      return this.url = args.url;
    };

    return LookupEntries;

  })(BaseCollection);

  LookupApiUrl = (function(_super) {

    __extends(LookupApiUrl, _super);

    function LookupApiUrl() {
      LookupApiUrl.__super__.constructor.apply(this, arguments);
    }

    LookupApiUrl.prototype.defaults = {
      category: '/api/lookup/category',
      featurecat: '/api/lookup/featurecat',
      datatype: '/api/lookup/datatype'
    };

    return LookupApiUrl;

  })(BaseModel);

  SearchCriteriaView = (function(_super) {

    __extends(SearchCriteriaView, _super);

    function SearchCriteriaView() {
      SearchCriteriaView.__super__.constructor.apply(this, arguments);
    }

    SearchCriteriaView.prototype.el = '#search-area';

    SearchCriteriaView.prototype.events = {
      'click .btn-search': 'search',
      'click .btn-clear': 'clear'
    };

    SearchCriteriaView.prototype.initialize = function() {
      this.$el.empty();
      this.$el.html($(this.options.template).html());
      return this.render();
    };

    SearchCriteriaView.prototype.render = function() {};

    SearchCriteriaView.prototype.search = function(e) {
      e.preventDefault();
      return this.model.trigger('search');
    };

    SearchCriteriaView.prototype.clear = function(e) {
      e.preventDefault();
      return this.model.trigger('reset');
    };

    return SearchCriteriaView;

  })(BaseView);

  SearchResultTableView = (function(_super) {

    __extends(SearchResultTableView, _super);

    function SearchResultTableView() {
      SearchResultTableView.__super__.constructor.apply(this, arguments);
    }

    SearchResultTableView.prototype.el = '#result-area';

    SearchResultTableView.prototype.events = {
      'click #btn-add': 'create'
    };

    SearchResultTableView.prototype.initialize = function() {
      this.collection.on('reset', this.render, this);
      this.$el.empty();
      this.$el.html($(this.options.template).html());
      return this.render();
    };

    SearchResultTableView.prototype.render = function() {
      var $tbody, that;
      that = this;
      $tbody = this.$('tbody');
      $tbody.empty();
      return this.collection.each(function(item) {
        var displayView;
        item.on('save', that.itemSave, that);
        item.on('delete', that.itemDelete, that);
        item.on('edit', that.itemEdit, that);
        item.on('cancel', that.cancelEdit, that);
        displayView = that.createItemDisplayView(item);
        return $tbody.append(displayView.render().el);
      });
    };

    SearchResultTableView.prototype.create = function() {
      var editView, item;
      item = this.createEmptyModel();
      item.on('save', this.itemSave, this);
      item.on('delete', this.itemDelete, this);
      item.on('edit', this.itemEdit, this);
      item.on('cancel', this.cancelEdit, this);
      editView = this.createItemEditView(item);
      if (editView.isModalEditView()) {
        return editView.render();
      } else {
        return this.$('tbody').prepend(editView.render().el);
      }
    };

    SearchResultTableView.prototype.itemSave = function(view) {
      var model, newModel, that;
      that = this;
      model = view.model;
      newModel = model.isNew();
      return model.save(null, {
        wait: true,
        success: function(rmodel, response) {
          var rowView, vel;
          rowView = that.createItemDisplayView(model);
          if (view.isModalEditView()) {
            if (newModel) {
              this.$('tbody').prepend(rowView.render().el);
            } else {
              this.$('#' + model.id).replaceWith(rowView.render().el);
            }
            return view.hideModal();
          } else {
            vel = view.$el;
            vel.replaceWith(rowView.render().el);
            return vel.attr('id', model.id);
          }
        },
        error: function(rmodel, errors) {
          return that.showError(errors);
        }
      });
    };

    SearchResultTableView.prototype.itemDelete = function(view) {
      var model, that;
      that = this;
      model = view.model;
      if (model.isNew()) {
        return view.remove();
      } else {
        return model.destroy({
          wait: true,
          success: function() {
            return view.removeWithFade();
          },
          error: function(rmodel, errors) {
            return that.showError('Error in deleting item..');
          }
        });
      }
    };

    SearchResultTableView.prototype.itemEdit = function(view) {
      var editView, model, vel;
      vel = view.$el;
      model = view.model;
      editView = this.createItemEditView(model);
      if (editView.isModalEditView()) {
        return editView.render();
      } else {
        vel.replaceWith(editView.render().el);
        return vel.attr('id', model.id);
      }
    };

    SearchResultTableView.prototype.cancelEdit = function(view) {
      var model, rowView, that, vel;
      that = this;
      vel = view.$el;
      model = view.model;
      if (model.isNew()) {
        return view.remove();
      } else {
        if (!view.isModalEditView()) {
          rowView = that.createItemDisplayView(model);
          return vel.replaceWith(rowView.render().el);
        }
      }
    };

    SearchResultTableView.prototype.createItemDisplayView = function(model) {
      return new BaseView({
        model: model
      });
    };

    SearchResultTableView.prototype.createItemEditView = function(model) {
      return new BaseView({
        model: model
      });
    };

    SearchResultTableView.prototype.createEmptyModel = function() {
      return new BaseModel;
    };

    return SearchResultTableView;

  })(BaseView);

  TableItemDisplayView = (function(_super) {

    __extends(TableItemDisplayView, _super);

    function TableItemDisplayView() {
      TableItemDisplayView.__super__.constructor.apply(this, arguments);
    }

    TableItemDisplayView.prototype.tagName = 'tr';

    TableItemDisplayView.prototype.events = {
      'click .btn-edit': 'edit',
      'click .btn-delete': 'delete'
    };

    TableItemDisplayView.prototype.render = function() {
      this.renderDefault();
      this.$el.attr('id', this.model.id);
      return this;
    };

    TableItemDisplayView.prototype.edit = function() {
      return this.model.trigger('edit', this);
    };

    TableItemDisplayView.prototype["delete"] = function() {
      return this.model.trigger('delete', this);
    };

    TableItemDisplayView.prototype.renderChild = function() {};

    return TableItemDisplayView;

  })(BaseView);

  TableItemEditView = (function(_super) {

    __extends(TableItemEditView, _super);

    function TableItemEditView() {
      TableItemEditView.__super__.constructor.apply(this, arguments);
    }

    TableItemEditView.prototype.tagName = 'tr';

    TableItemEditView.prototype.events = {
      'click .btn-save': 'save',
      'click .btn-cancel': 'cancel'
    };

    TableItemEditView.prototype.render = function() {
      this.renderDefault();
      this.$el.attr('id', this.model.cid);
      return this;
    };

    TableItemEditView.prototype.save = function() {
      this.readInputs();
      return this.model.trigger('save', this);
    };

    TableItemEditView.prototype.cancel = function() {
      return this.model.trigger('cancel', this);
    };

    TableItemEditView.prototype.readInputs = function() {};

    TableItemEditView.prototype.isModalEditView = function() {
      return false;
    };

    return TableItemEditView;

  })(BaseView);

  LookupDropDownView = (function(_super) {

    __extends(LookupDropDownView, _super);

    function LookupDropDownView() {
      LookupDropDownView.__super__.constructor.apply(this, arguments);
    }

    LookupDropDownView.prototype.render = function() {
      var thisEl;
      thisEl = this.$el;
      this.collection.each(function(item) {
        return thisEl.append('<option value="' + item.id + '">' + item.get('name') + '</option>');
      });
      return this;
    };

    return LookupDropDownView;

  })(BaseView);

  BaseRouter = (function(_super) {

    __extends(BaseRouter, _super);

    function BaseRouter() {
      BaseRouter.__super__.constructor.apply(this, arguments);
    }

    return BaseRouter;

  })(Backbone.Router);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.BaseModel = BaseModel;

  this.app.BaseCollection = BaseCollection;

  this.app.BaseView = BaseView;

  this.app.LookupEntry = LookupEntry;

  this.app.LookupEntries = LookupEntries;

  this.app.SearchCriteriaView = SearchCriteriaView;

  this.app.SearchResultTableView = SearchResultTableView;

  this.app.TableItemDisplayView = TableItemDisplayView;

  this.app.TableItemEditView = TableItemEditView;

  this.app.LookupDropDownView = LookupDropDownView;

  this.app.BaseRouter = BaseRouter;

  this.app.lookupApiUrl = new LookupApiUrl;

}).call(this);
