#Admin Models

class ProductCategorySearchModel extends app.BaseModel

class ProductCategory extends app.BaseModel
	urlRoot:'/api/admin/categories'
	default:
		code:""
		name:""


@app = window.app ? {}
@app.ProductCategory = ProductCategory
@app.ProductCategorySearchModel = ProductCategorySearchModel