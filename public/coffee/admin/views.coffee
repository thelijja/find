# Views
# ========================================================================================================================
# # Begin CATEGORY Views
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
		@model = new app.ProductCategorySearchModel()
		@collection = new app.ProductCategories()
		@collection.fetch()
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
		
	close:->
		@searchView.close() if @searchView?
		@resultView.close() if @resultView?
		

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




# ========================================================================================================================
# # Begin FEATURE CATEGORY Views

# ## Feature Category Search View ------------------------------------------------------------------------------------------------
class FeatureCategorySearchView extends app.SearchCriteriaView


# ## Feature Category Result View ------------------------------------------------------------------------------------------
class FeatureCategoryResultView extends app.SearchResultTableView
	createItemDisplayView: (model) ->
		new FeatureCategoryRowView model:model
	
	createItemEditView: (model) ->
		new FeatureCategoryEditView model:model
		
	createEmptyModel: ->
		new app.FeatureCategory code:'', name:''
		

# ## Feature Category Main View ------------------------------------------------------------------------------------------------
class FeatureCategoryView extends app.BaseView
	initialize:->
		@model = new app.FeatureCategorySearchModel
		@collection = new app.FeatureCategories
		@model.on 'search', @search, @				# When search model trigger 'searh' we need to search and set the collection
		@model.on 'reset', @reset, @				# WHen search model trigger 'reset', collection will be emptied.
		@searchView = new app.FeatureCategorySearchView model: @model, template:'#tpl-featurecat-search'
		@resultView = new app.FeatureCategoryResultView collection: @collection, template:'#tpl-featurecat-results'
		
	renader:->
	
	search:->
		# TODO: Write search logic...
		@collection.fetch()
		
	reset:->
		@collection.reset []		

	close:->
		@searchView.close() if @searchView?
		@resultView.close() if @resultView?


# ## Feature CategoryItem edit view --------------------------------------------------------------------------------------------
class FeatureCategoryEditView extends app.TableItemEditView
	template: app.BaseView.getTemplate('#tpl-featurecat-edit')
		
	readInputs:->
		@model.set code:@$('.code-edit').val(), name:@$('.name-edit').val()
	

# ## Feature Category Item row view ---------------------------------------------------------------------------------------------
class FeatureCategoryRowView extends app.TableItemDisplayView
	template: app.BaseView.getTemplate('#tpl-featurecat-row')			

# # End Feature Category Views


# ========================================================================================================================
# # Begin FEATURE Views

# ## Feature Search View
class ProductFeatureSearchView extends app.SearchCriteriaView

# ## Feature Result View
class ProductFeatureResultView extends app.SearchResultTableView
	createItemDisplayView: (model) ->
		new ProductFeatureRowView model:model, productcats:@categories, featurecats:@featurecats, datatypes:@datatypes
	
	createItemEditView: (model) ->
		new ProductFeatureEditView model:model, productcats:@categories, featurecats:@featurecats, datatypes:@datatypes
		
	createEmptyModel: ->
		new app.ProductFeature name:'', importance:0
  
	initialize: ->
		super
		@categories = new app.LookupEntries null, url:app.lookupApiUrl.get('category')
		@featurecats = new app.LookupEntries null, url:app.lookupApiUrl.get('featurecat')
		@datatypes = new app.LookupEntries null, url:app.lookupApiUrl.get('datatype')
		@categories.fetch()
		@featurecats.fetch()
		@datatypes.fetch()
		
  
# ## Feature Main View
class ProductFeatureView extends app.BaseView
	initialize:->
		@model = new app.FeatureSearchModel
		@collection = new app.ProductFeatures		
		@model.on 'search', @search, @				# When search model trigger 'searh' we need to search and set the collection
		@model.on 'reset', @reset, @				# WHen search model trigger 'reset', collection will be emptied.
		@searchView = new app.ProductFeatureSearchView model: @model, template:'#tpl-feature-search'
		@resultView = new app.ProductFeatureResultView collection: @collection, template:'#tpl-feature-results'
		
	renader:->
	
	search:->
		# TODO: Write search logic...
		@collection.fetch()
		
	reset:->
		@collection.reset []		

	close:->
		@searchView.close() if @searchView?
		@resultView.close() if @resultView?	
  

