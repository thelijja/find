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
			<li><a href="#features">Product Features</a></li>
		</ul>
	</div>
</div>
@endsection


@section('content')
	<div id="main-area" class="container-fluid">
		<div id="default-layout">
			<div class="row-fluid search-area">
				<div></div>
			</div>
			<div class="row-fluid result-area">
				<div></div>
			</div>			
		</div>
		
		<div id="vertical-layout" class="hide">
			<div class="row-fluid">
				<div class="span2 left-area">	
					
				</div>
				<div class="span10 right-area">
					
				</div>
			</div>			
		</div>
		
	</div>
	
	
	<!-- Begin Product Category Templates -->
	<?php echo render('admin.template._productcategory'); ?>
	<!-- End Templates -->

	<!-- Begin Feature Category Templates -->
	<?php echo render('admin.template._featurecategory'); ?>
	<!-- End Templates-->
	
	<!-- Begin Feature Templates -->
	<?php echo render('admin.template._feature'); ?>
	<!-- End Templates-->	
@endsection

