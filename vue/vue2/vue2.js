/*
* 第一种方式
* 通过模拟事件触发来实现
*/

// Observer类
function Observer(data){
    this.data = data; 
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
        if(typeof value === "object")
            new Observer(value); 
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
                
                that.evBus.on(key); 
                if(typeof newValue === "object")
                    new Observer(value); 
            }
        });
    }, 
    
    $watch: function(key, callback){
        if(!callback)
            callback = function(){
                console.log("I am " + key + "; I have been changed"); 
            };
        this.evBus.login(key, callback); 
        console.log(this.evBus); 
    }
}

// 事件模型，实现回调函数
// 对每个Observer都有一个事件队列
// 事件的键值对为 需要监测的属性 : 回调函数
function Event(){
    this.evBus = new Object(); 
}

Event.prototype = {
    login: function(key, callback){
        console.log("login: "); 
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
