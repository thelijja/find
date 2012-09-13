# Views

# # Begin Category Views
# ## Category Search View ------------------------------------------------------------------------------------------------
class CategorySearchView extends app.BaseView
	el:'#search-area'
	events:
		'click .btn-search': 'search'
		'click .btn-clear': 'clear'
		
	initialize:->		
		@$el.empty();									# Clear this area if it is already occupied by different view
		@$el.html($('#tpl-category-search').html())		
		@render()
		
	render:->
		
	search:->
		@model.trigger 'search'
	
	clear:->
		@model.trigger 'reset'
	

# ## Category Search Result View ------------------------------------------------------------------------------------------
class CategoryResultView extends app.BaseView
	el:'#result-area'
	events:
		'click #btn-add' : 'createCategory'
	
	initialize:->
		@collection.on 'reset', @render, @
		@$el.empty();									# Clear this area if it is already occupied by different view
		@$el.html($('#tpl-category-results').html())		
		@render()
		
	render:->
		that = @
		$tbody = @$('tbody')
		$tbody.empty()
		@collection.each (item) ->
			item.on 'save', that.itemSave, that			# We need to be motified when item is done and saved..
			item.on 'delete', that.itemDelete, that
			item.on 'edit', that.itemEdit, that
			rowView = new app.ProductCategoryRowView model:item
			$tbody.append rowView.render().el
		
	createCategory:->
		cat = new app.ProductCategory code:'', name: ''
		cat.on 'save', @itemSave, @						# We need to be motified when item is done and saved..
		cat.on 'delete', @itemDelete, @
		cat.on 'edit', @itemEdit, @
		catEditView = new app.ProductCategoryEditView model:cat
		@$('tbody').prepend catEditView.render().el
		
	itemSave:(view) ->
		that = @
		model = view.model								# Get the model who triggered the event
		model.save null,
			wait:true
			success: (rmodel, response) ->								
				# TODO:Save item in the sever.........
				vel = view.$el							# Get the element for current view for this item		
				# Create new row view with model
				rowView = new app.ProductCategoryRowView model:model
				vel.replaceWith rowView.render().el		# Update the same row with new view
				vel.attr 'id', model.get('id')			# Also with id
			error: (rmodel, errors) ->
				that.showError('Error saving category item..') 

		#view.remove()
		
	itemDelete:(view) ->
		# Delete item from the server......
		that = @
		model = view.model
		if not model.id
			view.removeWithFade()					# Just remove the view no need to send server call
		else
			model.destroy
				wait:true
				success: -> view.removeWithFade()
				error: (rmodel, errors) -> that.showError('Error in deleting item..');
		
	itemEdit:(view) ->
		# TODO:Update item to the server......
		vel = view.$el
		model = view.model
		# Create new edit view with the model
		editView = new app.ProductCategoryEditView model:model
		vel.replaceWith editView.render().el		# Update the same row with new edit view
		vel.attr 'id', model.get('id')				# Also with id
		
		

# ## Category Main View ------------------------------------------------------------------------------------------------
class ProductCategoryView extends app.BaseView
	initialize:->
		@model.on 'search', @search, @				# When search model trigger 'searh we need to search and set the collection
		@model.on 'reset', @reset, @				# WHen search model trihher reset collection will be emptied.
		@searchView = new app.CategorySearchView model: @model
		@resultView = new app.CategoryResultView collection: @collection
		
	renader:->
	
	search:->
		# TODO: Write search logic...
		@collection.fetch()
		
	reset:->
		@collection.reset []
		

# ## CategoryItem edit view --------------------------------------------------------------------------------------------
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
		
		
# ## Category Item row view ---------------------------------------------------------------------------------------------
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