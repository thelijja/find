@app = window.app ? {}

class AdminRouter extends app.BaseRouter
	routes:
		'categories' : 'showCategories'
	
	showCategories: ->
		searchModel = new app.ProductCategorySearchModel()
		categories = new app.ProductCategories()		
		catView = new app.ProductCategoryView collection:categories, model:searchModel
					

@app.AdminRouter = AdminRouter

jQuery ->
	app.adminRouter = new app.AdminRouter()
	Backbone.history.start()