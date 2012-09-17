# Admin Collections

class ProductCategories extends app.BaseCollection
	model:app.ProductCategory
	url:'api/admin/categories'
	
	getAllExcept: (id) ->
		_.reject @models, (model) -> model.id == id
	
@app = window.app ? {}
@app.ProductCategories = ProductCategories;