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
      '': 'showCategories',
      'categories': 'showCategories',
      'featurecats': 'showFeatureCats',
      'features': 'showFeatures'
    };

    AdminRouter.prototype.showCategories = function() {
      if (this.currentView != null) this.currentView.close();
      return this.currentView = new app.ProductCategoryView;
    };

    AdminRouter.prototype.showFeatureCats = function() {
      if (this.currentView != null) this.currentView.close();
      return this.currentView = new app.FeatureCategoryView;
    };

    AdminRouter.prototype.showFeatures = function() {
      if (this.currentView != null) this.currentView.close();
      return this.currentView = new app.ProductFeatureView;
    };

    return AdminRouter;

  })(app.BaseRouter);

  this.app.AdminRouter = AdminRouter;

  jQuery(function() {
    app.adminRouter = new app.AdminRouter();
    return Backbone.history.start();
  });

}).call(this);
