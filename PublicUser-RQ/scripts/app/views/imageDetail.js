define(['kendo', '../phonegap/phonegap', '../common/common', '../common/helper', '../common/pubsub', './newDefect'], function(kendo, phonegap, common, helper, pubsub, newDefectView) {
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
            dataURL: '',
            description: '',

            onClickBack: function(e) {
                var self = this;
                phonegap.writeImageIntoSystem(this.get('dataURL'), $("#imgDetail")[0], function() {
                   $("#listImage").data("kendoMobileListView").refresh();
                    //newDefectView.refreshListImage();
                    var objHandle = {};
                    objHandle.id = 'views/newDefect.html';
                    var objImage = {};
                    objImage.id = self.get('id');
                    objImage.dataURL = self.get('dataURL');
                    objImage.description = self.get('description');
                    
                    objHandle.fn = function() {
                         var arrImage = this.model.get('listImage').data();
                         for(var i = 0; i < arrImage.length; i++) {
                             var item = arrImage[i];
                             if(item.id = objImage.id)
                                 item.dataURL = objImage.dataURL;
                                 item.description = objImage.description;
                         }
                    }
                    
                    objHandle.processed = 0;

                    pubsub.addIntohandleArr(objHandle);
                    helper.goBack();
                });

            },
        }),
        setDataIntoView: function(obj) {
            this.viewModel.set('id', obj.id);
            this.viewModel.set('dataURL', obj.dataURL);
            this.viewModel.set('description', obj.description);
        }
    }
});