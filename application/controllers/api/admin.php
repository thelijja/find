<?php

class Api_Admin_Controller extends Base_Controller {
	
	public $restful = true;
	
	public function get_category($id = -1) {		
		if ($id = -1) {			
			$cats = ProductCategory::all();
			return ProductCategory::allToJson($cats);
		}				
	}
	
	public function post_category() {
		$cat = Input::json();
		
		//TODO: Do some validation before saving...
		$dbCat = new ProductCategory();
		$dbCat->code = $cat->code;
		$dbCat->name = $cat->name;
		$dbCat->save();
		
		//$code = Request::foundation()->getContent();
		Log::info('categories->post: ' . $dbCat->id);
		return $dbCat->toJson();
	}
	
	public function put_category() {
		$cat = Input::json();
		//TODO: Do some validation before saving...
		$dbCat = ProductCategory::find($cat->id);
		if ($dbCat != null) {
			$dbCat->code = $cat->code;
			$dbCat->name = $cat->name;
			$dbCat->save();
			return $dbCat->toJson();
		}
		
		return $this->post_category();
	}
	
	public function delete_category($id = -1) {
		
		$dbCat = ProductCategory::find($id);
		$dbCat->delete();
		
	}	
}

?>