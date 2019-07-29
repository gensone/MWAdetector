function onError(error) {
	console.log('[CONTENT] Error in getting data from storage: ${error}');
}

function onGot(data) {
    stat = Object.values(data)[0];
    console.log(stat);
    stat = false;	
    if (stat){
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	var jammerURL = browser.extension.getURL("jammer.js");
	jammer.setAttribute('src', jammerURL);
	document.documentElement.appendChild(jammer);
    }
}


browser.storage.local.get(['detector-active']).then(onGot, onError);
