# Views

# # Begin Category Views
# ## Category Search View
class CategorySearchView extends Backbone.View
	el:'#search-area'
	
	initialize:->
		@$el.empty();	# Clear this area if it is already occupied by different view
		@$el.html($('#tpl-category-search').html())		
		@render()
		
	render:->
	

# ## Category Search Result View
class CategoryResultView extends Backbone.View
	el:'#result-area'
	
	initialize:->
		@$el.empty();	# Clear this area if it is already occupied by different view
		@$el.html($('#tpl-category-results').html())		
		@render()
		
	render:->
	

# ## Category Main View
class ProductCategoryView extends Backbone.View
	initialize:->
		@searchView = new app.CategorySearchView @model
		@resultView = new app.CategoryResultView @collection
		
	renader:->
# # End Category Views		


@app = window.app ? {}
@app.ProductCategoryView = ProductCategoryView
@app.CategorySearchView = CategorySearchView
@app.CategoryResultView = CategoryResultView