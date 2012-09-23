<?php

class Api_Lookup_Controller extends Base_Controller {

	public $restful = true;
	public static $datatypes = null;
	
	public function get_index($type = 'category') {
		
		if ($type == 'category') return $this->getCategory();
		
		switch($type) {
			case 'category': return $this->getCategory();
			case 'featurecat': return $this->getFeatureCategory();
			case 'datatype' : return $this->getFeatureDataTypes();
			default: return array();
		}
	}
	
	private function getCategory($level = null) {
		
		if ($level == null) {
			return json_encode(Lookup::getCategories());
		}
		
	}
	
	private function getFeatureCategory() {
		return json_encode(Lookup::getFeatureCategories());
	}
	
	private function getFeatureDataTypes() {
		if (self::$datatypes == null) {
			$arr = array();
			$dt = new stdClass(); $dt->id = 0; $dt->name = 'Text';
			$arr[]= $dt;
			$dt = new stdClass(); $dt->id = 1; $dt->name = 'Integer';
			$arr[]= $dt;
			$dt = new stdClass(); $dt->id = 2; $dt->name = 'Date';
			$arr[]= $dt;
			$dt = new stdClass(); $dt->id = 3; $dt->name = 'Decimal';
			$arr[]= $dt;
			$dt = new stdClass(); $dt->id = 4; $dt->name = 'Yes/No';
			$arr[]= $dt;
			$dt = new stdClass(); $dt->id = 5; $dt->name = 'Choice';
			$arr[]= $dt;									
			self::$datatypes = json_encode($arr);			
		}
		return self::$datatypes;
	}
	
	public static function createDataTypes() {
		
	}
}
?>