phantom.outputEncoding = 'utf-8'; 
var page = require('webpage').create(); 
page.open("http://baidu.com", function(status){
    console.log("here"); 
    console.log("status: " + status);
    page.evaluate(function(text){
        document.getElementById("kw").value = text; 
        document.getElementById("su").click(); 
    }, "ife");  
    // phantom.exit(); 
});

page.onConsoleMessage = function(msg){
    console.log(msg); 
}

page.onResourceReceived = function(response){
    // if(response.stage == "end"){
    //     console.log("url  " + response.url); 
    // }
    //搜索结束条件
   if (){
        page.render(render.png); 
        phantom.exit(); 
   }
}
