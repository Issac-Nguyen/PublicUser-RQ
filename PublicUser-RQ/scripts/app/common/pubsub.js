define([], function() {
    var arrSubDefect = [];
   return {
       addIntoSubDefect: function(obj) {
           arrSubDefect.push(obj);
       },       
       removeFromSubDefect: function(id) {
           for(var i = 0; i < arrSubDefect.length; i++) {
               if(arrSubDefect[i].id == id)
                   arrSubDefect.splice(i, 1);
           }
       },
       processAllInSubDefect: function(e) {
           for(var i  in arrSubDefect) {
            var item = arrSubDefect[i];
               if(item.fn)
                   (item.fn)(e);
           }
       }
   } 
});