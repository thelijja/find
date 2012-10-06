<?php

class ProductCategory extends BaseModel {
	
	public static $table = Constants::TABLE_PRODUCT_CATEGORY;
	public static $timestamps = false;
	
	public function features() {
																	
		return $this->has_many_and_belongs_to('Feature', Constants::TABLE_PRODUCT_CATEGORY_FEATURE);	
		
	}
}

?>