define(['jQuery', 'kendo', 'underscore', 'app/views/baseView', 'app/common/sqlite', 'app/common/helper', 'app/common/common'], function($, kendo, _, baseView, database, helper, common) {
	var _kendoApplication;

	return {
		getAppObj: function() {
			return _kendoApplication;
		},
        onNotificationAPN: helper.onNotificationAPN,
		init: function() {

			kendo.UserEvents.defaultThreshold(20);
			_kendoApplication = new kendo.mobile.Application(document.body, {
				//transition: 'slide',
				useNativeScrolling: true,
				init: function() {
					var self = this;
					this.showLoading();
                    //helper.registerPushNotification();
					//database.start(function() {
                
						 //database.getAllDefectData(function(data) {
                         //     self.view().model.initDefectsList(data);
						//	 helper.handleAutoProcessDefect();
                          //   if(helper.checkInternet()) {
                                helper.getDataAjax({
                                    apiURL: common.urlServerData + '/noauthen-getInfomationInit',
                        			format: 'JSON',
                        			successCallback:function(data){
                                        console.log(data);
                                        database.initData(data, function() {
                                            self.hideLoading();
                                        });
                                        
                                    },
                        			error: function() {self.hideLoading();},
                             		//self.hideLoading();
                                });
                    
                            // }  else {
                                 //self.hideLoading();
                             //}
							
							
						// });
                    //});
					 //}, function(e){self.hideLoading();});
				}
			});

               

		},
		views: {
			defects: baseView.defectsView,
			defect: baseView.defectView,
			report: baseView.reportView,
			setting: baseView.settingView,
			newDefect: baseView.newDefectView,
			imageDetail: baseView.imageDetailView,
            imageDetailDefect: baseView.imageDetailDefectView
		}
	}
});