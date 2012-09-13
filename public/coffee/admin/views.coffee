# Views

# # Begin Category Views
# ## Category Search View
class CategorySearchView extends app.BaseView
	el:'#search-area'
	
	initialize:->
		@$el.empty();	# Clear this area if it is already occupied by different view
		@$el.html($('#tpl-category-search').html())		
		@render()
		
	render:->
	

# ## Category Search Result View
class CategoryResultView extends app.BaseView
	el:'#result-area'
	events:
		'click #btn-add' : 'createCategory'
	
	initialize:->
		@$el.empty();	# Clear this area if it is already occupied by different view
		@$el.html($('#tpl-category-results').html())		
		@render()
		
	render:->
		
	createCategory:->
		cat = new app.ProductCategory id:'', code:'', name: ''
		catEditView = new app.ProductCategoryEditView model:cat
		@$('tbody').prepend catEditView.render().el	

# ## Category Main View
class ProductCategoryView extends app.BaseView
	initialize:->
		@searchView = new app.CategorySearchView @model
		@resultView = new app.CategoryResultView @collection
		
	renader:->

# ## CategoryItemEditView
class ProductCategoryEditView extends app.BaseView
	tagName: 'tr'
	template: app.BaseView.getTemplate('#tpl-category-edit')
	render:->
		@renderDefault()
		
# # End Category Views		

@app = window.app ? {}
@app.ProductCategoryView = ProductCategoryView
@app.CategorySearchView = CategorySearchView
@app.CategoryResultView = CategoryResultView
@app.ProductCategoryEditView = ProductCategoryEditView