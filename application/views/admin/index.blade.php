@layout('layout._admin')

@section('css')
	@parent
@endsection

@section('js')
	@parent
	{{ HTML::script('js/admin/models.js') }}
	{{ HTML::script('js/admin/collections.js') }}
	{{ HTML::script('js/admin/views.js') }}
	{{ HTML::script('js/admin/admin.js') }}		
@endsection

@section('nav')
<div class="navbar navbar-inverse">
	<div class="navbar-inner">
		<div class="brand" ><i class="icon-user"></i></div>	
		<ul class="nav">
			<li><a href="#categories">Product Categories</a></li>
			<li><a href="#featurecats">Feature Categories</a></li>
		</ul>
	</div>
</div>
@endsection


@section('content')
	<div id="main-area" class="container-fluid">
		<div id="search-area" class="row-fluid">
			<div></div>
		</div>
		<div id="result-area" class="row-fluid">
			<div></div>
		</div>
	</div>
	
	
	<!-- Begin Product Category Templates -->
	<script type="text/template" id="tpl-category-search">
		<form class="form-inline">
			<input type="text" class="input-medium" placeholder="Category code">
			<input type="text" class="input-medium" placeholder="Category name">
			<button type="submit" class="btn btn-primary btn-search">Search</button>
			<button type="cancel" class="btn btn-clear">Clear</button>
		</form>
	</script>
	
	<script type="text/template" id="tpl-category-results">
		<table class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th class="id-col span1">#</th>
					<th class="span2">Code</th>
					<th >Name</th>
					<th class="span3">Parent</th>
					<th class="tc-tool"><div class="pull-right"><a id='btn-add' class="btn btn-primary" rel="tooltip" title="Add category"><i class="icon-plus icon-white"></i></a></div></th>
				<tr>
			<thead>
			<tbody></tbody>
		</table>
	</script>
	
	<script type="text/template" id="tpl-category-edit">
		<td class="id-col span1"><% _.isUndefined(m.id)? print('#'): print(m.id) %></td>
		<td class="span2"><input type="text" class="input-small code-edit" placeholder="Categody code" value="<%= m.code %>"></td>
		<td ><input type="text" class="input-large name-edit" placeholder="Categody name" value="<%= m.name %>"></td>
		<td class="span3">
			<select name="parentId" id="parentId" class="input-medium">
				<option value="-1">No parent</option>
			</select>
		</td>
		<td class="tc-tool">
			<div class="pull-right">
				<a class="btn btn-success btn-save" rel="tooltip" title="Save category"><i class="icon-hdd icon-white"/></a>
				<a class="btn btn-warning btn-cancel" rel="tooltip" title="Cancel without saving"><i class="icon-remove icon-white"/></a>
			</div>
		</td>		
	</script>
	
	<script type="text/template" id="tpl-category-row">
		<td class="id-col span1"><%= m.id %></td>
		<td class="span2"><%= m.code %></td>
		<td ><%= m.name %></td>
		<td class="span3"><% _.isUndefined(m.parentCode)? print(''): print(m.parentCode) %></td>
		<td class="tc-tool">
			<div class="pull-right">
			<a class="btn btn-primary btn-edit" rel="tooltip" title="Edit category"><i class="icon-edit icon-white"/></a>
			<a class="btn btn-danger btn-delete" rel="tooltip" title="Delete category"><i class="icon-remove icon-white"/></a>
			</div>
		</td>				
	</script>
	<!-- End Templates -->

	<!-- Begin Feature Category Templates -->
	<script type="text/template" id="tpl-featurecat-search">
		<form class="form-inline">
			<input type="text" class="input-medium" placeholder="Category code">
			<button type="submit" class="btn btn-primary btn-search">Search</button>
			<button type="cancel" class="btn btn-clear">Clear</button>
		</form>
	</script>	
	
	<script type="text/template" id="tpl-featurecat-results">
		<table class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th class="id-col span1">#</th>
					<th class="span3">Code</th>
					<th >Name</th>
					<th class="tc-tool"><div class="pull-right"><a id='btn-add' class="btn btn-primary" rel="tooltip" title="Add feature category"><i class="icon-plus icon-white"></i></a></div></th>
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
				<a class="btn btn-success btn-save" rel="tooltip" title="Save feature category"><i class="icon-hdd icon-white"/></a>
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
			<a class="btn btn-primary btn-edit" rel="tooltip" title="Edit feature category"><i class="icon-edit icon-white"/></a>
			<a class="btn btn-danger btn-delete" rel="tooltip" title="Delete feature category"><i class="icon-remove icon-white"/></a>
			</div>
		</td>				
	</script>	
	<!-- End Templates-->
@endsection

