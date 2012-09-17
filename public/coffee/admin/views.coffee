# Views

# # Begin Category Views
# ## Category Search View ------------------------------------------------------------------------------------------------
class CategorySearchView extends app.SearchCriteriaView
	

# ## Category Search Result View ------------------------------------------------------------------------------------------
class CategoryResultView extends app.SearchResultTableView
	createItemDisplayView: (model) ->
		model.set('parentCode','')
		model.set('parentCode', @collection.get(model.get('parent_id')).get('code')) if not _.isUndefined(model.get('parent_id')) and model.get('parent_id') > 0 
		new ProductCategoryRowView model:model, categories: @collection
	
	createItemEditView: (model) ->
		new ProductCategoryEditView model:model, categories: @collection
		
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
		@model.set code:@$('.code-edit').val(), name:@$('.name-edit').val(), parent_id:@$('#parentId').val()
	
	render: ->
		super										# Call super render first and then do some additional stuff
		otherCats = @options.categories.getAllExcept(@model.id)
		@$('#parentId').append('<option value="' + cat.id + '">' + cat.get('code') + '</option>') for cat in otherCats					
		@$("#parentId option[value='" + @model.get('parent_id') + "']").attr('selected', "selected") if @model.has('parent_id')
		@
						
		
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