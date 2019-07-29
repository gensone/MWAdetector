/*
const values = {
  'orientation': true,
  'motion': true,
  'light': true,
  'proximity':true,
  'change':true	
};
*/
var values = {};
allow = "<p class=\"all\">ALLOWED</p>";
block = "<p class=\"block\">BLOCKED</p>";
var domain;

var or = false; var mo = false; var li=false; var pr=false; var ch=false; var po=false; var vi=false; var me=false;


function response(res){
	//console.log("RESPONSE FROM CONTENT");
	var changed = false;
	if (res.change || res.orientation || res.motion || res.light || res.proximity || res.position || res.media || res.vibration){
		
		if (res.change){ ch = true;} 
		if (res.orientation){ or=true;}
		if (res.motion){ mo=true;}
		if (res.light){ li=true;}
		if (res.proximity){ pr=true;}
		if (res.position){ po=true;}
		if (res.media){ me=true;}
		if (res.vibration){ vi=true;}

	}
	updateResultsPage();
}

function updateResultsPage(){

	if (or || mo || ch || pr || li){
		
		console.log("USED:");
		console.log("or "+or);
		console.log("mot "+mo);
		console.log("lig "+li);
		console.log("prox "+pr);
		console.log("chan "+ch);
		console.log("pos "+po);
		console.log("media "+me);
		console.log("vibr "+vi);
		
		document.getElementById("callsdetectedtitle").innerHTML = "<h5> Current website is collecting information about:</h5>";
		par = "<p class=\"callsused\">";
		if (or)
			par = par + "DEVICE ORIENTATION<br>";
		if (mo)
			par = par + "DEVICE MOTION<br>";
		if (li)
			par = par + "AMBIENT LIGHT<br>";
		if (pr)
			par = par + "PROXIMITY SENSOR<br>";
		if (ch)
			par = par + "SCREEN ORIENTATION CHANGES<br>";
		if (po)
			par = par + "POSITION<br>";
		if (me)
			par = par + "MEDIA<br>";
		if (vi)
			par = par + "VIBRATION<br>";

		document.getElementById("callsdetected").innerHTML = par+"</p>";
	}
	else {
		document.getElementById("callsdetectedtitle").innerHTML = "<h5> Current website isn't using any dangerous call</h5>";
	}
			
stat = browser.storage.local.get(["default-settings"]);
stat.then(readStatus, onError);
}


function onError(error) {
  console.log('[POPUP] Error in getting data from storage: ${error}');
}


function readStatus(data){
	stat = Object.values(data)[0];
	console.log("CURRENT STATUS:");
	console.log("or "+stat.orientation);
	console.log("mot "+stat.motion);
	console.log("lig "+stat.light);
	console.log("prox "+stat.proximity);
	console.log("chan "+stat.change);
	console.log("pos "+stat.position);
	console.log("media "+stat.media);
	console.log("vibr "+stat.vibration);
	
	if (stat.orientation)
    		document.getElementById('ord').checked = true;

	if (stat.motion)
    		document.getElementById("mod").checked = true;
	
	if (stat.light)
    		document.getElementById("lid").checked = true;
	
	if (stat.proximity)
    		document.getElementById("prd").checked = true;
	
	if (stat.change)
    		document.getElementById("chd").checked = true;
	if (stat.position)
    		document.getElementById("pod").checked = true;
	if (stat.media)
    		document.getElementById("med").checked = true;
	if (stat.vibration)
    		document.getElementById("vid").checked = true;
}

function setDefault(data){

	stat = Object.values(data)[0];
	console.log("SETTING DEFAULT");

	if (stat){
		if (document.getElementById('ord').checked){
			stat.orientation = true;
		}
		else{
			stat.orientation = false;
		}
		if (document.getElementById('mod').checked){
			stat.motion = true;
		}
		else{
			stat.motion = false;
		}
		if (document.getElementById('lid').checked){
			stat.light = true;
		}
		else{
			stat.light = false;
		}
		if (document.getElementById('prd').checked){
			stat.proximity = true;
		}
		else{
			stat.proximity = false;
		}
		if (document.getElementById('chd').checked){
			stat.change = true;
		}
		else{
			stat.change = false;
		}
		if (document.getElementById('pod').checked){
			stat.position = true;
		}
		else{
			stat.position = false;
		}
		if (document.getElementById('med').checked){
			stat.media = true;
		}
		else{
			stat.media = false;
		}
		if (document.getElementById('vid').checked){
			stat.vibration = true;
		}
		else{
			stat.vibration = false;
		}
	}
	browser.storage.local.set({"default-settings" : stat });
}

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
		}
	}
	catch(error){
		console.log("ERROR IN CHECKING DOMAIN CORRECTNESS:" + error.toString());
		return null;
	}
}

