// ADD NEW ITEM TO END OF LIST
var end = document.createElement("li");
var node = document.createTextNode("Cream");
end.appendChild(node);

var element = document.getElementById("page");
element.appendChild(end);


// ADD NEW ITEM START OF LIST
var start = document.createElement("li");
var node2 = document.createTextNode("Hot Dog");
start.appendChild(node2);

var child = document.getElementsByTagName("ul").item(0);
element.insertBefore(start,child);


// ADD A CLASS OF COOL TO ALL LIST ITEMS
var list = document.getElementsByTagName("li");
Counter = 0;
for(var i = 0; i < list.length; i++){
    list.className = "Cool";
    Counter++;
    
}


// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var header2 = document.getElementsByTagName("h2").item(0);
var node = document.createTextNode(" " + Counter);
header2.appendChild(node);



