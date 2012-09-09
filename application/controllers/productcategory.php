<?php

class ProductCategory_Controller extends Base_Controller {
	
	public $restful = true;
	
	public function get_index($id = -1) {		
		Log::info('categories->post:' . $id);
	}
	
	public function post_index() {
		$cat = Input::json();		
		$cat->id = 1299;
		var_dump($cat);
		//$code = Request::foundation()->getContent();
		Log::info('categories->post: ' . $cat->code);
		return json_encode($cat);
	}
	
	public function put_index() {
		$code = Input::get('code');
		Log::info('categories->put:' . $code);
	}
	
	public function delete_index($id = -1) {
		Log::info('categories->delete: ' . $id);
	}	
}

?>