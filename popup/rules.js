function onError(error){
	console.log('[RULESLIST] Error in retrieving data to populate table');
}

function deleteRule(key){
	var key = key.split('_')[1];
	console.log("DELETING "+key);
	browser.storage.local.get('custom-settings').then(function(data){
		stat = Object.values(data)[0];
		delete stat[key];
		browser.storage.local.set({'custom-settings' : stat});
	}, onError);
	var table = document.getElementById("rules");
	for (var i = 0, row; row = table.rows[i]; i++) {
		console.log(row.cells[0].innerHTML);
   		if (row.cells[0].innerHTML.substring(3, row.cells[0].innerHTML.length-4) == key){
			table.deleteRow(i);
		}
   	}  
}

function cleanTable() {
	browser.storage.local.remove(['custom-settings']);
        var rowCount = document.getElementById('rules').rows.length;
        for (var i = rowCount - 1; i > 1; i--) {
            document.getElementById('rules').deleteRow(i);
        }
    }

function populateTable(){
	browser.storage.local.get(["default-settings"]).then( function(data){
		stat = Object.values(data)[0];
		row = "<tr><td><b>Default</b></td>";
		if (stat.orientation)
			row = row + "<td>Blocked</td>"
		else
			row = row + "<td>Allowed</td>"
		if (stat.motion)
			row = row + "<td>Blocked</td>"
		else
			row = row + "<td>Allowed</td>"
		if (stat.light)
			row = row + "<td>Blocked</td>"
		else
			row = row + "<td>Allowed</td>"
		if (stat.proximity)
			row = row + "<td>Blocked</td>"
		else
			row = row + "<td>Allowed</td>"
		if (stat.change)
			row = row + "<td>Blocked</td>"
		else
			row = row + "<td>Allowed</td>"
		if (stat.position)
			row = row + "<td>Blocked</td>"
		else
			row = row + "<td>Allowed</td>"
		if (stat.media)
			row = row + "<td>Blocked</td>"
		else
			row = row + "<td>Allowed</td>"
		if (stat.vibration)
			row = row + "<td>Blocked</td>"
		else
			row = row + "<td>Allowed</td>"
	
		row = row + "<td></td></tr>"
		var r = document.getElementById('rules').insertRow();
		r.innerHTML = row;
	},onError);

	browser.storage.local.get(["custom-settings"]).then( function(data){
		stat = Object.values(data)[0];
		var i=2;
		for (var key in stat){	
			row = "<tr><td><b>"+key+"</b></td>";
			if (stat[key].orientation)
				row =row + "<td>Blocked</td>"
			else
				row = row + "<td>Allowed</td>"
			if (stat[key].motion)
				row = row + "<td>Blocked</td>"
			else
				row = row + "<td>Allowed</td>"
			if (stat[key].light)
				row = row + "<td>Blocked</td>"
			else
				row = row + "<td>Allowed</td>"
			if (stat[key].proximity)
				row = row + "<td>Blocked</td>"
			else
				row = row + "<td>Allowed</td>"
			if (stat[key].change)
				row = row + "<td>Blocked</td>"
			else
				row = row + "<td>Allowed</td>"
			if (stat[key].position)
				row = row + "<td>Blocked</td>"
			else
				row = row + "<td>Allowed</td>"
			if (stat[key].media)
				row = row + "<td>Blocked</td>"
			else
				row = row + "<td>Allowed</td>"
			if (stat[key].vibration)
				row = row + "<td>Blocked</td>"
			else
				row = row + "<td>Allowed</td>"
			row = row + "<td><button class='deletebutton' id='"+i+"_"+key+"'>DEL</button></td></tr>"
			
			var r = document.getElementById('rules').insertRow();
			r.innerHTML = row;
			var arg = i +'_'+ key;
			console.log(row);
			document.getElementById(arg).addEventListener('click', function() {deleteRule(this.id)}, false);
			i=i+1;
		}
	},onError);
	
}
var deleted = 0;

document.addEventListener('DOMContentLoaded', function() {
	populateTable();
	console.log("populated");
	document.getElementById("clearall").addEventListener('click', function() {cleanTable();}); 

});

