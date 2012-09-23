#Admin Models

# ## Models related to product category 
class ProductCategorySearchModel extends app.BaseModel

class ProductCategory extends app.BaseModel
	urlRoot:'/api/admin/categories'
	defaults:
		code:""
		name:""

# ## Models related to feature category
class FeatureCategorySearchModel extends app.BaseModel

class FeatureCategory extends app.BaseModel
	urlRoot: 'api/admin/featurecats'
	defaults:
		code:""
		name:""

# ## Models related to product features
class FeatureSearchModel extends app.BaseModel

class ProductFeature extends app.BaseModel
	urlRoot:'api/admin/features'
	

@app = window.app ? {}
@app.ProductCategory = ProductCategory
@app.ProductCategorySearchModel = ProductCategorySearchModel
@app.FeatureCategory = FeatureCategory
@app.FeatureCategorySearchModel = FeatureCategorySearchModel
@app.FeatureSearchModel = FeatureSearchModel
@app.ProductFeature = ProductFeature