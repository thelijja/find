# Views

# # Begin Category Views
# ## Category Search View ------------------------------------------------------------------------------------------------
class CategorySearchView extends app.SearchCriteriaView
	

# ## Category Search Result View ------------------------------------------------------------------------------------------
class CategoryResultView extends app.SearchResultTableView
	createItemDisplayView: (model) ->
		new ProductCategoryRowView model:model
	
	createItemEditView: (model) ->
		new ProductCategoryEditView model:model
		
	createEmptyModel: ->
		new app.ProductCategory code:'', name:''
		
	

# ## Category Main View ------------------------------------------------------------------------------------------------
class ProductCategoryView extends app.BaseView
	initialize:->
		@model.on 'search', @search, @				# When search model trigger 'searh' we need to search and set the collection
		@model.on 'reset', @reset, @				# WHen search model trigger 'reset', collection will be emptied.
		@searchView = new app.CategorySearchView model: @model, template:'#tpl-category-search'
		@resultView = new app.CategoryResultView collection: @collection, template:'#tpl-category-results'
		
	renader:->
	
	search:->
		# TODO: Write search logic...
		@collection.fetch()
		
	reset:->
		@collection.reset []
		

# ## CategoryItem edit view --------------------------------------------------------------------------------------------
class ProductCategoryEditView extends app.TableItemEditView
	template: app.BaseView.getTemplate('#tpl-category-edit')
		
	readInputs:->
		@model.set code:@$('.code-edit').val(), name:@$('.name-edit').val()				
		
		
# ## Category Item row view ---------------------------------------------------------------------------------------------
class ProductCategoryRowView extends app.TableItemDisplayView
	template: app.BaseView.getTemplate('#tpl-category-row')

		
# # End Category Views		

@app = window.app ? {}
@app.ProductCategoryView = ProductCategoryView
@app.CategorySearchView = CategorySearchView
@app.CategoryResultView = CategoryResultView
@app.ProductCategoryEditView = ProductCategoryEditView
@app.ProductCategoryRowView = ProductCategoryRowView