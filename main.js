function getUrlVars() {
	var map = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	return map;
}//from http://snipplr.com/view/19838/get-url-parameters/
var uvars = getUrlVars();
var docLoaded = function(){
if(uvars["form_submitted"] == "true") {
var aname = uvars["app_name"], aurl = uvars["inst_url"], atype = uvars["inst_type"], aver = uvars["inst_version"];
        if(atype == "zip") var atarget = uvars["target_path"];

        document.getElementById("app-form").style = "display: none;";
        var xhttp = new XMLHttpRequest(), regJSON;
        xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                        modifyAndDisplayRegistry(this.responseText);
                }
        };
        xhttp.open("GET", "https://rawgit.com/just-install/registry/master/just-install.json", true);
        xhttp.send();

} else console.log("form incomplete");
}
var modifyAndDisplayRegistry = function(registryJSON){
        var regJSON = registryJSON;
        var registry = JSON.parse(regJSON);
        console.log(registry);
}
window.onload = docLoaded;
