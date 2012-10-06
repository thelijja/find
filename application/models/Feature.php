<?php

class Feature extends BaseModel {
	
	public static $table = Constants::TABLE_FEATURE; 
	public static $timestamps = false;
	
	public static function getFeaturesByProductCategory($productCategoryId) {
		
		return 
		DB::table(Constants::TABLE_FEATURE)
			->join(Constants::TABLE_PRODUCT_CATEGORY_FEATURE,
						Constants::TABLE_FEATURE.'.id', '=',
						Constants::TABLE_PRODUCT_CATEGORY_FEATURE.'.feature_id')
			->where(Constants::TABLE_PRODUCT_CATEGORY_FEATURE.'.product_category_id', '=', $productCategoryId)
			->get();
			
			/*
			->get(array(
					Constants::TABLE_FEATURE.'.id as feature_id',		
					Constants::TABLE_FEATURE.'.name',
					Constants::TABLE_FEATURE.'.data_type',
					Constants::TABLE_FEATURE.'.importance',
					Constants::TABLE_FEATURE.'.description',
					Constants::TABLE_FEATURE.'.feature_category_id',
					Constants::TABLE_PRODUCT_CATEGORY_FEATURE.'.enabled',
					Constants::TABLE_PRODUCT_CATEGORY_FEATURE.'.product_category_id'	
				));
				*/
		
	}
}


?>