# Admin Collections

class ProductCategories extends Backbone.Collection
	model:app.ProductCategory
	url:'api/admin/categories/'
	
@app = window.app ? {}
@app.ProductCategories = ProductCategories;