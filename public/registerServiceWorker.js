"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/serviceWorker.js").then(function(e){console.log("SW registered: ",e)}).catch(function(e){console.error("SW registration failed: ",e)})});
