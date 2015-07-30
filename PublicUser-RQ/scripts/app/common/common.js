define([], function() {
	var pixelRatio = window.devicePixelRatio || 1;
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
    var objIntervalProcessDefect;
    var objIntervalProcessSystem;
    var defectColorAfter = {red: 5};
    
    var pushPlugin = window.plugins.pushNotification;

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
        pushNotification: pushPlugin,
        //pushNotification: "",
        urlServerData: 'http://101.100.173.227:8888/api',
        colorRed: "rgba(255, 178, 178, 0.63)"
	}
});