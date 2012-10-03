<?php

class Lookup {
	
	public static function getCategories() {
		
		return
		DB::table(Constants::TABLE_PRODUCT_CATEGORY)
			->order_by('name')
			->get(array('id','name'));					
	}
	
	public static function getFeatureCategories() {
		
		return
		DB::table(Constants::TABLE_FEATURE_CATEGORY)
			->order_by('name')
			->get(array('id','name'));
	}
	
	
	public static function getCategoryTree() {
		
		$allCats = DB::table(Constants::TABLE_PRODUCT_CATEGORY)
						->order_by('name')
						->get(array('id', 'name', 'parent_id'));
						
		$tree = array();
		$parents = array();
		
		foreach($allCats as $cat) {
					
			// Am I as a parent already...				
			if (isset($parents[$cat->id])) {
				$amIParent = $parents[$cat->id];
				$cat->children = $amIParent->children;
				$parents[$cat->id] = $cat;
			} else {
				$parents[$cat->id] = $cat;
				$cat->children = array();
			}
						
		
			if ($cat->parent_id == null) {
				$tree[] = $cat;
				
			} else {
				
				if (isset($parents[$cat->parent_id])) {
					$parent = $parents[$cat->parent_id];
					$parent->children[]	= $cat;
				} else {
					// We need to create temporary parent...
					$p = new stdClass();
					$p->children = array();
					$p->children[] = $cat;
					$parents[$cat->parent_id] = $p;
				}					
																
			}
						
		}				
			
		return $tree;						
	}
}

?>