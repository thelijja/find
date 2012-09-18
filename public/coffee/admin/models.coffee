#Admin Models

# ## Models related to product category 
class ProductCategorySearchModel extends app.BaseModel

class ProductCategory extends app.BaseModel
	urlRoot:'/api/admin/categories'
	default:
		code:""
		name:""

# ## Models related to feature category
class FeatureCategorySearchModel extends app.BaseModel

class FeatureCategory extends app.BaseModel
	urlRoot: 'api/admin/featurecats'
	default:
		code:""

@app = window.app ? {}
@app.ProductCategory = ProductCategory
@app.ProductCategorySearchModel = ProductCategorySearchModel
@app.FeatureCategory = FeatureCategory
@app.FeatureCategorySearchModel = FeatureCategorySearchModel