define([], function() {
	var pixelRatio = window.devicePixelRatio || 1;
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
    var objIntervalProcessDefect;
    var objIntervalProcessSystem;
    var defectColorAfter = {red: 5};
    
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
        objIntervalProcessSystem: objIntervalProcessSystem,
        intervalProcessDefect: 5000,
        intervalProcessSystem: 1000,
        defectColorAfter: defectColorAfter,
        maximumImageCapture: 2,
        defectsList: [],
        //pushNotification: pushPlugin,
        pushNotification: "",
        readCategory: readCategory,
        otherCategory: otherCategory,
        urlServerData: 'http://localhost:8888/api',
        colorRed: "rgba(255, 178, 178, 0.63)"
	}
});