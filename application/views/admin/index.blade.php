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
			<button type="submit" class="btn">Search</button>	
		</form>
	</script>
	
	<script type="text/template" id="tpl-category-results">
		<table class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th>#</th>
					<th>Code</th>
					<th>Name</th>
				<tr>
			<thead>
		</table>
	</script>
	<!-- End Templates
@endsection

