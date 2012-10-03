	<script type="text/template" id="tpl-featurecat-search">
		<form class="form-inline">
			<input type="text" class="input-medium" placeholder="Category code">
			<button type="submit" class="btn btn-primary btn-search">Search</button>
			<button type="cancel" class="btn btn-clear">Clear</button>
		</form>
	</script>	
	
	<script type="text/template" id="tpl-featurecat-results">
		<table class="table table-bordered table-striped table-hover table-condensed">
			<thead>
				<tr>
					<th class="id-col span1">#</th>
					<th class="span3">Code</th>
					<th >Name</th>
					<th class="tc-tool"><div class="pull-right"><a id='btn-add' class="btn btn-primary" rel="tooltip" title="Add new"><i class="icon-plus icon-white"></i></a></div></th>
				<tr>
			<thead>
			<tbody></tbody>
		</table>
	</script>
	
	<script type="text/template" id="tpl-featurecat-edit">
		<td class="id-col span1"><% _.isUndefined(m.id)? print('#'): print(m.id) %></td>
		<td class="span3"><input type="text" class="input-medium code-edit" placeholder="Categody code" value="<%= m.code %>"></td>
		<td ><input type="text" class="input-large name-edit" placeholder="Categody name" value="<%= m.name %>"></td>
		<td class="tc-tool">
			<div class="pull-right">
				<a class="btn btn-success btn-save" rel="tooltip" title="Save"><i class="icon-hdd icon-white"/></a>
				<a class="btn btn-warning btn-cancel" rel="tooltip" title="Cancel without saving"><i class="icon-remove icon-white"/></a>
			</div>
		</td>		
	</script>
	
	<script type="text/template" id="tpl-featurecat-row">
		<td class="id-col span1"><%= m.id %></td>
		<td class="span3"><%= m.code %></td>
		<td ><%= m.name %></td>
		<td class="tc-tool">
			<div class="pull-right">
			<a class="btn btn-primary btn-edit" rel="tooltip" title="Edit"><i class="icon-edit icon-white"/></a>
			<a class="btn btn-danger btn-delete" rel="tooltip" title="Delete permanently"><i class="icon-remove icon-white"/></a>
			</div>
		</td>				
	</script>	