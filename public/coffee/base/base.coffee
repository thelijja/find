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
		
# All routers should be derived from this base class
class BaseRouter extends Backbone.Router
		
# Available them in global scropt..		
@app = window.app ? {}
@app.BaseModel = BaseModel
@app.BaseCollection = BaseCollection
@app.BaseView = BaseView
@app.BaseRouter = BaseRouter
