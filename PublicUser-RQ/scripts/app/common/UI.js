define(['kendo', 'jQuery'], function(kendo, $) {
    
    function buildDropDownList(id, options) {
        $('#' + id).kendoDropDownList(options);
    }
    
     //$("#color").kendoDropDownList({
     //                   dataTextField: "text",
     //                   dataValueField: "value",
     //                   dataSource: data,
     //                   index: 0,
     //                   change: onChange
     //               });
    
    function buildDatepicker(id, options) {
        $("#" + id).kendoDatePicker(options);
    }
    
    return {
        buildDropDownList: buildDropDownList,
        buildDatepicker: buildDatepicker
    }
});