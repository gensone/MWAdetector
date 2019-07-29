console.log("jamming change");  
screen.orientation.addEventListener("change", function (event) {event.stopImmediatePropagation();}, true); 
