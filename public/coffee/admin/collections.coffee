# Admin Collections

class ProductCategories extends Backbone.Collection
	model:app.ProductCategory
	url:'productcategories/categories'
	
@app = window.app ? {}
@app.ProductCategories = ProductCategories;