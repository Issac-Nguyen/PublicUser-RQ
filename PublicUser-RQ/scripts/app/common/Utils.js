define([], function() {
    function convertDataURIToBlob (dataURI, mimetype) {
            var BASE64_MARKER = ';base64,';
            var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            var base64 = dataURI.substring(base64Index);
            var raw = window.atob(base64);
            var rawLength = raw.length;
            var uInt8Array = new Uint8Array(rawLength);
            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            // var bb = new BlobBuilder();
            // bb.append(uInt8Array.buffer);

            try {
                return new Blob([uInt8Array.buffer], {
                                    type: mimetype
                                });
            } catch (e) {
                // The BlobBuilder API has been deprecated in favour of Blob, but older
                // browsers don't know about the Blob constructor
                // IE10 also supports BlobBuilder, but since the `Blob` constructor
                //  also works, there's no need to add `MSBlobBuilder`.
                alert(e);
                var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;
                var bb = new BlobBuilder();
                bb.append(uInt8Array.buffer);
                return bb.getBlob(mimetype);
            }
            // return bb.getBlob(mimetype); 
        }
    
    function handleErr(err) {
        alert(JSON.stringify(err));
    }
    
    function setLocalStorage(pro, vl) {
        localStorage[pro] = vl;
    }
    
    function getLocalStorage(pro) {
        return localStorage[pro];
    }
    
    function gotoURL(url) {
        app.getAppObj().navigate(url);
    }
    
    function timestampString() {
            return Math.floor(Date.now());
    }
    
    function formatDate(dateOb) {
            var dateObj;
            if(dateOb)
                dateObj = dateOb;
            else
             dateObj = new Date();
            var dd = dateObj.getDate();
            var mm = dateObj.getMonth() + 1; //January is 0!
            var yyyy = dateObj.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            dateObj = dd + '/' + mm + '/' + yyyy;

            return dateObj;
        }
    
        function currentTime() {
            var time = new Date();
            var hh = time.getHours();
            var mm = time.getMinutes();
            var ss = time.getSeconds();

            if (hh < 10) {
                hh = '0' + hh;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            if (ss < 10) {
                ss = '0' + ss;
            }

            time = hh + ':' + mm + ':' + ss;

            return time;
        }
    
    return {
        convertDataURIToBlob: convertDataURIToBlob,
        handleErr: handleErr,
        setLocalStorage: setLocalStorage,
        getLocalStorage: getLocalStorage,
        timestampString: timestampString,
        formatDate: formatDate,
        currentTime: currentTime
    }
});