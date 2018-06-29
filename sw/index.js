
// "use stricks";
// import * from 'idb';
$('#toaster').hide();


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then(function(reg) {
    if (!navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      console.log(reg.waiting);
      updateReady(reg.waiting);
      return;
    }

    if (reg.installing) {
      console.log(reg.installing);
      trackInstalling(reg.installing);
      return;
    }

    reg.addEventListener('updatefound', function() {
      trackInstalling(reg.installing);
    });
  })
  .catch(function(error) {
    console.log('Registration failed: ', error);
  });

  let refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });

  trackInstalling = (worker) =>{
    worker.addEventListener('statechange',() =>{
      if(worker.state == 'installed'){
        this.updateReady(worker);
      }
    });

  };

  updateReady = (worker) =>{
    
      $("#toaster").show("slow");

      $('#ref').on('click',() =>{
        $("#toaster").hide("slow");
        worker.postMessage({action: 'skipWaiting'});
      });

      $('#dis').on('click',() =>{
        $("#toaster").hide("slow");
      });

    };
}
