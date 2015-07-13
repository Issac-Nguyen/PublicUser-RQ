define(['kendo', '../common/UI', '../phonegap/phonegap', '../common/common', '../common/database', '../common/helper', './template/baseTemplate', './defects', './imageDetail'], function(kendo, UI, phonegap, common, database, helper, baseTemplate, defectsView, imageDetailView) {
    var isDisableCapture = false;
    var validator;

    function resetModel(obj, cb) {
        helper.resetModel(obj, {
            id: 'String',
            name: 'String',
            description: 'String'
        });
        if (cb)
            cb();
    }

    return {
        init: function(initEvt) {
            // ... init event code ...
            $("#listImage").kendoMobileListView({
                dataSource: kendo.data.DataSource.create({
                    // data: [{
                    // 	dataURL: '1'
                    // }]
                    data: []
                }),
                template: baseTemplate.templateImage,
                click: function(e) {
                    //alert(JSON.stringify(e.dataItem));
                    var item = e.dataItem;
                    imageDetailView.setDataIntoView(item);
                }
            });
            
            UI.buildDropDownList('drBuilding', {});
            UI.buildDropDownList('drCategory', {});
            UI.buildDropDownList('drSubCategory', {});
            UI.buildDropDownList('drZone', {});
            UI.buildDropDownList('drFloor', {});
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
            
           
        },

        viewModel: kendo.observable({
            id: '',
            name: '',
            description: '',
            message: 'new Defect',
            onClickCancel: function(e) {
                resetModel(this, function() {
                    $("#listImage").data("kendoMobileListView").dataSource.data([]);
                });
            },
            onClickAdd: function(e) {
                if (!validator.validate())
                    return;
                var self = this;
                var formDefect = $("#form-newDefect");
                var name = this.get('name');
                var description = this.get('description');
                var objDefect = {};
                objDefect.id = this.get('id');
                objDefect.name = name;
                objDefect.description = description;
                objDefect.defectsArr = $("#listImage").data("kendoMobileListView").dataSource.data().toJSON();
                objDefect.createdDate = helper.currentDate();
                objDefect.createdTime = helper.currentTime();
                database.insertInto('defects', objDefect, function() {
                    resetModel(self, function() {
                        $("#listImage").data("kendoMobileListView").dataSource.data([]);
                        defectsView.insertIntoListDefects(objDefect);
                        helper.goBack();
                    });
                });
            },
            addImage: function(e) {
                var self = this;

                if ($("#listImage").data("kendoMobileListView"))
                    isDisableCapture = $("#listImage").data("kendoMobileListView").dataSource.total() == common.maximumImageCapture;

                if (isDisableCapture)
                    return;

                 //phonegap.capturePicture(function(dataURL) {
                 //    alert(dataURL);
                 //    $("#listImage").data("kendoMobileListView").dataSource.add({
                 //        id: helper.timestampString(),
                 //        dataURL: dataURL
                 //    });
                 //});
                $("#listImage").data("kendoMobileListView").dataSource.add({
                    id: helper.timestampString(),
                    dataURL: "public/images/test.jpg"
                });
            },
            refreshListImage: function() {
                if($("#listImage").length > 0)
                     $("#listImage").data("kendoMobileListView").refresh();
            }
        }),
    }
});