function setCustom(data){
	dom = getDomain(document.getElementById('custdom').value);
	stat = Object.values(data)[0];
	if (stat == null){
		stat = {}
		console.log('no custom settings, adding: '+dom);
		stat[dom] = {
			"orientation": document.getElementById("or").checked,
			"motion": document.getElementById("mo").checked,
			"light": document.getElementById("li").checked,
			"proximity": document.getElementById("pr").checked,
			"change": document.getElementById("ch").checked,		
			"position": document.getElementById("po").checked,		
			"media": document.getElementById("me").checked,		
			"vibration": document.getElementById("vi").checked		
		       }
		browser.storage.local.set({"custom-settings" : stat});
		console.log("ADDED DOM, EMPTY DICT");
	return;
	}
	else{
		console.log(dom);
		console.log(JSON.stringify(stat));
		stat[dom] = {
			"orientation": document.getElementById("or").checked,
			"motion": document.getElementById("mo").checked,
			"light": document.getElementById("li").checked,
			"proximity": document.getElementById("pr").checked,
			"change": document.getElementById("ch").checked,		
			"position": document.getElementById("po").checked,		
			"media": document.getElementById("me").checked,		
			"vibration": document.getElementById("vi").checked		
		       }
		browser.storage.local.set({"custom-settings" : stat});
		console.log("ADDED DOM");
	return;
	}
	
}


function defaultsubmission(){
			
	stat = browser.storage.local.get(["default-settings"]);
	stat.then(setDefault, onError);

}


function customsubmission(){
	dom = getDomain(document.getElementById("custdom").value);
	if (dom == null)
		document.getElementById('domainresponse').innerHTML = "Domain not valid, please insert a correct one<br>";
	else{
		stat = browser.storage.local.get(["custom-settings"]);
		stat.then(setCustom, onError);
		console.log(JSON.stringify(stat));
		document.getElementById('domainresponse').innerHTML = "Added domain: <span class='domainname'>"+dom+"</span><br>";
		}
}

function updateBlockedCalls(){
		browser.storage.local.get(["custom-settings"]).then(
		function(data){
			stat = Object.values(data)[0];
			if (stat!=null){
				browser.tabs.query({active: true, currentWindow: true}, function(tabs){
				console.log("Url: "+tabs[0].id);
				dom = getDomain(tabs[0].url);
				if (dom!=null){
					if (stat[dom] != null){
						console.log(JSON.stringify(stat[dom]));
						//document.getElementById('custdom').placeholder = dom;
						act = "";

						if (stat[dom].orientation){
							act = act + "DEVICE ORIENTATION<br>";
							document.getElementById('or').checked = true;
						}
						if (stat[dom].motion){
							act = act + "DEVICE MOTION<br>";
							document.getElementById('mo').checked = true;
						}
						if (stat[dom].light){
							act = act + "AMBIENT LIGHT<br>";
							document.getElementById('li').checked = true;
						}
						if (stat[dom].proximity){
							act = act + "PROXIMITY SENSOR<br>";
							document.getElementById('pr').checked = true;
						}
						if (stat[dom].change){
							act = act + "SCREEN ORIENTATION CHANGE<br>";
							document.getElementById('ch').checked = true;
						}
						if (stat[dom].position){
							act = act + "POSITION<br>";
							document.getElementById('po').checked = true;
						}
						if (stat[dom].media){
							act = act + "MEDIA<br>";
							document.getElementById('me').checked = true;
						}
						if (stat[dom].vibration){
							act = act + "VIBRATION<br>";
							document.getElementById('vi').checked = true;
						}
						if (act == "")
							act = "<h5>Custom rule for <span class='domainname'>"+dom+"</span>: no data retrival blocked<h5>";
						else
							act = "<h5>Custom rule for <span class='domainname'>"+dom+"</span>: data retrieval blocked for:</h5> <p>"+act+"</p>";
						document.getElementById('rulesenforced').innerHTML = act;
					}
					else{
						browser.storage.local.get(["default-settings"]).then(function(data){
						stat = Object.values(data)[0];
						act = "";
						if (stat.orientation){
							act = act + "DEVICE ORIENTATION<br>";
						}
						if (stat.motion){
							act = act + "DEVICE MOTION<br>";
						}
						if (stat.light){
							act = act + "AMBIENT LIGHT<br>";
						}
						if (stat.proximity){
							act = act + "PROXIMITY SENSOR<br>";
						}
						if (stat.change){
							act = act + "SCREEN ORIENTATION CHANGE<br>";
						}
						if (stat.position){
							act = act + "POSITION<br>";
						}
						if (stat.media){
							act = act + "MEDIA<br>";
						}
						if (stat.vibration){
							act = act + "VIBRATION<br>";
						}
						if (act == "")
							act = "<h5>Custom rule for <span class='domainname'>"+dom+"</span> not set, default enforced: no data retrival blocked<h5>";
						else
							act = "<h5>Custom rule for <span class='domainname'>"+dom+"</span> not set, data retrieval blocked for:</h5> <p>"+act+"</p>";

						document.getElementById('rulesenforced').innerHTML = act;	
						//document.getElementById('custdom').placeholder = dom;
						});
					}
				}
				else{
					console.log("ERROR getting domain from tabs");
				}
				});
				}
			else{
	    			console.log("NO CUSTOM SETTINGS, EMPTY");	
				browser.tabs.query({active: true, currentWindow: true}, function(tabs){
						console.log("Url: "+tabs[0].id);
						dom = getDomain(tabs[0].url);
						browser.storage.local.get(["default-settings"]).then(function(data){
							stat = Object.values(data)[0];
						act = "";
						if (stat.orientation){
							act = act + "DEVICE ORIENTATION<br>";
						}
						if (stat.motion){
							act = act + "DEVICE MOTION<br>";
						}
						if (stat.light){
							act = act + "AMBIENT LIGHT<br>";
						}
						if (stat.proximity){
							act = act + "PROXIMITY SENSOR<br>";
						}
						if (stat.change){
							act = act + "SCREEN ORIENTATION CHANGE<br>";
						}
						if (stat.position){
							act = act + "POSITION<br>";
						}
						if (stat.media){
							act = act + "MEDIA<br>";
						}
						if (stat.vibration){
							act = act + "VIBRATION<br>";
						}
						if (act == "")
							act = "<h5>Custom rule for <span class='domainname'>"+dom+"</span> not set, default enforced: no data retrival blocked<h5>";
						else
							act = "<h5>Custom rule for <span class='domainname'>"+dom+"</span> not set, data retrieval blocked for:</h5> <p>"+act+"</p>";

						document.getElementById('rulesenforced').innerHTML = act;	
						///document.getElementById('custdom').placeholder = dom;
						});
				});
			 }
		});
}


