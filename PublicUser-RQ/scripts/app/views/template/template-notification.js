define([], function() {
   return {
       arrNotification: [
           {
           type: 'info',
           template: '<div class="notification-box"><span class="notification-info">${message}<span></div>'
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