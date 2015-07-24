define(['jQuery', 'kendo', './imageDetailDefect'], function($, kendo, imageDetailDefectView) {
	return {
		init: function(initEvt) {
			// ... init event code ...
            $("#listImageDefect").kendoMobileListView({
                                                    dataSource:this.model.get('arr_imageDefect'),
                                                    template: baseTemplate.templateImage,
                                                    click: function(e) {
                                                        //alert(JSON.stringify(e.dataItem));
                                                        var item = e.dataItem;
                                                        imageDetailDefectView.setDataIntoView(item);
                                                    }
                                                });
            
            $("#listImageResolve").kendoMobileListView({
                                                    dataSource:this.model.get('arr_imageResolve'),
                                                    template: baseTemplate.templateImage,
                                                    click: function(e) {
                                                        //alert(JSON.stringify(e.dataItem));
                                                        var item = e.dataItem;
                                                        imageDetailDefectView.setDataIntoView(item);
                                                    }
                                                });
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
            expectedDate: '',
            arr_imageDefect: kendo.data.DataSource.create({
                                                                                    data: []
                                                                                }),
            arr_imageResolve: kendo.data.DataSource.create({
                                                                                    data: []
                                                                                }),
            deleteDefect: function() {
                
            }
		}),

		setDataDetailToView: function(item) {
            this.viewModel.set('id', item.id);
			this.viewModel.set('building_id', item.building_id);
            this.viewModel.set('building_name', item.building_name);
            this.viewModel.set('category_id', item.category_id);
            this.viewModel.set('category_name', item.category_name);
			this.viewModel.set('subcategory_id', item.subcategory_id);
            this.viewModel.set('subcategory_name', item.subcategory_name);
            this.viewModel.set('zone_id', item.zone_id);
            this.viewModel.set('zone_name', item.zone_name);
            this.viewModel.set('floor_id', item.floor_id);
            this.viewModel.set('floor_name', item.floor_name);
			this.viewModel.set('expectedDate', item.expectedDate);
            this.viewModel.get('arr_imageDefect').data(item.arr_imageDefect);
            this.viewModel.get('arr_imageResolve').data(item.arr_imageResolve);
		}
	}
});