function getCurrentDomain(){
	document.getElementById("custdom").value = domain;
}

/*
function Orientation(data) {
    stat = Object.values(data)[0];
    console.log(stat);
    
    if (!stat.orientation){
        stat.orientation = true;
	browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statusorientation").innerHTML = block;
    }
    else if (stat.orientation){
	stat.orientation = false;
        browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statusorientation").innerHTML = allow;
    }
return;
}

function Motion(data) {
    stat = Object.values(data)[0];
    console.log(stat);
    
    if (!stat.motion){
        stat.motion = true;
	browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statusmotion").innerHTML = block;
    }
    else if (stat.motion){
	stat.motion = false;
        browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statusmotion").innerHTML = allow;
    }
return;
}

function Light(data) {
    stat = Object.values(data)[0];
    console.log(stat);
    
    if (!stat.light){
        stat.light = true;
	browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statuslight").innerHTML = block;
    }
    else if (stat.light){
	stat.light = false;
        browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statuslight").innerHTML = allow;
    }
return;
}

function Proximity(data) {
    stat = Object.values(data)[0];
    console.log(stat);
    
    if (!stat.proximity){
        stat.proximity = true;
	browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statusproximity").innerHTML = block;
    }
    else if (stat.proximity){
	stat.proximity = false;
        browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statusproximity").innerHTML = allow;
    }
return;
}


function Change(data) {
    stat = Object.values(data)[0];
    console.log(stat);
    
    if (!stat.change){
        stat.change = true;
	browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statuschange").innerHTML = block;
    }
    else if (stat.change){
	stat.change = false;
        browser.storage.local.set({"detector-active" : stat });
    	document.getElementById("statuschange").innerHTML = allow;
    }
return;
}

function onError(error) {
  console.log('[POPUP] Error in getting data from storage: ${error}');
}


function toggleorientation() {
	stat = browser.storage.local.get(["detector-active"]);
	stat.then(Orientation, onError);
return;
};

function togglemotion() {
	stat = browser.storage.local.get(["detector-active"]);
	stat.then(Motion, onError);
return;
};

function togglelight() {
	stat = browser.storage.local.get(["detector-active"]);
	stat.then(Light, onError);
return;
};

function toggleproximity() {
	stat = browser.storage.local.get(["detector-active"]);
	stat.then(Proximity, onError);
return;
};

function togglechange() {
	stat = browser.storage.local.get(["detector-active"]);
	stat.then(Change, onError);
return;
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('activator_orientation').addEventListener('click', toggleorientation);
  document.getElementById('activator_motion').addEventListener('click', togglemotion);
  document.getElementById('activator_light').addEventListener('click', togglelight);
  document.getElementById('activator_proximity').addEventListener('click', toggleproximity);
  document.getElementById('activator_change').addEventListener('click', togglechange);
  //document.querySelector('button').addEventListener('click', toggle);
});
*/

document.addEventListener('DOMContentLoaded', function () {
     
	console.log("Starting main");
	updateBlockedCalls();
	
	document.getElementById("submitcust").addEventListener('click', function() {customsubmission()}, false);
	document.getElementById("submitdef").addEventListener('click', function() {defaultsubmission()},false);
	document.getElementById("geturl").addEventListener('click', function() {getCurrentDomain();},false);

	browser.runtime.onMessage.addListener(response);

	browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
		domain = getDomain(tabs[0].url);
		chrome.tabs.sendMessage(tabs[0].id,{
		    "text": "dummy"
	    });
	});
	
	console.log("JS executed");

});
