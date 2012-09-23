<?php

class Lookup {
	
	public static function getCategories() {
		
		return
		DB::table('flk_product_category')
			->order_by('name')
			->get(array('id','name'));					
	}
	
	public static function getFeatureCategories() {
		return
		DB::table('flk_feature_category')
			->order_by('name')
			->get(array('id','name'));
	}
	
}

?>