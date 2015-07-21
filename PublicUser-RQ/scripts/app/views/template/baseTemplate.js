define(['./template-defect', './template-image', './template-notification'], function(templateDefect, templateImage, templateNotification) {
	return {
		templateDefect: templateDefect.text,
		templateImage: templateImage.text,
        templateNotification: templateNotification.arrNotification
	}
})