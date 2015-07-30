define(['kendo', 'async', '../common/UI', '../phonegap/phonegap', '../common/common', '../common/sqlite', '../common/helper', '../common/pubsub', './template/baseTemplate','./imageDetail', '../common/Utils'], function(kendo, async, UI, phonegap, common, database, helper, pubsub, baseTemplate, imageDetailView, Utils) {
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
            var self = this;
            
            async.parallel([function(cb){
                database.selectAll('Building', function(res){
                        var dataArr = [];
                        for(var i = 0; i < res.rows.length; i++) {
                            var item = res.rows.item(i);
                            dataArr.push(item);
                        }
                        self.model.set('dsBuilding', dataArr);
                        cb('success');
                    }, Utils.handleErr);
            },function(cb){
                database.selectAll('Category', function(res){
                        var dataArr = [];
                        for(var i = 0; i < res.rows.length; i++) {
                            var item = res.rows.item(i);
                            dataArr.push(item);
                        }
                        self.model.set('dsCategory', dataArr);
                        cb('success');
                    }, Utils.handleErr);
            },function(cb){
                database.selectAll('Department', function(res){
                        var dataArr = [];
                        for(var i = 0; i < res.rows.length; i++) {
                            var item = res.rows.item(i);
                            dataArr.push(item);
                        }
                        self.model.set('dsDepartment', dataArr);
                        cb('success');
                    }, Utils.handleErr);
            },function(cb){
                database.selectAll('Zone', function(res){
                        var dataArr = [];
                        for(var i = 0; i < res.rows.length; i++) {
                            var item = res.rows.item(i);
                            dataArr.push(item);
                        }
                        self.model.set('dsZone', dataArr);
                        cb('success');
                    }, Utils.handleErr);
            },function(cb){
                database.selectAll('SubCategory', function(res){
                        var dataArr = [];
                        for(var i = 0; i < res.rows.length; i++) {
                            var item = res.rows.item(i);
                            dataArr.push(item);
                        }
                        self.model.set('dsSubCategory', dataArr);
                        cb('success');
                    }, Utils.handleErr);
            },function(cb){
                 database.selectAll('SubDepartment', function(res){
                        var dataArr = [];
                        for(var i = 0; i < res.rows.length; i++) {
                            var item = res.rows.item(i);
                            dataArr.push(item);
                        }
                        self.model.set('dsSubDepartment', dataArr);
                        cb('success');
                    }, Utils.handleErr);
            },function(cb){
                database.selectAll('Floor', function(res){
                        var dataArr = [];
                        for(var i = 0; i < res.rows.length; i++) {
                            var item = res.rows.item(i);
                            dataArr.push(item);
                        }
                        self.model.set('dsFloor', dataArr);
                        cb('success');
                    }, Utils.handleErr);
            }], function(err, results){
                var options = {
                dataSource: self.model.get('dsBuilding'), dataTextField: "Name",
                dataValueField: "ID", optionLabel: "Select a building...",
                change: function(e) {
                    alert('change');
                }
            };
            
            UI.buildDropDownList('drBuilding', options);
            
            options = {
                dataSource: self.model.get('dsCategory'), dataTextField: "Name",
                dataValueField: "ID", optionLabel: "Select a category..."
            };
            
            UI.buildDropDownList('drCategory', options);
            
            options = {
                dataSource: self.model.get('dsSubCategory'), dataTextField: "Name",
                dataValueField: "ID", optionLabel: "Select a sub-category..."
            };
            UI.buildDropDownList('drSubCategory', options);
            
            options = {
                dataSource: self.model.get('dsDepartment'), dataTextField: "Name",
                dataValueField: "ID", optionLabel: "Select a department..."
            };
            UI.buildDropDownList('drDepartment', options);
            
            options = {
                dataSource: self.model.get('dsSubDepartment'), dataTextField: "Name",
                dataValueField: "ID", optionLabel: "Select a sub-department..."
            };
            UI.buildDropDownList('drSubDepartment', options);
            
            options = {
                dataSource: self.model.get('dsZone'), dataTextField: "Name",
                dataValueField: "ID", optionLabel: "Select a zone..."
            };
            
            UI.buildDropDownList('drZone', options);
            
             options = {
                dataSource: self.model.get('dsSubZone'), dataTextField: "Name",
                dataValueField: "ID", optionLabel: "Select a sub-zone..."
            };
            
            UI.buildDropDownList('drSubZone', options);
            
            options = {
                dataSource: self.model.get('dsFloor'), dataTextField: "Name",
                dataValueField: "ID", optionLabel: "Select a floor..."
            };
            
            UI.buildDropDownList('drFloor', options);
            
            UI.buildDatepicker('expectedCompleteDate', {format: "dd/MM/yyyy",value: new Date()});
            

            validator = $("#form-newDefect").kendoValidator().data("kendoValidator");
            });
            
            
        },

        beforeShow: function(beforeShowEvt) {
            // ... before show event code ...
        },

        show: function(showEvt) {
            // ... show event code ...
            //get id of defect
            if (this.model.get('id') == '')
                this.model.set('id', Utils.timestampString());
            
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
                                        vlDepartment: '1',
                                        vlSubDepartment: '1',
                                        vlZone: '1',
                                        vlSubZone: '1',
                                        vlFloor: '1',
                                        dsBuilding: [],
                                        dsCategory: [],
                                        dsDepartment: [],
                                        dsZone: [],
                                        dsFloor: [],
                                        dsSubCategory: [],
                                        dsSubDepartment: [],
                                        dsSubZone: [],
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
                                            objDefect.building_name = $("#drBuilding :selected").text();
                                            objDefect.category_id = this.get('vlCategory');
                                            objDefect.category_name = $("#drCategory :selected").text();
                                            objDefect.subcategory_id = this.get('vlSubCategory');
                                            objDefect.subcategory_name = $("#drSubCategory :selected").text();
                                            objDefect.zone_id = this.get('vlZone');
                                            objDefect.zone_name = $("#drZone :selected").text();
                                            objDefect.floor_id = this.get('vlFloor');
                                            objDefect.floor_name = $("#drFloor :selected").text();
                                            objDefect.expectedDate = Utils.formatDate(this.get('vlExpetedCompletedDate'));
                                            //objDefect.defectsArr = $("#listImage").data("kendoMobileListView").dataSource.data().toJSON();
                                            objDefect.arr_imageDefect = JSON.stringify(this.get('listImage').data().toJSON());
                                            objDefect.arr_imageResolve = "[]";
                                            objDefect.color = "white";
                                            objDefect.status = 0;
                                            objDefect.createdDate = Utils.formatDate();
                                            objDefect.createdTime = Utils.currentTime();
                                            ///database.insertInto("defect", objDefect, function(res) {
                                            //if(helper.checkInternet()) {
                                            //helper.uploadDefectToServer(objDefect, function(res) {
                                            //    if (res.result === 'success') {
                                                   // phonegap.uploadFile((self.get('listImage').data().toJSON())[0].dataURL, function(){
                                                        resetModel(self, function() {
                                                            objDefect.arr_imageDefect = self.get('listImage').data().toJSON();
                                                            objDefect.arr_imageResolve = [];
                                                        //defectsView.insertIntoListDefects(objDefect);
                                                            pubsub.addIntohandleArr({id: '/', fn: function() {
                                                                this.model.get('listDefects').add(objDefect);
                                                            }});
                                                        helper.goBack();
                                                    });
                                                    //}, helper.handlerErr, {});
                                            //    }
                                            //});
                                            //} else {
                                            //    resetModel(self, function() {
                                            //                defectsView.insertIntoListDefects(objDefect);
                                            //                helper.goBack();
                                            //}, Utils.handleErr);
                                            //}
                                            ///}, Utils.handleErr);
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
                                            UI.showNotification({message: 'message', type: 'error'});
                                            var self = this;

                                            //if ($("#listImage").data("kendoMobileListView"))
                                            //    isDisableCapture = $("#listImage").data("kendoMobileListView").dataSource.total() == common.maximumImageCapture;

                                            isDisableCapture = this.get('listImage').total() == common.maximumImageCapture;
                
                                            if (isDisableCapture)
                                                return;

                                            //phonegap.capturePicture(function(data) {
                                            //    var dataURL = data.dataURL;
                                            //    var nativeURL = data.nativeURL;
                                            //    $("#listImage").data("kendoMobileListView").dataSource.add({
                                            //        id: Utils.timestampString(),
                                            //        dataURL: nativeURLx,
                                                    //nativeURL: nativeURL
                                            //    });
                                            // UI.scrollTop(undefined, $("#listImage li:last-child"));
                                            //});
                                            
                                            this.get('listImage').add({
                                                                          id: Utils.timestampString(),
                                                                          dataURL: "public/images/test.jpg",
                                                                          description: ''
                                                                      });
                                            UI.scrollTop(undefined, $("#listImage li:last-child"));
                                        },
                                        refreshListImage
                                        : function() {
                                            if ($("#listImage").length > 0)
                                                $("#listImage").data("kendoMobileListView").refresh();
                                        }
                                    }),
    }
});