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
		$this->createProductFeatureTable_0030();	
		$this->createProductTable_0040();	
	}

	/**
	 * Revert the changes to the database.
	 *
	 * @return void
	 */
	public function down()
	{
		$this->dropProductTable_0040();
		$this->dropProductFeatureTable_0030();
		$this->droproductFeatureCategoryTable_0020();
		$this->dropProductCategoryTable_0010();				
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
			$t->integer('id')->unsigned()->primary('id');
			$t->string('code',50)->unique();
		});
	}

	private function droproductFeatureCategoryTable_0020() {
		Schema::drop('flk_feature_category');
	}


	private function createProductFeatureTable_0030() {

		Schema::create('flk_product_feature', function($t) {
			$t->increments('id')->unsigned();
			$t->string('name', 100);
			$t->text('description');
			$t->integer('product_category_id')->unsigned()->nullable();
			$t->integer('feature_category_id')->unsigned()->nullable();

			// Adding fk rerences
			$t->foreign('product_category_id')->references('id')->on('flk_product_category');
			$t->foreign('feature_category_id')->references('id')->on('flk_feature_category');
		});
	}

	private function dropProductFeatureTable_0030() {

		Schema::drop('flk_product_feature');
	}	


	private function createProductCategoryTable_0010() {

		Schema::create('flk_product_category', function($t){
			$t->integer('id')->unsigned()->primary('id');			
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