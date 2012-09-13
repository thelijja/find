<?php

class Api_Admin_Controller extends Base_Controller {
	
	public $restful = true;
	
	public function get_category($id = -1) {		
		Log::info('categories->post:' . $id);
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
		$code = Input::get('code');
		Log::info('categories->put:' . $code);
	}
	
	public function delete_category($id = -1) {
		
		$dbCat = ProductCategory::find($id);
		$dbCat->delete();
		
	}	
}

?>