# ## Feature Item edit view
class ProductFeatureEditView extends app.TableItemEditView
	tagName:'div'
	template: app.BaseView.getTemplate('#tpl-feature-edit')
	isModalEditView:->								# This is modal edit view, will do the rendering ourself
		true
		
	render:->
		@$el.empty()
		@$el.html @template( m: @model.toJSON() )
		$('#modal-temp-placeholder').html(@el)
		(new app.LookupDropDownView el:'#feature-prodcategory', collection: @options.productcats).render()
		(new app.LookupDropDownView el:'#feature-category', collection: @options.featurecats).render()
		(new app.LookupDropDownView el:'#feature-datatype', collection: @options.datatypes).render()
		@$("#feature-prodcategory option[value='" + @model.get('product_category_id') + "']").attr('selected', "selected") if @model.has('product_category_id')
		@$("#feature-category option[value='" + @model.get('feature_category_id') + "']").attr('selected', "selected") if @model.has('feature_category_id')
		@$("#feature-datatype option[value='" + @model.get('data_type') + "']").attr('selected', "selected") if @model.has('data_type')
		@$('#modal-feature-edit').modal()
		@

	hideModal:->
		@$('#modal-feature-edit').modal('hide')

	readInputs:->
		@model.set
			name:@$('#feature-name').val(),
			data_type:@$('#feature-datatype').val(),
			importance:@$('#feature-importance').val(),
			description:@$('#feature-desc').val(),
			product_category_id:@$('#feature-prodcategory').val()
			feature_category_id:@$('#feature-category').val()
		
		
# ## Feature Item row view
class ProductFeatureRowView extends app.TableItemDisplayView
	template: app.BaseView.getTemplate('#tpl-feature-row')
	initialize:->
		dt = @options.datatypes.get(@model.get('data_type')) if @model.get('data_type')?		
		@model.set dataTypeDesc: dt.get('name') if dt?		
		fc = @options.featurecats.get(@model.get('feature_category_id')) if @model.get('feature_category_id')?
		@model.set featureCategory: fc.get('name') if fc?
		pc = @options.productcats.get(@model.get('product_category_id')) if @model.get('product_category_id')?		
		@model.set productCategory: pc.get('name') if pc?


# ========================================================================================================================
# # Begin PRODUCT FEATURE Views
class ProductCategoryNodeView extends app.BaseView
	tagName:'li'
	render: ->
		if @model.has('children') and @model.get('children').length > 0
			inputEl = @make("input", {"type":"checkbox", "id":@model.id})
			labelEl = @make("label", {"for":@model.id, "class":"parent"}, @model.get('name'))
			btnEl = @make("button", {"class":"btn btn-mini btn-info"}, @make("i", {"class":"icon-th-list icon-white"}))			
			@$el.append inputEl
			@$el.append labelEl
			@$el.append btnEl
			children = new app.ProductCategoryTree @model.get('children')
			@$el.append (new app.ProductCategoryTreeView collection:children).render().el 
		else
			#aEl = @make("a", {"href":'#'+@model.id}, @model.get('name'))
			aEl = @make("label", {"for":@model.id}, @model.get('name'))
			@$el.append aEl
		@
			

# ## Product Category Tree View
class ProductCategoryTreeView extends app.BaseView
	tagName:'ul'
				
	render: ->
		thatEl = @$el
		@collection.each (item) ->
			thatEl.append (new app.ProductCategoryNodeView model:item).render().el
		@

# ## Product Category Tree Area		
class ProductCategoryAreaView extends app.BaseView
	el:'div.left-area'
	events:
		'click label': 'categorySelected'
	initialize: ->
		@collection.on 'reset', @render, @	
				
	render: ->
		@$el.empty()
		treeBody = (new app.ProductCategoryTreeView collection:@collection).render().el
		@$el.append @make("div", {"class":"css-treeview"}, treeBody)	
		
	categorySelected: (e) ->
		console.log e

class ProductFeaturesView extends app.SearchResultTableView

# ## Product Feature Main View
class FeatureMainView extends app.BaseView
	initialize: ->
		@productCategories = new app.ProductCategoryTree
		@productCategoryView = new app.ProductCategoryAreaView collection:@productCategories
		@productCategories.fetch()







# ========================================================================================================================
@app = window.app ? {}
@app.ProductCategoryView = ProductCategoryView
@app.CategorySearchView = CategorySearchView
@app.CategoryResultView = CategoryResultView
@app.ProductCategoryEditView = ProductCategoryEditView
@app.ProductCategoryRowView = ProductCategoryRowView

@app.FeatureCategoryView = FeatureCategoryView
@app.FeatureCategorySearchView = FeatureCategorySearchView
@app.FeatureCategoryResultView = FeatureCategoryResultView
@app.FeatureCategoryEditView = FeatureCategoryEditView
@app.FeatureCategoryRowView = FeatureCategoryRowView

@app.ProductFeatureView = ProductFeatureView
@app.ProductFeatureSearchView = ProductFeatureSearchView
@app.ProductFeatureResultView = ProductFeatureResultView
@app.ProductFeatureEditView = ProductFeatureEditView
@app.ProductCategoryRowView = ProductCategoryRowView

@app.FeatureMainView = FeatureMainView
@app.ProductCategoryAreaView = ProductCategoryAreaView
@app.ProductCategoryTreeView = ProductCategoryTreeView
@app.ProductCategoryNodeView = ProductCategoryNodeView