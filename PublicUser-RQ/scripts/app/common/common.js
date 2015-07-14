define([], function() {
	var pixelRatio = window.devicePixelRatio || 1;
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
    var objIntervalProcessDefect;
    
    //var pushPlugin = window.plugins.pushNotification;
    
    var readAction = {
    identifier: 'READ_IDENTIFIER', // mandatory
    title: 'Read', // mandatory
    //activationMode: pushPlugin.UserNotificationActivationMode.Foreground, // default: Background
    destructive: false, // default: false
    authenticationRequired: false // default: false
};

// Define a new Ignore Action. Defaults are commented out
var ignoreAction = {
    identifier: 'IGNORE_IDENTIFIER',
    title: 'Ignore'
    //activationMode: pushPlugin.UserNotificationActivationMode.Background,
    //destructive: false,
    //authenticationRequired: false
};

// Define a new Delete Action. Defaults are commented out.
var deleteAction = {
    identifier: 'DELETE_IDENTIFIER',
    title: 'Delete',
    //activationMode: pushPlugin.UserNotificationActivationMode.Background,
    destructive: false,
    authenticationRequired: false
};

// Define a read category with default and minimal context actions
var readCategory = {
    identifier: 'READ_CATEGORY', // mandatory
    actionsForDefaultContext: [readAction, ignoreAction, deleteAction], // mandatory
    actionsForMinimalContext: [readAction, deleteAction]  // mandatory
};

// Define another category, with different set of actions
var otherCategory = {
    identifier: 'OTHER_CATEGORY', // mandatory
    actionsForDefaultContext: [ignoreAction, deleteAction], // mandatory
    actionsForMinimalContext: [deleteAction]  // mandatory
};

	return {
		deviceUUID: 'ID',
		pixelRatio: pixelRatio,
		windowWidth: windowWidth,
		windowHeight: windowHeight,
		heightHeader: 0,
		folderImage: 'imgDefects',
        objIntervalProcessDefect: objIntervalProcessDefect,
        intervalProcessDefect: 1000,
        maximumImageCapture: 1,
        defectsList: [],
       // pushNotification: pushPlugin,
        readCategory: readCategory,
        otherCategory: otherCategory,
        urlServerData: 'http://localhost:3000',
	}
});