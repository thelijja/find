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
					<th class="span4">Code</th>
					<th class="span6">Name</th>
					<th class="tc-tool"><a id='btn-add' class="btn btn-primary"><i class="icon-plus icon-white"></i></a></th>
				<tr>
			<thead>
			<tbody></tbody>
		</table>
	</script>
	
	<script type="text/template" id="tpl-category-edit">
		<td class="id-col span1"><% _.isUndefined(m.id)? print('#'): print(m.id) %></td>
		<td class="span4"><input type="text" class="input-medium code-edit" placeholder="Categody code" value="<%= m.code %>"></td>
		<td class="span6"><input type="text" class="input-large name-edit" placeholder="Categody name" value="<%= m.name %>"></td>
		<td class="tc-tool">
			<div class="row-fluid">
				<a class="btn btn-success btn-save"><i class="icon-hdd icon-white"/></a>
				<a class="btn btn-warning btn-cancel"><i class="icon-remove icon-white"/></a>
			</div>
		</td>		
	</script>
	
	<script type="text/template" id="tpl-category-row">
		<td class="id-col span1"><%= m.id %></td>
		<td class="span4"><%= m.code %></td>
		<td class="span6"><%= m.name %></td>
		<td class="tc-tool">
			<div class="row-fluid">
			<a class="btn btn-primary btn-edit"><i class="icon-edit icon-white"/></a>
			<a class="btn btn-danger btn-delete"><i class="icon-remove icon-white"/></a>
			</div>
		</td>				
	</script>
	<!-- End Templates
@endsection

