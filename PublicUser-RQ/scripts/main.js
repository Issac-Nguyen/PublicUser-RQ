require.config({
  paths: {
    jQuery: "libs/jquery-1.10.2.min",
    underscore: "libs/underscore-min",
    kendo: "libs/kendo.all.min",
    async: "libs/async"
  },
  shim: {
    jQuery: {
      exports: "jQuery"
    },
    kendo: {
      deps: ["jQuery"],
      exports: "kendo"
    },
    underscore: {
      exports: "underscore"
    },
    async: {
      exports: "async"
    }
  }
});

var app;

require(['app/app'], function(application) {
  app = application;

  function onDeviceReady() {
    console.log("deviceReady");
    app.init(); //now the app content is loaded after the device is ready :)
  }

  document.addEventListener("deviceready", onDeviceReady, false);
    
  //document.addEventListener("resume", function(){alert(localStorage.payload)}, false);
  //app.init();
});

//efd1e17df8ad028a4c65709c25da8b44ab1db0cc8bb2c7b2158446a29bc6553c
