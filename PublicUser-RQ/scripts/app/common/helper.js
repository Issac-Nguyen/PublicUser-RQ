define(['./common', './resolveData', './sqlite', './pubsub', './Utils'], function(common, resolveData, database, pubsub, Utils) {
    var pushPlugin = common.pushNotification;
    var isProcessingAutoProcessDefect = false;
    
    function logAutoProcessDefect(err) {
        console.log(err);
        isProcessingAutoProcessDefect = false;
    }
    
    var AutoprocessDefect = function() {
        console.log('on');
        if(isProcessingAutoProcessDefect)
       			return;
       		isProcessingAutoProcessDefect = true;
       		database.selectCondition("defect", "status = 0", function(data) {
       		if(data.rows.length == 0)
                    return;
                var dataArr = [];
                for(var i = 0; i < data.rows.length; i++) {
                    var row = data.rows.item(i);
                    //alert(row);
                    dataArr.push(row);
                }
                alert(JSON.stringify(dataArr));
    			var obj = {data: JSON.stringify(dataArr)};
       			resolveData.getDataAjax({apiURL: common.urlServerData + "/uploadDefect",
   									format: "JSON",
   									method: "POST",
   									data: obj,
   									successCallback: function(res) {
       													if(res.result == "success")
       														console.log("success");
                                        				logAutoProcessDefect();
								   },
                                    errorCallback: logAutoProcessDefect
								});
			}, logAutoProcessDefect);
    }



    var registerProcessDefect = function() {
        common.objIntervalProcessDefect = setInterval(AutoprocessDefect, common.intervalProcessDefect);
    }

    var cancelProcessDefect = function() {
        console.log('off');
        clearInterval(common.objIntervalProcessDefect);
    }
    
    function handleSystemTimeout(fn) {
        pubsub.addIntoSystemArr(fn);
        common.objIntervalProcessSystem = setInterval(pubsub.processAllInSystemArr, common.intervalProcessSystem);
    }
   
    
    function registerPushNotification() {
        
        //pushPlugin.registerUserNotificationSettings(
    // the success callback which will immediately return (APNs is not contacted for this)
    //function(){
        pushPlugin.register(function(token)
                            {alert(token);setLocalStorage('token', token);}
                            , Utils.handleErr,
                            {"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
    //},
    // called in case the configuration is incorrect
    //Utils.handleErr,
    //{
            // asking permission for these features
      //      types: [
        //        pushPlugin.UserNotificationTypes.Alert,
          //      pushPlugin.UserNotificationTypes.Badge,
          //      pushPlugin.UserNotificationTypes.Sound
          //  ],
            // register these categories
          //  categories: [
          //      common.readCategory,
          //      common.otherCategory
          //  ]
   // }
//);
        
        
    }
    
    function onNotificationAPN(e) {
        
        		alert(JSON.stringify(e));
            }
    
    
    
    
    
    function handleProcessDefect(onOff) {
        onOff = onOff == "true"? 1 : 0;
        if (onOff)
            registerProcessDefect();
        else
            cancelProcessDefect();
    }
    
    function handleAutoProcessDefect() {
        if (getLocalStorage('isAutoProcessDefect')) {
            handleProcessDefect(getLocalStorage('isAutoProcessDefect'));
        }
    }
    
    function checkInternet() {

        var networkState = navigator.connection.type;

        if(networkState == Connection.NONE) {

            //onConnexionError();
            return false;

        } else {

           return true;
        }
    }
    
     function uploadDefectToServer(data, sb) {
            resolveData.getDataAjax({ 
                apiURL: common.urlServerData + "/uploadDefect",
                data: data,
                method: "POST",
                format: "json",
                successCallback: sb,
                errorCallback: Utils.handleErr
            });
    }
    
    function gotoURL(url) {
        app.getAppObj().navigate(url);
    }

    return {
        initDrawonCanvas: function(canvasID) {
            var canvas = document.getElementById(canvasID);
            var height = common.windowHeight - common.heightHeader - 10;
            canvas.width = common.windowWidth;
            canvas.height = height;
            //canvas.width = 100;
            //canvas.height = 100;
            var context = canvas.getContext("2d");
            context.strokeStyle = "#ff0000";
            context.lineJoin = "round";
            context.lineWidth = 5;

            var clickX = [];
            var clickY = [];
            var clickDrag = [];
            var paint;

            /**
             * Add information where the user clicked at.
             * @param {number} x
             * @param {number} y
             * @return {boolean} dragging
             */
            function addClick(x, y, dragging) {
                clickX.push(x);
                clickY.push(y);
                clickDrag.push(dragging);
            }

            /**
             * Redraw the complete canvas.
             */
            function redraw() {
                // Clears the canvas
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);

                for (var i = 0; i < clickX.length; i += 1) {
                    if (!clickDrag[i] && i == 0) {
                        context.beginPath();
                        context.moveTo(clickX[i], clickY[i]);
                        context.stroke();
                    } else if (!clickDrag[i] && i > 0) {
                        context.closePath();

                        context.beginPath();
                        context.moveTo(clickX[i], clickY[i]);
                        context.stroke();
                    } else {
                        context.lineTo(clickX[i], clickY[i]);
                        context.stroke();
                    }
                }
            }

            /**
             * Draw the newly added point.
             * @return {void}
             */
            function drawNew() {
                var i = clickX.length - 1
                if (!clickDrag[i]) {
                    if (clickX.length == 0) {
                        context.beginPath();
                        context.moveTo(clickX[i], clickY[i]);
                        context.stroke();
                    } else {
                        context.closePath();

                        context.beginPath();
                        context.moveTo(clickX[i], clickY[i]);
                        context.stroke();
                    }
                } else {
                    context.lineTo(clickX[i], clickY[i]);
                    context.stroke();
                }
            }

            function mouseDownEventHandler(e) {
                paint = true;
                var x = e.pageX - canvas.offsetLeft;
                var y = e.pageY - canvas.offsetTop;
                if (paint) {
                    addClick(x, y, false);
                    drawNew();
                }
            }

            function touchstartEventHandler(e) {
                paint = true;
                if (paint) {
                    addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, false);
                    drawNew();
                }
            }

            function mouseUpEventHandler(e) {
                context.closePath();
                paint = false;
            }

            function mouseMoveEventHandler(e) {
                var x = e.pageX - canvas.offsetLeft;
                var y = e.pageY - canvas.offsetTop;
                if (paint) {
                    addClick(x, y, true);
                    drawNew();
                }
            }

            function touchMoveEventHandler(e) {
                if (paint) {
                    addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, true);
                    drawNew();
                }
            }

            function setUpHandler(isMouseandNotTouch, detectEvent) {
                removeRaceHandlers();
                if (isMouseandNotTouch) {
                    canvas.addEventListener('mouseup', mouseUpEventHandler);
                    canvas.addEventListener('mousemove', mouseMoveEventHandler);
                    canvas.addEventListener('mousedown', mouseDownEventHandler);
                    mouseDownEventHandler(detectEvent);
                } else {
                    canvas.addEventListener('touchstart', touchstartEventHandler);
                    canvas.addEventListener('touchmove', touchMoveEventHandler);
                    canvas.addEventListener('touchend', mouseUpEventHandler);
                    touchstartEventHandler(detectEvent);
                }
            }

            function mouseWins(e) {
                setUpHandler(true, e);
            }

            function touchWins(e) {
                setUpHandler(false, e);
            }

            function removeRaceHandlers() {
                canvas.removeEventListener('mousedown', mouseWins);
                canvas.removeEventListener('touchstart', touchWins);
            }

            canvas.addEventListener('mousedown', mouseWins);
            canvas.addEventListener('touchstart', touchWins);
        },
        drawImageOnCanvas: function(dataURL, canvasID) {
            var angle = 0;
            var img = new Image();
            var self = this;
            img.src = dataURL;
            var width = common.windowWidth,
                height = common.windowHeight - common.heightHeader - 10;
            img.width = width;
            img.height = height;
            var canvas = document.getElementById(canvasID);
            var context = canvas.getContext("2d");
            //context.rotate(0.5 * Math.PI);
            img.onload = function() {
                context.drawImage(img, 0, 0, width, height);
                //context.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
                setTimeout(function() {
                    angle += 90;
                    self.drawRotated(canvas, img, angle);
                }, 0);
            }
        },
        drawRotated: function(canvas, image, degrees) {
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);

            // save the unrotated context of the canvas so we can restore it later
            // the alternative is to untranslate & unrotate after drawing
            context.save();

            // move to the center of the canvas
            context.translate(canvas.width / 2, canvas.height / 2);

            // rotate the canvas to the specified degrees
            context.rotate(degrees * Math.PI / 180);

            // draw the image
            // since the context is rotated, the image will be rotated also
            context.drawImage(image, -image.height / 2, -image.width / 2, canvas.height, canvas.width);

            // we’re done with the rotating so restore the unrotated context
            context.restore();
        },
        handleProcessDefect: handleProcessDefect,
        goBack: function() {
            app.getAppObj().navigate("#:back");
        },
        destroyCurrentView: function() {
            app.getAppObj().view().destroy();
        },
        resetModel: function(VM, options, cb) {
            if (!options)
                return;
            for (i in options) {
                switch (options[i]) {
                    case "String":
                        VM.set(i, '');
                        break;
                    case "Number":
                        VM.set(i, 0);
                        break;
                    case "Array":
                        VM.set(i, []);
                        break;
                }
            }
            if (cb)
                cb();
        },
        handleAutoProcessDefect: handleAutoProcessDefect,
        processAllInSubDefect: pubsub.processAllInSubDefect,
        addIntoSubDefect: pubsub.addIntoSubDefect,
        removeFromSubDefect: pubsub.removeFromSubDefect,
        checkInternet: checkInternet,
        getDataAjax: resolveData.getDataAjax,
        registerPushNotification: registerPushNotification,
        uploadDefectToServer: uploadDefectToServer,
        handleSystemTimeout:handleSystemTimeout,
        gotoURL: gotoURL,
        onNotificationAPN: onNotificationAPN,
    }
});