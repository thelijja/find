(function() {
  var AdminRouter, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.app = (_ref = window.app) != null ? _ref : {};

  AdminRouter = (function(_super) {

    __extends(AdminRouter, _super);

    function AdminRouter() {
      AdminRouter.__super__.constructor.apply(this, arguments);
    }

    AdminRouter.prototype.routes = {
      'categories': 'showCategories'
    };

    AdminRouter.prototype.showCategories = function() {
      var catView, categories, searchModel;
      searchModel = new app.ProductCategorySearchModel();
      categories = new app.ProductCategories();
      return catView = new app.ProductCategoryView({
        collection: categories,
        model: searchModel
      });
    };

    return AdminRouter;

  })(Backbone.Router);

  this.app.AdminRouter = AdminRouter;

  jQuery(function() {
    app.adminRouter = new app.AdminRouter();
    return Backbone.history.start();
  });

}).call(this);
