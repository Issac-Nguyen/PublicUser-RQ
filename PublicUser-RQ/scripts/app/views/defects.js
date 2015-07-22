define(['jQuery', 'kendo', './template/baseTemplate', './defect', '../common/common', '../common/helper', '../common/pubsub', '../common/sqlite'], function($, kendo, baseTemplate, defectView, common, helper, pubsub, database) {

    //var groupedData1 = [
    //    {id: 1, name: "Sashimi salad", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 2, name: "Chirashi sushi", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 3, name: "Seaweed salad", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 4, name: "Edamame", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 5, name: "Miso soup", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 6, name: "Maguro", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 7, name: "Shake", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 8, name: "Shiromi", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 9, name: "Tekka maki", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 10, name: "Hosomaki Mix", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 11, name: "California rolls", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 12, name: "Seattle rolls", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 13, name: "Spicy Tuna rolls", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 14, name: "Ebi rolls", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 15, name: "Chicken Teriyaki", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 16, name: "Salmon Teriyaki", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 17, name: "Gohan", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 18, name: "Tori Katsu", createdDate: "07/07/2015", createdDate1: "20150707" },
    //    {id: 19, name: "Yaki Udon", createdDate: "06/07/2015", createdDate1: "20150706" }
    //];
    return {
        init: function(initEvt) {
            $("#listDefects").kendoMobileListView({
                dataSource: this.model.get('listDefects'),
                                template: baseTemplate.templateDefect,
                filterable: {
                    field: "name"
                },
                click: function(e) {
                    var item = e.dataItem;
                    defectView.setDataDetailToView(item);
                }
            });
            
            var self = this;
            
            
            helper.handleSystemTimeout(function(callback){
                var updateMsg = "";
                var arrDefect = self.model.get('listDefects').data().toJSON();
                var isChange = false;
                for(var i = 0; i < arrDefect.length; i++) {
                    var item = arrDefect[i];
                    var defectTime = common.defectColorAfter.red;
                    var newDay = Date.parse(item.createdDate + " " + item.createdTime).add({seconds: defectTime});
                    
                    if(newDay.compareTo(new Date()) <= 0 && item.color != common.colorRed) {
                         self.model.get('listDefects').at(i).color= common.colorRed;
                        isChange = true;
                        updateMsg = "UPDATE defect set color='" + common.colorRed +"' where id='"+item.id +"';";
                        
                        }
                }
                
                if(isChange)
                $("#listDefects").data("kendoMobileListView").refresh();
                
                //if(updateMsg !== "")
                    //database.executeSQL(updateMsg, undefined, helper.handlerErr);
                
                if(callback)
                callback();
            });
        },

        beforeShow: function(beforeShowEvt) {
            // ... before show event code ...
            pubsub.processAllInHandleArr(this.id, this);
        },

        show: function(showEvt) {
            // ... show event code ...
        },
        afterShow: function(e) {
            common.heightHeader = e.view.element.find('.km-header').height();
        },

        viewModel: kendo.observable({
            message: 'defects',
            listDefects: kendo.data.DataSource.create({
                    data: [],
                    group: {
                        field: "createdDate",
                        dir: "desc"
                    },
                    change: helper.processAllInSubDefect
                }),

            clickNew: function(e) {
                $("#modalview-login").kendoMobileModalView("open");
            },
            initDefectsList: function(data) {
                if(data.rows.length == 0)
                    return;
                var dataArr = [];
                for(var i = 0; i < data.rows.length; i++) {
                    var row = data.rows.item(i);
                    row.arr_image = JSON.parse(row.arr_image);
                    alert(row);
                    dataArr.push(row);
                }
                alert(JSON.stringify(dataArr));
                this.get('listDefects').data(dataArr);
            }
        }),
        insertIntoListDefects: function(objDefect) {
            this.viewModel.get('listDefects').add(objDefect);
        },

    }
});