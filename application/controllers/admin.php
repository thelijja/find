<?php

class Admin_Controller extends Base_Controller {
	
	
	public function action_index() {
		
		return View::make('admin.index');
		
	}
	
}

?>