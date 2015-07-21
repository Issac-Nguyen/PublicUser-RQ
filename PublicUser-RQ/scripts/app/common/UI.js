define(['kendo', 'jQuery', '../views/template/baseTemplate'], function(kendo, $, baseTemplate) {
    
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
    
    function showNotification(options) {
        var notification;
        if($("#notification-view").length > 0) {
            notification = $("#notification");
        }
        else {
            notification = '<span id="notification" style="display:none;"></span>';
            $('.km-content').append(notification);
            notification = $("#notification");
        }
            
        notification = notification.kendoNotification({
                        position: {
                            pinned: true,
                            top: 30,
                            right: 30
                        },
                        autoHideAfter: 0,
                        stacking: "down",
                        templates: baseTemplate.templateNotification

                    }).data("kendoNotification");
       
        notification.show({
                            message: options.message
                        }, options.type);
    }
    
    return {
        buildDropDownList: buildDropDownList,
        buildDatepicker: buildDatepicker,
        showNotification: showNotification
    }
});