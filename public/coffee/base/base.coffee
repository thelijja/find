# Define base classes for models, collections, views etc..

class BaseModel extends Backbone.Model
	stringify:->
		JSON.stringify @
		
	log:->
		console.log(@stringify())
		
		
class BaseCollection extends Backbone.Collection
	stringify:->
		JSON.stringify @
		
	log:->
		console.log(@stringify())	
		
class BaseView extends Backbone.View

class BaseRouter extends Backbone.Router
		
# Available them in global scropt..		
@app = window.app ? {}
@app.BaseModel = BaseModel
@app.BaseCollection = BaseCollection
@app.BaseView = BaseView
@app.BaseRouter = BaseRouter
