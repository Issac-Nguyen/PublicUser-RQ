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
			name: 'name',
			description: 'des'
		}),

		setDataDetailToView: function(item) {
            this.viewModel.set('id', item.id);
			this.viewModel.set('name', item.name);
			this.viewModel.set('description', item.description);
		}
	}
});