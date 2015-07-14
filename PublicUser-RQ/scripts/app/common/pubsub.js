define([], function() {
    var arrSubDefect = [];
    var handleArr = [];
   return {
       addIntoSubDefect: function(obj) {
           arrSubDefect.push(obj);
       },       
       addIntohandleArr: function(obj) {
           handleArr.push(obj);
       },       
       removeFromSubDefect: function(id) {
           for(var i = 0; i < arrSubDefect.length; i++) {
               if(arrSubDefect[i].id == id)
                   arrSubDefect.splice(i, 1);
           }
       },
       removeFromHandleArr: function() {
           var arrTemp = [];
           for(var i = 0; i < handleArr.length; i++) {
               if(handleArr[i].processed != 1)
                   arrTemp.push(handleArr[i]); 
           }
           
           handleArr = arrTemp;
       },
       processAllInSubDefect: function(e) {
           for(var i  in arrSubDefect) {
            var item = arrSubDefect[i];
               if(item.fn)
                   (item.fn)(e);
           }
       },
       processAllInHandleArr: function(id, obj) {
           for(var i  in handleArr) {
            var item = handleArr[i];
               if(item.id == id) {
                   item.processed = 1;
                   if(item.fn)
                       (item.fn).call(obj);
               }
           }
           this.removeFromHandleArr();
       }
   } 
});