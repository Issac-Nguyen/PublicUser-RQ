define(['../common/Utils', '../common/common'], function(Utils, common) {
    
    
    
    return {
        capturePicture: function(callback) {
            try {
                navigator.camera.getPicture(function(imageURL) {
                    window.resolveLocalFileSystemURI(imageURL, function(fileEntry) {
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
                            //The folder is created if doesn't exist
                            fileSys.root.getDirectory(common.folderImage, {
                                                          create: true,
                                                          exclusive: false
                                                      },
                                                      function(directory) {
                                                          fileEntry.moveTo(directory, Utils.timestampString() + '.jpg', function(etr) {
                                                              //alert(JSON.stringify(etr));
                                                              callback({nativeURL: etr.nativeURL, dataURL: etr.fullPath.substr(1)});
                                                          }, Utils.handleErr);
                                                      },
                                                      Utils.handleErr);
                        },
                                                 Utils.handleErr);
                    });
                }, Utils.handleErr, {
                                                quality: 20,
                                                // destinationType: navigator.camera.DestinationType.FILE_URL
                                            });
            } catch (err) {
               Utils.handleErr(err);
            }
        },
        writeImageIntoSystem: function(url, canvas, cb) {
            //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            //fileSystem.root.getFile(url, {
            //                            create: true,
            //                            exclusive: false
            //                        }, function(fileEntry) {
            window.resolveLocalFileSystemURI(url, function(fileEntry) {
                fileEntry.createWriter(function(writer) {
                    //alert(canvas.toDataURL('image/jpeg', 1));
                    writer.onwrite = function(evt) {
                        if (cb)
                            cb();
                    }
                    writer.write(Utils.convertDataURIToBlob(canvas.toDataURL('image/jpeg', 1), 'image/jpeg'));
                }, Utils.handleErr);
            }, Utils.handleErr);
            //}, Utils.handleErr);
        },
        uploadFile: function(fileuri, sb, eb) {
            var url = common.urlServerData + "/uploadFile";
            var ft = new FileTransfer();
            var options = new FileUploadOptions();

            options.fileKey = "file";
            options.fileName = 'filename.jpg'; // We will use the name auto-generated by Node at the server side.
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            options.params = { // Whatever you populate options.params with, will be available in req.body at the server-side.
                "description": "Uploaded from my phone"
            };
            //fileuri = "C:\Users\Phat\Documents\Telerik\Icenium\Simulator\Storage\Temporary\public\images\test.jpg"; 
            ft.upload(fileuri, encodeURI(url), sb, eb, options); 
        },
        downloadFile: function(fieuri, url, sb, eb, options) {
            var fileTransfer = new FileTransfer();
            var uri = encodeURI(url);

            fileTransfer.download(
                uri,
                filePath,
                sb,
                eb,
                false,
                options
                );
        },
        exitApp: function() {
            navigator.app.exitApp();
        }
    }
}
    );