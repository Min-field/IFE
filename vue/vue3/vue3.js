/*
* 第一种方式
* 通过模拟事件触发来实现
*/

// Observer类
function Observer(data){
    this.data = data; 
    this.children = new Array(); 
    this.parent = null; 

    this.evBus = new Event(); 
    this.walk(this.data); 
}

Observer.prototype = {
    walk: function(data){
        var that = this; 
        Object.keys(data).forEach(function(key){
            if(data.hasOwnProperty(key))
                that.define(data, key, data[key]);
        }); 
    }, 

    define: function(data, key, value){
        if(typeof value === "object"){
            var childOb = new Observer(value);
            this.children.push(childOb); 
            childOb.objName = key; 
            childOb.parent = this; 
        } 
        
        var that = this; 
        Object.defineProperty(data, key, {
            enumerable: true, 
            configurable: true, 
            get: function(){
                console.log("你访问了 " + key);
                return value; 
            }, 
            set: function(newValue){
                if(value === newValue)
                    return; 

                console.log("你设置了 " + key); 
                console.log("新的" + key + "值为 " + newValue); 
                value = newValue; 

                that.evBus.on(key); 
                // console.log(newValue); 
                if(typeof newValue === "object"){
                    // console.log(newValue); 
                    var childOb = new Observer(newValue); 
                    childOb.ObjName = key; 
                    that.children.push(childOb); 
                    childOb.parent = that; 
                } 
            }
        });
    }, 
    
    $watch: function(key, callback){
        if(!callback)
            callback = function(){
                console.log("I am " + key + "; I have been changed"); 
            };
        var ob = getObserver(this, key); 
        key = key.split(".")[key.split(".").length - 1]; 
        // console.log(ob); 
        ob.evBus.login(key, callback); 
        var termOb = ob; 
        while(ob.parent){
            var pKey = ob.key; 
            ob = ob.parent; 
            if(ob.evBus[pKey])
                ob.evBus[pKey].forEach(function(cb){
                    termOb.evBus.login(key, cb); 
                })
        }
        // console.log(this.evBus); 
    }
}

function getObserver(ob, key){
    var keys = key.split("."); 
    for(var i = 2; i < keys.length; i++){
        var attr = keys[i]; 
        ob.children.forEach(function(child){
            if(child.data.hasOwnProperty(attr))
                ob = child; 
        }); 
    }
    return ob;
}
// 事件模型，实现回调函数
// 对每个Observer都有一个事件队列
// 事件的键值对为 需要监测的属性 : 回调函数
function Event(){
    this.evBus = new Object(); 
}

Event.prototype = {
    login: function(key, callback){
        // console.log("login: "); 
        if(!this.evBus[key])
            this.evBus[key] = new Array(); 
        this.evBus[key].push(callback); 
    }, 
    on: function(key){
        if(!this.evBus[key]) 
            return; 
        this.evBus[key].forEach(function(cb){
            cb.call(); 
        }); 
    }
}

// test data
var data = {
    user: {
        name: "wufei", 
        age: "23"
    }, 
    city: "guangzhou"
}; 

var observer = new Observer(data); 
// observer.$watch("user", function(){
//     console.log("I am user"); 
// }); 

// observer.evBus["user"][0](); 
// observer.evBus.on("user"); 

observer.$watch("data.user");  
data.user = {
    age: 3, 
    name: "xx"
}; //输出 I am user; I have been changed
observer.$watch("data.user.age"); 
data.user.age = 2; //输出 I am age; I have been changed
