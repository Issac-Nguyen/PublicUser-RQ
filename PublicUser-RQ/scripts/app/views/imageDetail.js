define(['kendo', '../phonegap/phonegap', '../common/common', '../common/helper', './newDefect'], function(kendo, phonegap, common, helper, newDefectView) {
    return {
        init: function(initEvt) {
            // ... init event code ...
            //var width = common.windowWidth,
            //	height = common.windowHeight - common.heightHeader;
            //this.viewModel.set('widthImage', width);
            //this.viewModel.set('heightImage', height);
            //this.model.set('id', helper.timestampString());
        },

        beforeShow: function(beforeShowEvt) {
            // ... before show event code ...
        },

        show: function(showEvt) {
            // ... show event code ...
            // var params = showEvt.view.params;
            var dataURL = this.model.get('dataURL');
            // alert(app);
            helper.initDrawonCanvas('imgDetail');
            helper.drawImageOnCanvas(dataURL, 'imgDetail');

        },

        viewModel: kendo.observable({
            id: '',
            name: '',
            dataURL: '',

            onClickBack: function(e) {
                phonegap.writeImageIntoSystem(this.get('dataURL'), $("#imgDetail")[0], function() {
                   $("#listImage").data("kendoMobileListView").refresh();
                    //newDefectView.refreshListImage();
                    helper.goBack();
                });

            },
        }),
        setDataIntoView: function(obj) {
            this.viewModel.set('id', obj.id);
            this.viewModel.set('dataURL', obj.dataURL);
        }
    }
});