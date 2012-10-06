	<script type="text/template" id="tpl-feature-search">
		<form class="form-inline">
			<input type="text" class="input-medium" placeholder="Category code">
			<button type="submit" class="btn btn-primary btn-search">Search</button>
			<button type="cancel" class="btn btn-clear">Clear</button>
		</form>
	</script>	
	
	<script type="text/template" id="tpl-feature-results">
		<div class="row-fluid">
			<h3>Product Category</h3>
		</div>
		<div class="row-fluid">
		<table class="table table-bordered table-striped table-hover table-condensed">
			<thead>
				<tr>
					<th class="id-col span1">#</th>
					<th class="span3">Name</th>
					<th class="span1">Data type</th>
					<th class="span1">Importance</th>
					<th class="span2">Feature Category</th>
					<th>Description</th>
					<th class="tc-tool"><div class="pull-right"><a id='btn-add' class="btn btn-primary" rel="tooltip" title="Add new"><i class="icon-plus icon-white"></i></a></div></th>
				<tr>
			<thead>
			<tbody></tbody>
		</table>
		</div>
		<div id="modal-temp-placeholder"></div>		<!-- Place holder to store modal views -->
	</script>
		
	<script type="text/template" id="tpl-feature-edit">
		<div class="modal hide fade" id="modal-feature-edit" role="dialog" aria-hidden="true">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
				<h3><% m.name && m.name.length > 0 ? print(m.name) : print('New Product Feature') %></h3>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="feature-name">Name</label>
						<div class="controls">
							<input type="text" id="feature-name" placeholder="Name" value="<%= m.name %>">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="feature-datatype">Data type</label>
						<div class="controls">
							<select id="feature-datatype">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="feature-importance">Importance</label>
						<div class="controls">
							<input type="text" class="input-small" id="feature-importance" value="<%= m.importance %>">
						</div>
					</div>
					<!--
					<div class="control-group">
						<label class="control-label" for="feature-prodcategory">Product Category</label>
						<div class="controls">
							<select id="feature-prodcategory">
							</select>
						</div>
					</div>
					-->
					<div class="control-group">
						<label class="control-label" for="feature-category">Product Category</label>
						<div class="controls">
							<select id="feature-category">
							</select>
						</div>
					</div>
					
					<div class="control-group">
						<label class="control-label" for="feature-desc">Description</label>
						<div class="controls">
							<textarea  id="feature-desc" rows="5" ><% _.isUndefined(m.description)? print(''): print(m.description) %></textarea>
						</div>
					</div>											
				</form>
			</div>
			<div class="modal-footer">
				<a class="btn btn-success btn-save" rel="tooltip" title="Save"><i class="icon-hdd icon-white"/></a>
				<a class="btn btn-warning btn-cancel" data-dismiss="modal" aria-hidden="true" rel="tooltip" title="Cancel without saving"><i class="icon-remove icon-white"/></a>				
			</div>
		</div>	
	</script>
	
	<script type="text/template" id="tpl-feature-row">
		<td class="id-col span1"><%= m.id %></td>
		<td class="span3"><%= m.name %></td>
		<td class="span1"><%= m.dataTypeDesc %></td>
		<td class="span1"><%= m.importance %></td>
		<td class="span2"><% _.isUndefined(m.featureCategory)? print(''): print(m.featureCategory) %></td>
		<td ><% _.isUndefined(m.description) || m.description == null? print(''): print( m.description.substring(0,10) + '...' ) %></td>
		<td class="tc-tool">
			<div class="pull-right">
			<a class="btn btn-primary btn-edit" rel="tooltip" title="Edit"><i class="icon-edit icon-white"/></a>
			<a class="btn btn-danger btn-delete" rel="tooltip" title="Delete permanently"><i class="icon-remove icon-white"/></a>
			</div>
		</td>				
	</script>	