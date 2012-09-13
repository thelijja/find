<?php

class BaseModel extends Eloquent {
	
	public function toJson() {
		return json_encode($this->to_array());	
	}	
}

?>