define(['kendo'], function(kendo) {
	return {
		init: function(initEvt) {
			// ... init event code ...
		},

		beforeShow: function(beforeShowEvt) {
			// ... before show event code ...
		},

		show: function(showEvt) {
			// ... show event code ...
		},

		viewModel: kendo.observable({
            id: 'id',
			building_id: '',
            building_name: '',
            category_id: '',
            category_name: '',
            subcategory_id: '',
            subcategory_name: '',
            zone_id: '',
            zone_name: '',
            floor_id: '',
            floor_name: '',
            expectedCompeletedDate: '',
		}),

		setDataDetailToView: function(item) {
            this.viewModel.set('id', item.id);
			this.viewModel.set('name', item.name);
			this.viewModel.set('description', item.description);
		}
	}
});