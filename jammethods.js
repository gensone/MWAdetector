(function(){
    navigator.geolocation.getCurrentPosition = function(){console.log('getCurrentPosition blocked');}
    navigator.geolocation.watchPosition = function(){console.log('watchPosition blocked');}
})();
(function(){
    navigator.mediaDevices.getUserMedia = function(){console.log('getUserMedia blocked');}
})();
(function(){
    navigator.vibrate = function(){console.log('vibration blocked');}
})();
