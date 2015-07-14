define(["jQuery", './database'], function($, database) {
	function renderData() {
		console.log("inside callback");
	}

	function getDataAjax(options) {
		$.ajax({
			url: options.apiURL,
			dataType: options.format,
			method: options.method,
            data: options.data,
			jsonpCallback: options.jsonpCallback,
			success: options.successCallback || renderData,
			error: options.errorCallback,
			timeout: options.timeout
		});
	}

	function getDataIndexedDB(model, successCallback) {
		database.selectAll(model, successCallback);
	}

	return {
		getDataAjax: getDataAjax,
		getDataIndexedDB: getDataIndexedDB
	}
});