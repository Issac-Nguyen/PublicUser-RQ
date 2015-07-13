define(['jQuery', 'kendo', '../common/helper'], function($, kendo, helper) {
    return {
        init: function(initEvt) {
            // ... init event code ...
            if (helper.getLocalStorage('isAutoProcessDefect')) {
                var vl = helper.getLocalStorage('isAutoProcessDefect');
                if(vl == "true")
                    vl = true;
                else
                    vl = false;
                this.model.set('isAutoProcessDefect', vl);
            }
            
            if (helper.getLocalStorage('profile')) {
                var vl = JSON.parse(helper.getLocalStorage('profile'));
                this.model.set('companyID', vl.companyID);
                this.model.set('companyPassword', vl.companyPassword);
                this.model.set('username', vl.username);
                this.model.set('email', vl.email);
                this.model.set('contactNo', vl.contactNo);
            }
            
        },

        beforeShow: function(beforeShowEvt) {
            // ... before show event code ...
        },

        show: function(showEvt) {
            // ... show event code ...
        },

        viewModel: kendo.observable({
                                        message: 'settings',
                                        isAutoProcessDefect: false,
                                        companyID: '',
                                        companyPassword: '',
                                        username: '',
                                        email: '',
                                        contactNo: '',
                                        onChangeAutoProcessDefect: function(e) {
                                            helper.handleProcessDefect(e.checked.toString());
                                            helper.setLocalStorage('isAutoProcessDefect', e.checked);
                                        },
                                        saveProfile: function(e) {
                                            var companyID = this.get('companyID');
                                            var companyPassword = this.get('companyPassword');
                                            var username = this.get('username');
                                            var email = this.get('email');
                                            var contactNo = this.get('contactNo');

                                            var objProfile = {
                                                companyID: companyID,
                                                companyPassword: companyPassword,
                                                username: username,
                                                email: email,
                                                contactNo: contactNo
                                            };

                                            helper.setLocalStorage('profile', JSON.stringify(objProfile));
                                        }
                                    }),
    }
});