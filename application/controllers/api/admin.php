<?php

class Api_Admin_Controller extends Base_Controller {
	
	public $restful = true;
	
	/*
	 * Product Category REST API
	 */ 
	public function get_category($id = null) {
		
		if ($id == null) {			
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
	public function get_featureCategory($id = null) {
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
	public function get_feature($productCategoryId = null) {
		if ($productCategoryId == null) {
			var_dump($productCategoryId);
		} else {
			$features = Feature::getFeaturesByProductCategory($productCategoryId);
			return json_encode($features);
		}
	}
	
	public function post_feature() {
		
		$returnFeature = array();
		$feature = Input::json();
		DB::transaction(function() use (&$feature, &$returnFeature) {
			
			// First save the feature...
			$dbFeature = Feature::create(array(
				'name' => $feature->name,
				'data_type' => $feature->data_type,
				'importance' => $feature->importance,
				'description' => empty($feature->description) ? null: $feature->description,
				'feature_category_id' => $feature->feature_category_id,				
			));

			
			// Then add the link to product category feature...
			$dbProdCatFeature = ProductCategoryFeature::create(array(
				'product_category_id' => $feature->product_category_id,
				'feature_id' => $dbFeature->id,
				'enabled' => true
			));
			
			// We need to remove empty 'id' field from Eloquent object...
			$temp = $dbProdCatFeature->to_array();
			unset($temp['id']);
			
			$returnFeature = array_merge($dbFeature->to_array(), $temp);								
		});
				
		return json_encode($returnFeature);		
	}
	
	public function put_feature() {
		$feature = Input::json();
		
		$dbFeature = Feature::find($feature->id);
		if (!is_null($dbFeature)) {
			$dbFeature->name = $feature->name;
			$dbFeature->data_type = $feature->data_type;
			$dbFeature->importance = $feature->importance;
			$dbFeature->description = $feature->description;
			$dbFeature->feature_category_id = $feature->feature_category_id;
			$dbFeature->save();
			$propArray = $dbFeature->to_array();
			$propArray['product_category_id'] = $feature->product_category_id;
			$propArray['feature_id'] = $feature->feature_id;
			$propArray['enabled'] = $feature->enabled;
			return json_encode($propArray);
		}
		else {
			return $this->post_featureCategory();
		}		
		
	}
	
	public function delete_feature($id) {
		$dbFeature = Feature::find($id);
		$dbFeature->delete();		
	}
}

?>