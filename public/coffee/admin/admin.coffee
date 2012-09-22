@app = window.app ? {}

class AdminRouter extends app.BaseRouter
	routes:
		'':'showCategories'
		'categories' : 'showCategories'
		'featurecats' : 'showFeatureCats'
		'features':'showFeatures'
	
	showCategories: ->
		@currentView.close() if @currentView?
		@currentView = new app.ProductCategoryView
		
	showFeatureCats: ->
		@currentView.close() if @currentView?
		@currentView = new app.FeatureCategoryView 
		
	showFeatures:->
		@currentView.close() if @currentView?
		@currentView = new app.ProductFeatureView 

@app.AdminRouter = AdminRouter

jQuery ->
	app.adminRouter = new app.AdminRouter()
	Backbone.history.start()