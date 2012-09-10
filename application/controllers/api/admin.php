<?php

class Api_Admin_Controller extends Base_Controller {
	
	public $restful = true;
	
	public function get_category($id = -1) {		
		Log::info('categories->post:' . $id);
	}
	
	public function post_category() {
		$cat = Input::json();		
		$cat->id = 1299;
		Log::var_dump($cat);
		//$code = Request::foundation()->getContent();
		Log::info('categories->post: ' . $cat->code);
		return json_encode($cat);
	}
	
	public function put_category() {
		$code = Input::get('code');
		Log::info('categories->put:' . $code);
	}
	
	public function delete_category($id = -1) {
		Log::info('categories->delete: ' . $id);
	}	
}

?>