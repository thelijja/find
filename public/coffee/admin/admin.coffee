@app = window.app ? {}

class AdminRouter extends app.BaseRouter
	routes:
		'categories' : 'showCategories'
		'featurecats' : 'showFeatureCats'
	
	showCategories: ->
		@currentView.close() if @currentView?
		searchModel = new app.ProductCategorySearchModel()
		categories = new app.ProductCategories()		
		@currentView = new app.ProductCategoryView collection:categories, model:searchModel
		
					
	showFeatureCats: ->
		@currentView.close() if @currentView?
		searchModel = new app.FeatureCategorySearchModel
		categories = new app.FeatureCategories
		@currentView = new app.FeatureCategoryView collection:categories, model:searchModel

@app.AdminRouter = AdminRouter

jQuery ->
	app.adminRouter = new app.AdminRouter()
	Backbone.history.start()