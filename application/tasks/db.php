<?php

class Db_Task {

	public function seed() {
	
		echo 'Truncating tables...', PHP_EOL;
		DB::query('DELETE FROM '. Constants::TABLE_FEATURE_SELECTION );
		DB::query('DELETE FROM '. Constants::TABLE_FEATURE );
		DB::query('DELETE FROM '. Constants::TABLE_FEATURE_CATEGORY );
		DB::query('DELETE FROM '. Constants::TABLE_PRODUCT_CATEGORY );
		
		echo 'Propulating...' . Constants::TABLE_PRODUCT_CATEGORY , PHP_EOL;
		$vehicles= ProductCategory::create(array('code'=> 'vehicles', 'name' => 'Vehicles'));
		$cars= ProductCategory::create(array('code'=> 'cars', 'name' => 'Cars', 'parent_id' => $vehicles->id));
		$boats= ProductCategory::create(array('code'=> 'boats', 'name' => 'Ships and Boats', 'parent_id' => $vehicles->id));
		$cycles= ProductCategory::create(array('code'=> 'cycles', 'name' => 'Cycles', 'parent_id' => $vehicles->id));
		$bicycles= ProductCategory::create(array('code'=> 'bicycles', 'name' => 'Bicycles', 'parent_id' => $cycles->id));
		$motorcycles= ProductCategory::create(array('code'=> 'motorcycles', 'name' => 'Motorcycles', 'parent_id' => $cycles->id));
		$furnitures= ProductCategory::create(array('code'=> 'furnitures', 'name' => 'Furnitures'));
		$dining= ProductCategory::create(array('code'=> 'dining', 'name' => 'Dining Tables', 'parent_id' => $furnitures->id));
		$beds= ProductCategory::create(array('code'=> 'beds', 'name' => 'Beds', 'parent_id' => $furnitures->id));
		$realstate= ProductCategory::create(array('code'=> 'realstate', 'name' => 'Real States'));
		$houses= ProductCategory::create(array('code'=> 'houses', 'name' => 'House and Lands', 'parent_id' => $realstate->id));
		$landonly= ProductCategory::create(array('code'=> 'landonly', 'name' => 'Bare Lands', 'parent_id' => $realstate->id));
		$commercial= ProductCategory::create(array('code'=> 'commercial', 'name' => 'Commercial Buildings', 'parent_id' => $realstate->id));
		
	
		echo 'Populating...' .Constants::TABLE_FEATURE_CATEGORY, PHP_EOL;
		$level0 = FeatureCategory::create(array('code'=>'level0', 'name' => 'Basic properties that must be shown'));
		$level1 = FeatureCategory::create(array('code'=>'level1', 'name' => 'Secondary properties'));
		
		/*
		echo 'Populating...' .Constants::TABLE_PRODUCT_FEATURE, PHP_EOL;		
		ProductFeature::create(array(
			'name' => 'Condition',
			'data_type' => Constants::DDT_CHOICE,
			'importance' => 1,
			'description' => 'Vehical Condition',
			'product_category_id' => $auto->id,
			'feature_category_id' => $level0->id
		));
		
		ProductFeature::create(array(
			'name' => 'Make',
			'data_type' => Constants::DDT_CHOICE,
			'importance' => 1,
			'description' => 'Vehical Make',
			'product_category_id' => $auto->id,
			'feature_category_id' => $level0->id
		));
		
		ProductFeature::create(array(
			'name' => 'Model',
			'data_type' => Constants::DDT_CHOICE,
			'importance' => 1,
			'description' => 'Vehical Model',
			'product_category_id' => $auto->id,
			'feature_category_id' => $level0->id
		));
		
		ProductFeature::create(array(
			'name' => 'Manufacture Year',
			'data_type' => Constants::DDT_INTEGER,
			'importance' => 1,
			'description' => 'Year of manufacture',
			'product_category_id' => $auto->id,
			'feature_category_id' => $level0->id
		));
		*/
	}
}

?>