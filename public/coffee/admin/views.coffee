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
		cat.on 'save', @itemSave, @			# We need to be motified when item is done and saved..
		cat.on 'delete', @itemDelete, @
		cat.on 'edit', @itemEdit, @
		catEditView = new app.ProductCategoryEditView model:cat
		@$('tbody').prepend catEditView.render().el
		
	itemSave:(view) ->
		# Item is already saved
		vel = view.$el							# Get the element for current view for this item
		model = view.model						# Get the model who triggered the event
		# Create new row view with model
		rowView = new app.ProductCategoryRowView model:model
		vel.replaceWith rowView.render().el		# Update the same row with new view
		vel.attr 'id', model.get('id')			# Also with id
		#view.remove()
		
	itemDelete:(view) ->
		view.remove()
		
	itemEdit:(view) ->
		vel = view.$el
		model = view.model
		# Create new edit view with the model
		editView = new app.ProductCategoryEditView model:model
		vel.replaceWith editView.render().el		# Update the same row with new edit view
		vel.attr 'id', model.get('id')			# Also with id
		
		

# ## Category Main View
class ProductCategoryView extends app.BaseView
	initialize:->
		@searchView = new app.CategorySearchView @model
		@resultView = new app.CategoryResultView @collection
		
	renader:->

# ## CategoryItem edit view
class ProductCategoryEditView extends app.BaseView
	tagName: 'tr'
	template: app.BaseView.getTemplate('#tpl-category-edit')
	events:
		'click .btn-save':'save'
		'click .btn-delete':'delete'
		
	render:->
		@renderDefault()
		@$el.attr 'id',@model.cid				# we create id with model cid value
		@
		
	save:->
		# Update the model with values
		@model.set code:@$('.code-edit').val(), name:@$('.name-edit').val()
		@model.trigger 'save', @				# we'll trigger it is done with the view
	
	delete:->
		# Update the model with values
		@model.set code:@$('.code-edit').val(), name:@$('.name-edit').val()				
		@model.trigger 'delete', @
		
# ## Category Item row view
class ProductCategoryRowView extends app.BaseView
	tagName: 'tr'
	template: app.BaseView.getTemplate('#tpl-category-row')
	events:
		'click .btn-edit':'edit'
		'click .btn-delete':'delete'
		
	render:->
		@renderDefault()
		@$el.attr 'id', @model.id				# Since ths has a id we used it instead of cid
		@
	
	edit:->
		@model.trigger 'edit', @
		
	delete:->
		@model.trigger 'delete', @
		
# # End Category Views		

@app = window.app ? {}
@app.ProductCategoryView = ProductCategoryView
@app.CategorySearchView = CategorySearchView
@app.CategoryResultView = CategoryResultView
@app.ProductCategoryEditView = ProductCategoryEditView
@app.ProductCategoryRowView = ProductCategoryRowView