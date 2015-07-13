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
			name: 'name',
			description: 'des'
		}),

		setDataDetailToView: function(item) {
			this.viewModel.set('name', item.name);
			this.viewModel.set('description', item.description);
		}
	}
});