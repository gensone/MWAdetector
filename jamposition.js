(function(){
	navigator.geolocation.getCurrentPosition = function(){
		console.log('getCurrentPosition blocked');
		window.dispatchEvent(new CustomEvent('getChromeData', {detail:'position'}));};
	navigator.geolocation.watchPosition = function(){
		console.log('watchPosition blocked');
		window.dispatchEvent(new CustomEvent('getChromeData', {detail:'position'}));
}})();
