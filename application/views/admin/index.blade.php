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
			<button type="submit" class="btn btn-search">Search</button>
			<button type="cancel" class="btn btn-clear">Clear</button>
		</form>
	</script>
	
	<script type="text/template" id="tpl-category-results">
		<table class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th class="id-col">#</th>
					<th>Code</th>
					<th>Name</th>
					<th class="tc-tool"><a id='btn-add' class="btn">+</a></th>
				<tr>
			<thead>
			<tbody></tbody>
		</table>
	</script>
	
	<script type="text/template" id="tpl-category-edit">
		<td class="id-col">#</td>
		<td><input type="text" class="input-large code-edit" placeholder="Categody code" value="<%= m.code %>"></td>
		<td><input type="text" class="input-large name-edit" placeholder="Categody name" value="<%= m.name %>"></td>
		<td><div class="row-fluid"><a class="btn btn-save">S</a><a class="btn btn-delete">D</a></div></td>		
	</script>
	
	<script type="text/template" id="tpl-category-row">
		<td class="id-col"><%= m.id %></td>
		<td><%= m.code %></td>
		<td><%= m.name %></td>
		<td><div class="row-fluid"><a class="btn btn-edit">E</a><a class="btn btn-delete">D</a></div></td>				
	</script>
	<!-- End Templates
@endsection

