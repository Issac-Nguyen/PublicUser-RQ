
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
			message: 'This Rock!',
			clickBtnCancel: function(e) {
				$("#modalview-login").kendoMobileModalView("close");
			}
		}),
	}
});