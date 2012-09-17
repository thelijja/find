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


@section('content')
	<div id="main-area" class="container-fluid">
		<div id="search-area" class="row-fluid">			
		</div>
		<div id="result-area" class="row-fluid">
		
		</div>
	</div>
	
	
	<!-- Begin Templates -->
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
					<th class="span5">Name</th>
					<th class="span3">Parent</th>
					<th class="tc-tool"><a id='btn-add' class="btn btn-primary"><i class="icon-plus icon-white"></i></a></th>
				<tr>
			<thead>
			<tbody></tbody>
		</table>
	</script>
	
	<script type="text/template" id="tpl-category-edit">
		<td class="id-col span1"><% _.isUndefined(m.id)? print('#'): print(m.id) %></td>
		<td class="span2"><input type="text" class="input-small code-edit" placeholder="Categody code" value="<%= m.code %>"></td>
		<td class="span5"><input type="text" class="input-large name-edit" placeholder="Categody name" value="<%= m.name %>"></td>
		<td class="span3">
			<select name="parentId" id="parentId" class="input-medium">
				<option value="-1">No parent</option>
			</select>
		</td>
		<td class="tc-tool">
			<div class="row-fluid tc-tool">
				<a class="btn btn-success btn-save"><i class="icon-hdd icon-white"/></a>
				<a class="btn btn-warning btn-cancel"><i class="icon-remove icon-white"/></a>
			</div>
		</td>		
	</script>
	
	<script type="text/template" id="tpl-category-row">
		<td class="id-col span1"><%= m.id %></td>
		<td class="span2"><%= m.code %></td>
		<td class="span5"><%= m.name %></td>
		<td class="span3"><% _.isUndefined(m.parentCode)? print(''): print(m.parentCode) %></td>
		<td class="tc-tool">
			<div class="row-fluid">
			<a class="btn btn-primary btn-edit"><i class="icon-edit icon-white"/></a>
			<a class="btn btn-danger btn-delete"><i class="icon-remove icon-white"/></a>
			</div>
		</td>				
	</script>
	<!-- End Templates
@endsection

