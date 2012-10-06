<?php

class Api_Admin_Controller extends Base_Controller {
	
	public $restful = true;
	
	/*
	 * Product Category REST API
	 */ 
	public function get_category($id = -1) {		
		if ($id = -1) {			
			$cats = ProductCategory::all();	
			return eloquent_to_json($cats);
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
			return eloquent_to_json($featureCats);
		}
	}
	
	public function post_featureCategory() {
		$featureCat = Input::json();
		
		//TODO: Do some validation here before saving..
		$dbFeatureCat = new FeatureCategory();
		$dbFeatureCat->code = $featureCat->code;
		$dbFeatureCat->name = $featureCat->name;
		$dbFeatureCat->save();
		return $dbFeatureCat->toJson();
	}
	
	public function put_featureCategory() {
		$featureCat = Input::json();
		
		$dbFeatureCat = FeatureCategory::find($featureCat->id);
		if (!is_null($dbFeatureCat)) {
			$dbFeatureCat->code = $featureCat->code;
			$dbFeatureCat->name = $featureCat->name;
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



	/*
	 * Product Features REST API
	 */
	public function get_feature($productCategoryId = -1) {
		if (is_null($productCategoryId) || $productCategoryId = -1) {
			$features = Feature::all();
			return eloquent_to_json($features);
		} else {
			$features = ProductCategory::find($productCategoryId)->features();
			return eloquent_to_json($features);
		}
	}
	
	public function post_feature() {
		$feature = Input::json();
		$productCategory = ProductCategory::find($feature->product_category_id);
					
		//TODO: Do some validation here before saving..
		$dbFeature = new Feature();
		$dbFeature->name = $feature->name;
		$dbFeature->data_type = $feature->data_type;
		$dbFeature->importance = $feature->importance;
		$dbFeature->description = empty($feature->description) ? null: $feature->description;
		$dbFeature->feature_category_id = $feature->feature_category_id;
		
		$productCategory->features()->insert($dbFeature);
		
		return $dbFeature->toJson();		
	}
	
	public function put_feature() {
		$feature = Input::json();
		
		$dbFeature = ProductFeature::find($feature->id);
		if (!is_null($dbFeature)) {
			$dbFeature->name = $feature->name;
			$dbFeature->data_type = $feature->data_type;
			$dbFeature->importance = $feature->importance;
			$dbFeature->description = empty($feature->description) ? null: $feature->description;
			$dbFeature->feature_category_id = $feature->feature_category_id;
			$dbFeature->product_category_id = $feature->product_category_id;			
			$dbFeature->save();
			return $dbFeature->toJson();
		}
		else {
			return $this->post_feature();
		}		
	}
	
	public function delete_feature($id) {
		$dbFeature = ProductFeature::find($id);
		$dbFeature->delete();		
	}
}

?>