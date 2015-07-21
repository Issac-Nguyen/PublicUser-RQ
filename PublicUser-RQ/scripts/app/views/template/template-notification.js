define([], function() {
   return {
       arrNotification: [
           {
           type: 'info',
           template: '<h4>Info</h4><b>${message}</b>'
           },
           {
           type: 'warning',
           template: '<h4>Warning</h4><b>${message}</b>'
           },
           {
           type: 'error',
           template: '<h4>Error</h4><b>${message}</b>'
           },
       ]
   }
})