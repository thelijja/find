# Define base classes for models, collections, views etc..

# All models should be derived from this base class
class BaseModel extends Backbone.Model
	stringify:->								# return json representation of this model as a string
		JSON.stringify @
		
	log:->										# logs json representation to console
		console.log(@stringify())
		
# All colelctions should be derived from this base class		
class BaseCollection extends Backbone.Collection
	stringify:->								# return json representation of this model as a string
		JSON.stringify @
		
	log:->										# logs json representation to console					
		console.log(@stringify())	

# All views should be derived from this base class		
class BaseView extends Backbone.View
	@getTemplate:(selector)->					# static method to load the template body and create template
		tpl = $(selector)						# could be add logic to handle error and emit blank <div> if needed
		_.template(tpl.html())					# subview usage ->  template:app.BaseView.getTemplate('#tpl-id')
		
	renderDefault:->							# simple implementation of render using the template and model of its own
		@$el.html(_.template @template m: @model.toJSON())		
		@

	showError: (msg)->
		alert msg
		
	removeWithFade: ->
		that = @
		@$el.fadeOut 'fast', -> that.remove()
		
		
# Basic search criteria view
# Usage:
# This view will be placed in area inside tag with the id=#search-area, or else selector needs to be passed as el
# It assumes there are at least two buttons for search and clear with the classes .btn-search .btn-clear
# When instantiating template selecto needs to be passed in template parameter, this template wil be used to fill the
#    search criteria input panel
# Also model pass in should handle two events 'search' and 'reset' accordingly
# ex:
# class CategorySearchView extends app.SearchCriteriaView
#
# searchView = new CategorySearchView model: model, tpl_search:'#tpl_category_search' 
class SearchCriteriaView extends BaseView
	el:'#search-area'
	events:
		'click .btn-search': 'search'
		'click .btn-clear': 'clear'
		
	initialize:->		
		@$el.empty();									# Clear this area if it is already occupied by different view
		@$el.html($(@options.template).html())		
		@render()
		
	render:->
		
	search: (e)->
		e.preventDefault()								# To avoid normal post caused by link click
		@model.trigger 'search'
	
	clear: (e)->
		e.preventDefault()
		@model.trigger 'reset'
		
		
# Basic search result view with add edit delete options and this assume table to show the results.
# Usage:
#  el: '#result-area'
#  Add button should have id #btn-add
# When instantiating template selector needs to be passed in template parameter, this template wil be used to fill the
#    search criteria input panel
# Derived view should implement following method return appropriate views/models
#    createItemDisplayView(model) - This should return view representing display mode of each table row with model data
#    createItemEditView(model) - This should return view represending edit mode of each table row with model data.
#    createEmptyModel() - This should return appropriate model created.
class SearchResultTableView extends BaseView
	el:'#result-area'
	events:
		'click #btn-add' : 'create'
	
	initialize:->
		@collection.on 'reset', @render, @
		@$el.empty();									# Clear this area if it is already occupied by different view
		@$el.html($(@options.template).html())
		@render()
		
	render:->
		that = @
		$tbody = @$('tbody')
		$tbody.empty()
		@collection.each (item) ->
			item.on 'save', that.itemSave, that			# We need to be motified when item is done and saved..
			item.on 'delete', that.itemDelete, that
			item.on 'edit', that.itemEdit, that
			item.on 'cancel', that.cancelEdit, that
			displayView = that.createItemDisplayView(item) 
			$tbody.append displayView.render().el
		
	create:->
		item = @createEmptyModel()
		item.on 'save', @itemSave, @						# We need to be motified when item is done and saved..
		item.on 'delete', @itemDelete, @
		item.on 'edit', @itemEdit, @
		item.on 'cancel', @cancelEdit, @
		editView = @createItemEditView(item)
		@$('tbody').prepend editView.render().el
		
	itemSave:(view) ->
		that = @
		model = view.model								# Get the model who triggered the event
		model.save null,
			wait:true
			success: (rmodel, response) ->								
				vel = view.$el							# Get the element for current view for this item		
				# Create new row view with model
				rowView = that.createItemDisplayView(model)
				vel.replaceWith rowView.render().el		# Update the same row with new view
				vel.attr 'id', model.get('id')			# Also with id
			error: (rmodel, errors) ->
				that.showError('Error saving category item..') 
		
	itemDelete:(view) ->
		that = @
		model = view.model
		if model.isNew()								# Just remove the view no need to send server call
			view.remove()								# So don't do fade out animation, make it quick
		else
			model.destroy
				wait:true
				success: -> view.removeWithFade()
				error: (rmodel, errors) -> that.showError('Error in deleting item..');
		
	itemEdit:(view) ->		
		vel = view.$el
		model = view.model
		# Create new edit view with the model
		editView = @createItemEditView(model)
		vel.replaceWith editView.render().el		# Update the same row with new edit view
		vel.attr 'id', model.get('id')				# Also with id
		
	cancelEdit:(view) ->
		that = @
		vel = view.$el
		model = view.model							# Get the model who triggered the event
		if model.isNew()							# If user create new row and cancel just remove the view
			view.remove()							# So don't do fade out animation, make it quick
		else				
			rowView = that.createItemDisplayView(model)
			vel.replaceWith rowView.render().el		# Update the same row with new view			
		

	createItemDisplayView: (model)->				# This should be overriden by derived view to return correct item display view
		new BaseView model:model
		
	createItemEditView: (model)->					# This should be overriden by derived view to return correct item edit view
		new BaseView model:model
		
	createEmptyModel: ->							# This should be overriden by derived view to return new empty model
		new BaseModel
		
# Item Display view for table based search result view.
# Usage
#	Derived view should declare template: property	giving template to the table row for display mode
class TableItemDisplayView extends BaseView
	tagName: 'tr'
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
		
	renderChild: ->	
		
# Item Edit view for table based search result view.
# Usage
#	Derived view should declare template: property	giving template to the table row for edit mode
#   It should also implement readInputs() method to update model from UI inputs
class TableItemEditView extends BaseView
	tagName: 'tr'
	events:
		'click .btn-save':'save'
		'click .btn-cancel':'cancel'
		
	render:->
		@renderDefault()
		@$el.attr 'id',@model.cid				# we create id with model cid value
		@
		
	save:->
		# Update the model with values
		@readInputs()		
		@model.trigger 'save', @				# we'll trigger it is done with the view
	
	cancel:->
		@model.trigger 'cancel', @	
		
	readInputs:->
		
		
# All routers should be derived from this base class
class BaseRouter extends Backbone.Router
		
# Available them in global scropt..		
@app = window.app ? {}
@app.BaseModel = BaseModel
@app.BaseCollection = BaseCollection
@app.BaseView = BaseView
@app.SearchCriteriaView = SearchCriteriaView
@app.SearchResultTableView = SearchResultTableView
@app.TableItemDisplayView = TableItemDisplayView
@app.TableItemEditView = TableItemEditView
@app.BaseRouter = BaseRouter
