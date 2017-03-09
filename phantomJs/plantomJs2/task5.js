var page = require("webpage").create(); 
var system = require("system"); 

if(system.args.length !== 3){
    console.log("Usage: phantomjs task4.js <some keyword> <service(iphone5 | iphone6 |ipad)>"); 
    phantom.exit(); 
}

var services = new Array(); 
services["iphone5"] = {
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    width: 320, 
    height: 568
}; 
services["iphone6"] = {
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    width: 375, 
    height: 667
}
services["iphone6"] = {
    userAgent: "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    width: 768, 
    height: 1024
}

page.settings.userAgent = services[system.args[2]].userAgent; 
page.viewportSize = {
    width: services[system.args[2]].width, 
    height: services[system.args[2]].height
}; 
page.clipRect = {
    top: 0, 
    left: 0, 
    width: services[system.args[2]].width, 
    height: services[system.args[2]].height
}
var result = {
       service: system.args[2],
       code: 0, 
       msg: "",
       word: system.args[1],
       time: Date.now(), 
       dataList: []
}

var url = "https://baidu.com/s?wd=" + result.word; 

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
            var link = ele.getElementsByClassName("t")[0]; 
            link = link ? link.getElementsByTagName("a")[0] : new Object();  
            var abstract = ele.getElementsByClassName("c-abstract")[0] || new Object(); 
            var pic = ele.getElementsByClassName("c-img")[0]; 
            if(pic){
                pic = pic.getAttribute("src"); 
            }
            dataList.push({
                title: link.innerText || "", 
                info: abstract.innerText || "",
                link: link.getAttribute ? link.getAttribute("href") : "", 
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

page.onConsoleMessage = function(msg){
    console.log(msg); 
}

// 一个空对象的属性引用和函数调用的返回结果分别是什么

// 这里只是用了网址拼凑的方式爬取了百度搜索的第一页
// 另一种思路是模仿人机交互在百度首页输入关键字并且敲击enter
// 遇到的问题是如何判断点击百度一下之后接受的包完全结束
// 由于是同一个网址，所以没有触发pageFinish的事件
// 一种想法是用一个count来计算请求数，接受包结束后count--， 
// 用sourceReceive和sourceAccpect事件来实现
// 但是不明确具体的发包，收包机制，这种实现方式不成熟，做个mark，之后解决\




//新问题： 
// 用不同设备访问出来的标签类可能不同