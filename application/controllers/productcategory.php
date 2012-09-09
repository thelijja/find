<?php

class ProductCategory_Controller extends Base_Controller {
	
	public $restful = true;
	
	public function get_category($id = -1, $isJson = false) {		
		if ($id == -1) {
			$cat = new ProductCategory();
			//var_dump($cat);
		} else if (is_numeric($id)) {
			$cat = ProductCategory::find($id);
			var_dump($cat);			
		}
		
		var_dump($isJson);
		
		if ($isJson) {
			return json_encode($cat);
		}
	}
}

?>