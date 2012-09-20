# Admin Collections

# ## Collections related to product category
class ProductCategories extends app.BaseCollection
	model:app.ProductCategory
	url:'api/admin/categories'
	
	getAllExcept: (id) ->
		_.reject @models, (model) -> model.id == id

# ## Collections related to feature category
class FeatureCategories extends app.BaseCollection
	model:app.FeatureCategory
	url:'api/admin/featurecats'
	
	
# ## Collections related to product feature
class ProductFeatures extends app.BaseCollection
	model:app.ProductFeature
	url:'api/admin/features'	


@app = window.app ? {}
@app.ProductCategories = ProductCategories
@app.FeatureCategories = FeatureCategories
@app.ProductFeatures = ProductFeatures