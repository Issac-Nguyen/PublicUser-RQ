define(["jQuery", './sqlite'], function ($, database) {
    function renderData() {
        console.log("inside callback");
    }

    function getDataAjax(options) {
        //alert(JSON.stringify(options));
        $.ajax({
            url: options.apiURL,
            dataType: options.format,
            method: options.method,
            data: options.data,
            jsonpCallback: options.jsonpCallback,
            success: options.successCallback || renderData,
            error: options.errorCallback || ajaxError,
            timeout: options.timeout
        });
    }

    function ajaxError(request, type, errorThrown) {
        var message = "There was an error with the AJAX request.\n";
        switch (type) {
            case 'timeout':
                message += "The request timed out.";
                break;
            case 'notmodified':
                message += "The request was not modified but was not retrieved from the cache.";
                break;
            case 'parsererror':
                message += "XML/Json format is bad.";
                break;
            default:
                message += "HTTP Error (" + request.status + " " + request.statusText + ").";
        }
        message += "\n";
        alert(message);
    }

    function getDataIndexedDB(model, successCallback) {
        database.selectAll(model, successCallback);
    }

    return {
        getDataAjax: getDataAjax,
        getDataIndexedDB: getDataIndexedDB
    }
});