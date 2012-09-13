# Admin Collections

class ProductCategories extends app.BaseCollection
	model:app.ProductCategory
	url:'api/admin/categories/'
	
@app = window.app ? {}
@app.ProductCategories = ProductCategories;