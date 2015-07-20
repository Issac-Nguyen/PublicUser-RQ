define(['kendo', '../common/UI', '../phonegap/phonegap', '../common/common', '../common/sqlite', '../common/helper', '../common/pubsub', './template/baseTemplate', './defects', './imageDetail'], function(kendo, UI, phonegap, common, database, helper, pubsub, baseTemplate, defectsView, imageDetailView) {
    var isDisableCapture = false;
    var validator;

    function resetModel(obj, cb) {
        helper.resetModel(obj, {
                              id: 'String',
                              vlBuilding: 'String',
                              vlCategory: 'String',
                              vlSubCategory: 'String',
                              vlZone: 'String',
                              vlFloor: 'String',
                          });
        
        obj.set('vlExpetedCompletedDate', new Date());
        obj.get('listImage').data([]);
        if (cb)
            cb();
    }

    return {
        init: function(initEvt) {
            // ... init event code ...
            $("#listImage").kendoMobileListView({
                                                    dataSource:this.model.get('listImage'),
                                                    template: baseTemplate.templateImage,
                                                    click: function(e) {
                                                        //alert(JSON.stringify(e.dataItem));
                                                        var item = e.dataItem;
                                                        imageDetailView.setDataIntoView(item);
                                                    }
                                                });
            
            var options = {
                dataSource: [
                    {ID: '1', Name: 'First Option'},{ID: '2', Name:'Second Option'},
                    {ID: '3', Name:'Third Option'},{ID: '4', Name:'Fourth Option'},
                ], dataTextField: "Name",
                dataValueField: "ID", optionLabel: "Select a value..."
            };
            
            UI.buildDropDownList('drBuilding', options);
            UI.buildDropDownList('drCategory', options);
            UI.buildDropDownList('drSubCategory', options);
            UI.buildDropDownList('drZone', options);
            UI.buildDropDownList('drFloor', options);
            UI.buildDatepicker('expectedCompleteDate', {format: "dd/MM/yyyy",value: new Date()});

            validator = $("#form-newDefect").kendoValidator().data("kendoValidator");
        },

        beforeShow: function(beforeShowEvt) {
            // ... before show event code ...
        },

        show: function(showEvt) {
            // ... show event code ...
            //get id of defect
            if (this.model.get('id') == '')
                this.model.set('id', helper.timestampString());
            
            pubsub.processAllInHandleArr(this.id, this);
        },

        viewModel: kendo.observable({
                                        id: '',
                                        name: '',
                                        description: '',
                                        message: 'new Defect',
                                        vlBuilding: '1',
                                        vlCategory: '1',
                                        vlSubCategory: '1',
                                        vlZone: '1',
                                        vlFloor: '1',
                                        vlExpetedCompletedDate: new Date(),
                                        listImage: kendo.data.DataSource.create({
                                                                                    data: []
                                                                                }),
                                        onClickCancel: function(e) {
                                            //var self = this;
                                            resetModel(this);
                                        },
                                        onClickAdd: function(e) {
                                            if (!validator.validate())
                                                return;
                                            var self = this;
                                            var objDefect = {};
                                            objDefect.id = this.get('id').toString();
                                            objDefect.building_id = this.get('vlBuilding');
                                            objDefect.category_id = this.get('vlCategory');
                                            objDefect.subcategory_id = this.get('vlSubCategory');
                                            objDefect.zone_id = this.get('vlZone');
                                            objDefect.floor_id = this.get('vlFloor');
                                            objDefect.expectedDate = helper.formatDate(this.get('vlExpetedCompletedDate'));
                                            //objDefect.defectsArr = $("#listImage").data("kendoMobileListView").dataSource.data().toJSON();
                                            objDefect.arr_image = JSON.stringify(this.get('listImage').data().toJSON());
                                            objDefect.createdDate = helper.formatDate();
                                            objDefect.createdTime = helper.currentTime();
                                            //database.insertInto("defect", objDefect, function(res) {
                                            //if(helper.checkInternet()) {
                                            //helper.uploadDefectToServer(objDefect, function(res) {
                                            //    if (res.result === 'success') {
                                                    phonegap.uploadFile((self.get('listImage').data().toJSON())[0].dataURL, function(){
                                                        resetModel(self, function() {
                                                        defectsView.insertIntoListDefects(objDefect);
                                                        helper.goBack();
                                                    });
                                                    }, helper.handlerErr, {});
                                            //    }
                                            //});
                                            //} else {
                                            //    resetModel(self, function() {
                                            //                defectsView.insertIntoListDefects(objDefect);
                                            //                helper.goBack();
                                            //}, helper.handleErr);
                                            //}
                                            //}, helper.handleErr);
                                            //database.insertInto('defects', objDefect, function() {
                                            //    resetModel(self, function() {
                                            //        $("#listImage").data("kendoMobileListView").dataSource.data([]);
                                            //        defectsView.insertIntoListDefects(objDefect);
                                            //        helper.goBack();
                                            //    });
                                            //});
                                        },
                                        addImage
                                        : function(e) {
                                            var self = this;

                                            //if ($("#listImage").data("kendoMobileListView"))
                                            //    isDisableCapture = $("#listImage").data("kendoMobileListView").dataSource.total() == common.maximumImageCapture;

                                            isDisableCapture = this.get('listImage').total() == common.maximumImageCapture;
                
                                            if (isDisableCapture)
                                                return;

                                            phonegap.capturePicture(function(data) {
                                                var dataURL = data.dataURL;
                                                var nativeURL = data.nativeURL;
                                                $("#listImage").data("kendoMobileListView").dataSource.add({
                                                    id: helper.timestampString(),
                                                    dataURL: nativeURLx,
                                                    //nativeURL: nativeURL
                                                });
                                            });
                                            
                                            //$("#listImage").data("kendoMobileListView").dataSource.add({
                                            //    id: helper.timestampString(),
                                            //    dataURL: "public/images/test.jpg",
                                            //    description: ''
                                            //});
                                            //this.get('listImage').add({
                                            //                              id: helper.timestampString(),
                                            //                              dataURL: "public/images/test.jpg",
                                            //                              description: ''
                                            //                          });
                                        },
                                        refreshListImage
                                        : function() {
                                            if ($("#listImage").length > 0)
                                                $("#listImage").data("kendoMobileListView").refresh();
                                        }
                                    }),
    }
});