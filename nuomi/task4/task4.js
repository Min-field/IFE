var page = require("webpage").create(); 
var system = require("system"); 
// console.log(0); 
if(system.args.length === 1){
    console.log("Usage: phantomjs task4.js <some keyword>"); 
    phantom.exit(); 
}

// console.log(1); 
var result = {
       code: 0, 
       msg: "",
       word: system.args[1],
       time: Date.now(), 
       dataList: []
}

// console.log(2); 
var url = "https://baidu.com/s?wd=" + result.word; 
// page.open(url, function(status){
//     page.render("baidu.png"); 
//     console.log(status); 
// })
page.open(url, function(status){
    if(status !== "success")
        doFail(); 
    else
        doSuccess(); 
}); 

function doFail(){
    result.msg = "capture failed"; 
    result.time = -1; 
    console.log(JSON.stringify(result)); 
    phantom.exit(); 
}

function doSuccess(){
    page.render("ife.png"); 
    result.time = Date.now() - result.time; 
    result.dataList = page.evaluate(function(){
        var containers = document.getElementsByClassName("c-container"); 
        var dataList = new Array(); 
        for(var i = 0; i < containers.length; i++){
            var ele = containers[i];  
            var link = ele.getElementsByClassName("t")[0].getElementsByTagName("a")[0]; 
            var abstract = ele.getElementsByClassName("c-abstract")[0] || new Object(); 
            var pic = ele.getElementsByClassName("c-img")[0]; 
            if(pic){
                pic = pic.getAttribute("src"); 
            }
            dataList.push({
                title: link.innerText || "", 
                info: abstract.innerText || "",
                link: link.getAttribute("href") || "", 
                pic: pic || ""
            });
        } 
        return dataList; 
    }); 
    result.code = 1; 
    result.msg = "capture success"; 
    console.log(JSON.stringify(result)); 
    phantom.exit();  
}

// page.onConsoleMessage = function(msg){
//     console.log(msg); 
// }

// 一个空对象的属性引用和函数调用的返回结果分别是什么