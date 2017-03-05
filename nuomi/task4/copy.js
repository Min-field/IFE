var page = require('webpage').create(); 
page.open("http://baidu.com", function(status){
    console.log("here"); 
    console.log("Status: " + status);
    if(status === "success"){
         page.includeJs("http://cdn.bootcss.com/jquery/3.1.1/jquery.slim.js", function(){
            console.log("there"); 
            page.evaluate(function(){
                $("#kw").val("ife");
                console.log("text here"); 
                console.log($("kw").value); 
                var value = document.getElementById("kw").value; 
                console.log(value); 
                document.getElementById("kw").value = "ife"; 
                console.log("wtf " + document.getElementById("kw").value); 
                $("#su").click();  
                // console.log("click here"); 
            }); 
            console.log(1); 
            console.log(2); 
            phantom.exit();
            console.log(3);  
         });
    }
}); 


page.onConsoleMessage = function(msg){
    console.log(msg);
}
page.onResourceReceived = function(response){
    // if(response.stage == "end"){
    //     page.render("render.png"); 
    //     phantom.exit(); 
    // })
    if(response.stage == "end"){
        console.log("url" + response.url); 
    }
}
