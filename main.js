//see my google-fu in action!
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
        var atarget = uvars["target_path"];
        document.getElementById("app-form").style = "display: none;";
        var xhttp = new XMLHttpRequest(), regJSON;
        xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                        modifyAndDisplayRegistry(this.responseText, {
				name: aname, 
				url: decodeURIComponent(aurl), 
				type: atype, 
				ver: aver, 
				target: decodeURIComponent(atarget)});
                }
        };
        xhttp.open("GET", "https://rawgit.com/just-install/registry/master/just-install.json", true);
        xhttp.send();

} else console.log("form incomplete");
}
var modifyAndDisplayRegistry = function(registryJSON, add){
        var regJSON = registryJSON;
        var registry = JSON.parse(regJSON);
        console.log(registry);
	registry.packages[add.name] = {installer: {kind: add.type, x86: add.url}, version: add.ver};
	if(add.target != "null") registry.packages[add.name].installer.options = {destination: add.target};
	document.getElementById("registry").innerHTML = orderedStringify(registry);
	hljs.highlightBlock(document.getElementById("registry"));
}
//from https://stackoverflow.com/questions/16167581/sort-object-properties-and-json-stringify#comment73545624_40646557
function orderedStringify(obj) { const allKeys = []; JSON.stringify(obj, (k, v) => { allKeys.push(k); return v; }); return JSON.stringify(obj, allKeys.sort(), 2); }
window.onload = docLoaded;
var cp2clipboard = function (element) {
	element.hidden = false;
	element.select();
	document.execCommand('copy');
	window.alert(element.id + "'s contents have been copied to your clipboard");
};
