<?php

class Create_Schema {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{		
		$this->createProductCategoryTable_0010();	
		$this->createProductFeatureCategoryTable_0020();
		$this->createFeatureTable_0030();
		$this->createProductFeatureTable_0033();
		$this->createProductFeatureSelectionTable_0035();
		$this->createProductTable_0040();	
		$this->createProductMediaTable_0050();
		$this->createProductContactTable_0060();
		$this->createProductFeatureSet_0070();
	}

	/**
	 * Revert the changes to the database.
	 *
	 * @return void
	 */
	public function down()
	{
		$this->dropProductFeatureSet_0070();
		$this->dropProductContactTable_0060();
		$this->dropProductMediaTable_0050();
		$this->dropProductTable_0040();
		$this->dropProductFeatureSelectionTable_0035();
		$this->dropProductFeatureTable_0033();
		$this->dropFeatureTable_0030();
		$this->droproductFeatureCategoryTable_0020();
		$this->dropProductCategoryTable_0010();				
	}
	
	private function dropProductFeatureTable_0033() {
		
		Schema::drop('flk_product_category_feature');
	}
	
	private function createProductFeatureTable_0033() {
		
		Schema::create('flk_product_category_feature', function($t) {
			$t->integer('product_category_id')->unsigned();
			$t->integer('feature_id')->unsigned();
			$t->boolean('enabled')->default(1);
			
			$t->foreign('feature_id')->references('id')->on('flk_feature')->on_delete('cascade');
			$t->foreign('product_category_id')->references('id')->on('flk_product_category')->on_delete('cascade');
			
			$t->primary(array('product_category_id', 'feature_id'));
		});
		
	}
	
	private function createProductFeatureSelectionTable_0035() {
		Schema::create('flk_product_feature_selection', function($t) {
			$t->increments('id')->unsigned();
			$t->integer('feature_id')->unsigned();
			$t->string('feature_value',100)->unsigned();
			$t->integer('display_order');
			
			// Foreign key references
			$t->foreign('feature_id')->references('id')->on('flk_feature');

			// Adding indexes
			$t->index('feature_id');						
		});
	}
	
	private function dropProductFeatureSelectionTable_0035() {
		Schema::drop('flk_product_feature_selection');
	}

	private function createProductFeatureSet_0070() {
		Schema::create('flk_product_feature', function($t){
			$t->integer('product_id')->unsigned();
			$t->integer('feature_id')->unsigned();
			$t->string('val_str',100)->nullable();
			$t->integer('val_int')->nullable();
			$t->boolean('val_bool')->nullable();
			$t->date('val_date')->nullable();
			$t->float('val_flt')->nullable();

			// Defining primary key..
			$t->primary(array('product_id', 'feature_id'));

			// Foreign keys...
			$t->foreign('product_id')->references('id')->on('flk_product');
			$t->foreign('feature_id')->references('id')->on('flk_feature');

		});
	}

	private function dropProductFeatureSet_0070() {
		Schema::drop('flk_product_feature');
	}

	private function createProductContactTable_0060() {
		Schema::create('flk_product_contact', function($t){
			$t->increments('id')->unsigned();
			$t->integer('product_id')->unsigned();
			$t->string('mobile',20)->nullable();
			$t->string('land',20)->nullable();
			$t->string('email',100);
			$t->string('address')->nullable();
			$t->string('suburb')->nullable();
			$t->string('postcode')->nullable();
			$t->string('country')->nullable();

			// Foreign key references
			$t->foreign('product_id')->references('id')->on('flk_product');
		});
	}


	private function dropProductContactTable_0060() {
		Schema::drop('flk_product_contact');
	}


	private function createProductMediaTable_0050() {
		Schema::create('flk_product_media', function($t){
			$t->increments('id')->unsigned();
			$t->integer('product_id')->unsigned();
			$t->string('media_path',400);
			$t->string('media_type',30);

			// Foreign key references
			$t->foreign('product_id')->references('id')->on('flk_product');

			// Adding indexes
			$t->index('product_id');
		});
	}

	private function dropProductMediaTable_0050() {
		Schema::drop('flk_product_media');
	}


	private function createProductTable_0040() {
		Schema::create('flk_product', function($t) {
			$t->increments('id')->unsigned();
			$t->string('title',200);
			$t->text('description');
			$t->integer('product_category_id')->unsigned();
			$t->decimal('price',10,2)->default(0);
			$t->boolean('highest_offer')->default(0);
			$t->integer('user_id')->unsigned()->default(0);
			$t->integer('rating')->unsigned()->default(0);
			$t->string('thumb_media_link', 100)->nullable();
			$t->timestamps();

			// Foreign key references
			$t->foreign('product_category_id')->references('id')->on('flk_product_category');

			// Adding indexes
			$t->index('product_category_id');
		});
	}

	private function dropProductTable_0040() {
		Schema::drop('flk_product');	
	}

	private function createProductFeatureCategoryTable_0020() {

		Schema::create('flk_feature_category', function($t) {
			$t->increments('id')->unsigned();
			$t->string('code',50)->unique();
			$t->string('name', 100)->nullable();
		});
	}

	private function droproductFeatureCategoryTable_0020() {
		Schema::drop('flk_feature_category');
	}


	private function createFeatureTable_0030() {

		Schema::create('flk_feature', function($t) {
			$t->increments('id')->unsigned();
			$t->string('name', 100);
			$t->integer('data_type')->unsigned()->default(0);
			$t->integer('importance')->default(0);
			$t->text('description')->nullable();
			//$t->integer('product_category_id')->unsigned()->nullable();
			$t->integer('feature_category_id')->unsigned()->nullable();

			// Adding fk rerences
			//$t->foreign('product_category_id')->references('id')->on('flk_product_category');
			$t->foreign('feature_category_id')->references('id')->on('flk_feature_category');
		});
	}

	private function dropFeatureTable_0030() {

		Schema::drop('flk_feature');
	}	


	private function createProductCategoryTable_0010() {

		Schema::create('flk_product_category', function($t){
			$t->increments('id')->unsigned();
			$t->string('code', 50)->unique();
			$t->string('name', 100)->nullable();
			$t->text('description')->nullable();	
			$t->integer('parent_id')->unsigned()->nullable();

			// We cannot add this while creating 
			//$t->foreign('parent_id')->references('id')->on('flk_product_category');			
		});

		// Once the table is created we can add self-referecing constraints
		Schema::table('flk_product_category', function($t) {
			$t->foreign('parent_id')->references('id')->on('flk_product_category');			
		});
	}

	private function dropProductCategoryTable_0010() {

		Schema::drop('flk_product_category');
	}


}