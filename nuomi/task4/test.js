var webPage = require('webpage');
var page = webPage.create();

var fs = require('fs');
//上文介绍的文件系统 输出文件需要
var path = 'url.txt';

//在PhantomJS中 执行JS函数的时候是不能直接使用Phantom的方法的。需要hook住alert方法，再使用alert来输出
page.onAlert = function(msg) {
    fs.write(path, msg, "w");
};

//引入jquery 让我们的操作更方便。
page.injectJs("jquery-1.6.1.min.js");
page.open("http://www.baidu.com", function(status) {

    //当打开成功后。输入检索内容并点击搜索
    //注意这两个按钮的的ID还是需要人为去看一下的
    console.log(status); 
    if ( status === "success" ) {
        page.evaluate(function(text) {
            $("#kw").val(text);
            $("#su").click();
        }, "hello world");
        
    }

});

//我们需要获取资源加载成功的方法并重写
//更多的phantom的方法可以参考官方链接。
page.onResourceReceived = function (res,network) {
    console.log(res.url); 
    if (res.stage == "end") {
        //我们仍然需要知道baidu搜索后的结束条件
        if (res.url.indexOf("b1.bdstatic.com")>=0) {
            //获取左边的所有标签并打印出text和链接
            page.evaluate(function() {
                var result="";
                $("#content_left a").each(function(){
                    result=result+$(this).text()+"   "+$(this).attr("href")+"\n";
                });
                alert(result);
            });

            page.render('baidu.jpeg');
            phantom.exit();
        }
    }
};