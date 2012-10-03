@app = window.app ? {}

class AdminRouter extends app.BaseRouter
	routes:
		'':'showCategories'
		'categories' : 'showCategories'
		'featurecats' : 'showFeatureCats'
		'features':'showFeatures'
	
	showCategories: ->
		@showLayout 'default'
		@currentView.close() if @currentView?
		@currentView = new app.ProductCategoryView
		
	showFeatureCats: ->
		@showLayout 'default'
		@currentView.close() if @currentView?
		@currentView = new app.FeatureCategoryView 
		
	showFeatures:->
		@showLayout 'vertical'
		@currentView.close() if @currentView?
		@currentView = new app.FeatureMainView
		
	showLayout: (prefix) ->
		$('div[id$=layout]').hide()
		$('div#' + prefix + '-layout').show()

@app.AdminRouter = AdminRouter

jQuery ->
	app.adminRouter = new app.AdminRouter()
	Backbone.history.start()