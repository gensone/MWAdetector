(function(){navigator.mediaDevices.getUserMedia = function(){console.log('getUserMedia blocked');window.dispatchEvent(new CustomEvent('getChromeData', {detail:'media'}));}})();
