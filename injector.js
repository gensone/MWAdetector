function getDomain(url){
	var host;
	var dom;
	var tmp;
	try{
		if (url.indexOf("://") > -1)
			host = url.split('/')[2];
		else
			host = url.split('/')[0];
		host = host.split(':')[0];
		host = host.split('?')[0];

	 	//support for ip addresses (e.g. local web servers)	
		if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(host))
			return host;
		//we wanna block whole domain so we extract last 2 fields divide by '.'
		tmp = host.split('.');
		if (tmp.length < 2)
			throw "Domain too short";
		if (tmp.length > 2){
			dom = tmp[tmp.length-2]+'.'+tmp[tmp.length-1];
			if (tmp[tmp.length-2].length == 2 && tmp[tmp.length-1].length == 2 )
				dom = tmp[tmp.length-3]+'.'+dom;
		}
		else
			dom = host;
		if (/^[a-zA-Z0-9-.]+$/.test(dom))
			return dom;
		else {
			throw "Domain contains forbidden characters"
			return null;
		}
	}
	catch(error){
		console.log("ERROR IN CHECKING DOMAIN CORRECTNESS:" + error.toString());
		return null;
	}
}



function onError(error) {
	console.log('[CONTENT] Error in getting data from storage: ${error}');
}

function onGot(data) {
    stat = Object.values(data)[0];
    
    if (stat == null){
	stat = {"orientation":false,
	        "motion":false,
	        "light":false,
                "proximity":false,
	        "change":false,
                "position":false,
                "media":false,
                "vibration":false}
    	browser.storage.local.set({"default-settings" : stat });	    
    }
    
    /*
    0 -> Orientation
    1 -> Motion
    2 -> Light
    3 -> Proximity
    4 -> Change
    */
    if (stat.orientation){
	console.log("INJECTOR: jam orientation")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jamorientation.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (stat.motion){
	console.log("INJECTOR: jam motion")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jammotion.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (stat.light){
	console.log("INJECTOR: jam light")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jamlight.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (stat.proximity){
	console.log("INJECTOR: jam proximity")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jamproximity.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (stat.change){
	console.log("INJECTOR: jam change")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jamchange.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (stat.position){
	console.log("INJECTOR: jam position")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	jammerURL = browser.extension.getURL("jamposition.js")
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (stat.media){
	console.log("INJECTOR: jam media")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	jammerURL = browser.extension.getURL("jammedia.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (stat.vibration){
	console.log("INJECTOR: jam vibration")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	jammerURL = browser.extension.getURL("jamvibration.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    //injectDetectors();
}
function injectDefault(){
    if (or){
	console.log("INJECTOR: jam orientation")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jamorientation.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (mo){
	console.log("INJECTOR: jam motion")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jammotion.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (li){
	console.log("INJECTOR: jam light")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jamlight.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (pr){
	console.log("INJECTOR: jam proximity")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jamproximity.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (ch){
	console.log("INJECTOR: jam change")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	var jammerURL = browser.extension.getURL("jamchange.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (po){
	console.log("INJECTOR: jam position")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	jammerURL = browser.extension.getURL("jamposition.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (me){
	console.log("INJECTOR: jam media")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	jammerURL = browser.extension.getURL("jammedia.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
    if (vi){
	console.log("INJECTOR: jam vibration")	
	var jammer = document.createElement('script');
	jammer.type = 'text/javascript';
	jammer.async = false;
	jammerURL = browser.extension.getURL("jamvibration.js");
	jammer.src = jammerURL;
	root.insertBefore(jammer, root.firstChild);
    }
}

function injectDetectors() {
	console.log("INJECTOR: det1")	
	var myScript = document.createElement('script');
	myScript.type = 'text/javascript';
	myScript.async = false;
	var scriptURL = browser.extension.getURL("detector.js");
	myScript.src = scriptURL;

	//myScript.textContent = code1;
	//console.log(myScript.textContent);

	console.log("INJECTOR: det2")	
	var myScript2 = document.createElement('script');
	myScript2.type = 'text/javascript';
	myScript2.async = false;
	var scriptURL = browser.extension.getURL("propdetector.js");


	myScript2.src = scriptURL;


	(window.document.head || window.document.documentElement).appendChild(myScript);
	(window.document.head || window.document.documentElement).appendChild(myScript2);


	console.log("OK!!!!");
}

// checks if there is a custom rule for current domain, otherwise load default one
function activateJammer(){
	browser.storage.local.get(["custom-settings"]).then(
		function(data){
			stat = Object.values(data)[0];
			dom = getDomain(location.href);
			console.log(stat);
			if (dom && stat!=null){
				console.log("CURRENT DOMAIN IS: "+dom);
				if (stat[dom] != null){
				    if (stat[dom].orientation){
					console.log("INJECTOR: jam orientation")	
					var jammer = document.createElement('script');
					jammer.type = 'text/javascript';
					jammer.async = false;
					var jammerURL = browser.extension.getURL("jamorientation.js");
					jammer.src = jammerURL;
					root.insertBefore(jammer, root.firstChild);
				    }
				    if (stat[dom].motion){
					console.log("INJECTOR: jam motion")	
					var jammer = document.createElement('script');
					jammer.type = 'text/javascript';
					jammer.async = false;
					var jammerURL = browser.extension.getURL("jammotion.js");
					jammer.src = jammerURL;
					root.insertBefore(jammer, root.firstChild);
				    }
				    if (stat[dom].light){
					console.log("INJECTOR: jam light")	
					var jammer = document.createElement('script');
					jammer.type = 'text/javascript';
					jammer.async = false;
					var jammerURL = browser.extension.getURL("jamlight.js");
					jammer.src = jammerURL;
					root.insertBefore(jammer, root.firstChild);
				    }
				    if (stat[dom].proximity){
					console.log("INJECTOR: jam proximity")	
					var jammer = document.createElement('script');
					jammer.type = 'text/javascript';
					jammer.async = false;
					var jammerURL = browser.extension.getURL("jamproximity.js");
					jammer.src = jammerURL;
					root.insertBefore(jammer, root.firstChild);
				    }
				    if (stat[dom].change){
					console.log("INJECTOR: jam change")	
					var jammer = document.createElement('script');
					jammer.type = 'text/javascript';
					jammer.async = false;
					var jammerURL = browser.extension.getURL("jamchange.js");
					jammer.src = jammerURL;
					root.insertBefore(jammer, root.firstChild);
				    }
				    if (stat[dom].position){
					console.log("INJECTOR: jam position")	
					var jammer = document.createElement('script');
					jammer.type = 'text/javascript';
					jammer.async = false;
					jammerURL = browser.extension.getURL("jamposition.js")
					jammer.src = jammerURL;
					root.insertBefore(jammer, root.firstChild);
				    }
				    if (stat[dom].media){
					console.log("INJECTOR: jam media")	
					var jammer = document.createElement('script');
					jammer.type = 'text/javascript';
					jammer.async = false;
					jammerURL = browser.extension.getURL("jammedia.js")
					jammer.src = jammerURL;
					root.insertBefore(jammer, root.firstChild);
				    }
				    if (stat[dom].vibration){
					console.log("INJECTOR: jam vibration")	
					var jammer = document.createElement('script');
					jammer.type = 'text/javascript';
					jammer.async = false;
					jammerURL = browser.extension.getURL("jamvibration.js")
					jammer.src = jammerURL;
					root.insertBefore(jammer, root.firstChild);
				    }
				    
				}
				else {
					console.log("Custom rule not found for this domain");
					injectDefault()    
				}
			} 
			else {
				if (dom==null){
					console.log("CURRENT DOMAIN NOT RECOGNIZED");
				}
				else{
				    	console.log("Applying default settings ")
				    	injectDefault(); 
			    	}
			}
		}
	,onError);
injectDetectors();
}

const root = window.document.head || window.document.documentElement;

var or = false, mo=false, li=false, pr=false, ch=false, po=false, vi=false, me=false;

browser.storage.local.get(['default-settings']).then(function(data){
    stat = Object.values(data)[0];
    
    if (stat == null){
	stat = {"orientation":false,
	        "motion":false,
	        "light":false,
	        "proximity":false,
	        "change":false,
	        "position":false,
	        "media":false,
	        "vibration":false}
    	browser.storage.local.set({"default-settings" : stat });	    
    	or = false; mo = false; pr = false; ch=false; li=false; po=false; me=false; vi=false;
    }
    else{
    	or = stat.orientation; mo = stat.motion; pr = stat.proximity;
    	li = stat.light; ch = stat.change; po = stat.position; me = stat.media; vi = stat.vibration
    }
}, onError);

// DEBUG ONLY
//browser.storage.local.clear();
console.log("activating jammer");
activateJammer();
console.log("Jammers INJECTED");

var light = false;
var motion = false;
var orientation = false;
var proximity = false;
var change = false;
var position = false;
var media = false;
var vibration = false;

window.addEventListener("getChromeData", function(data) {
	if (data.detail == 'light')
		light = true;
	if (data.detail == 'proximity')
		proximity = true;
	if (data.detail == 'devicemotion')
		motion = true;
	if (data.detail == 'deviceorientation')
		orientation = true;
	if (data.detail == 'change')
		change = true;
	if (data.detail == 'position')
		position = true;
	if (data.detail == 'media')
		media = true;
	if (data.detail == 'vibration')
		vibration = true;
}, false);

browser.runtime.onMessage.addListener(msgfrompopup);


function msgfrompopup(msg) {
	browser.runtime.sendMessage({"light":light, "proximity":proximity, "motion":motion,"orientation":orientation,"change":change, "position":position, "media":media, "vibration":vibration});
}



