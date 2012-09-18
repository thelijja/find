<?php

class Api_Admin_Controller extends Base_Controller {
	
	public $restful = true;
	
	/*
	 * Product Category REST API
	 */ 
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
		if (!is_null($cat->parent_id) && $cat->parent_id > -1 ) {			
			$dbCat->parent_id = $cat->parent_id;
		}
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
			if (!is_null($cat->parent_id) && $cat->parent_id > -1 ) {			
				$dbCat->parent_id = $cat->parent_id;
			}
			else {
				$dbCat->parent_id = null;
			}
			$dbCat->save();
			return $dbCat->toJson();
		}
		
		return $this->post_category();
	}
	
	public function delete_category($id) {
		
		$dbCat = ProductCategory::find($id);
		$dbCat->delete();
		
	}	

	/*
	 * Product Feature category REST API
	 */
	public function get_featureCategory($id = -1) {
		if (is_null($id) || $id = -1) {
			$featureCats = FeatureCategory::all();
			return FeatureCategory::allToJson($featureCats);
		}
	}
	
	public function post_featureCategory() {
		$featureCat = Input::json();
		
		//TODO: Do some validation here before saving..
		$dbFeatureCat = new FeatureCategory();
		$dbFeatureCat->code = $featureCat->code;
		$dbFeatureCat->save();
		return $dbFeatureCat->toJson();
	}
	
	public function put_featureCategory() {
		$featureCat = Input::json();
		
		$dbFeatureCat = FeatureCategory::find($featureCat->id);
		if (!is_null($dbFeatureCat)) {
			$dbFeatureCat->code = $featureCat->code;
			$dbFeatureCat->save();
			return $dbFeatureCat->toJson();
		}
		else {
			return $this->post_featureCategory();
		}
	}
	
	public function delete_featureCategory($id) {
		
		$dbFeatureCat = FeatureCategory::find($id);
		$dbFeatureCat->delete();
	}	


}

?>