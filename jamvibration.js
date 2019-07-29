(function(){
	navigator.vibrate = function(){
		console.log('vibration blocked');
		window.dispatchEvent(new CustomEvent('getChromeData', {detail:'vibration'}));
	}
})();
