// 模仿解决vue的动态数据绑定

function Observer(data){
    this.data = data; 
    this.watchers = new Array(); 
    this.walk(this.data); 
}

Observer.prototype = {
    walk: function(data){
        var that = this; 
        Object.keys(data).forEach(function(key){
            that.convert(key, data[key]); 
        })
    }, 

    convert: function(key, value){
        this.define(this.data, key, value); 
    }, 

    define: function(data, key, value){
        // 递归出口
        if(typeof value === "object")
            new Observer(value); 
        var dep = new Dep(); 
        Object.defineProperty(data, key, {
            enumerable: true, 
            configurable: true, 
            get: function(){
                // console.log("你访问了" + key);
                // console.log(dep); 
                // console.log(Dep.target); 
                if(Dep.target){
                    dep.addSub(Dep.target); 
                }
                // console.log("subs length"); 
                // console.log(dep.subs.length); 
                return value; 
            }, 
            set: function(newValue){
                if(value === newValue)
                    return; 

                // data[key] = newValue; 相当于又调用了一次set，无限循环
                value = newValue;
                // console.log("beforr notify"); 
                dep.notify(); 
                // console.log("after notify"); 
                if(typeof newValue === "object"){
                    new Observer(newValue);
                }
                console.log("你设置了" + key); 
                console.log("新的" + key + "为" + newValue); 
            }
        })
    }, 
    
    watch: function(key, callback){
        this.watchers.push(new Watch(this.data, key, callback)); 
    }

}

function Watch(data, key, callback){
    this.data = data;
    this.key = key; 
    this.callback = callback; 
    this.value = this.get(); 
}

Watch.prototype = {
    update: function(){
        // console.log("updating")
        var newValue = this.get(); 
        if(this.value !== newValue){
            this.value = newValue; 
            this.callback(this.value); 
        }
    }, 
    get: function(){
        Dep.target = this; 
        // console.log("xx" + Dep.target);  
        var val = this.data[this.key]; 
        // console.log("val" + val); 
        Dep.target = null; 
        return val; 
    }
}

function Dep(){
    this.subs = []; 
}

Dep.prototype = {
    addSub: function(sub){
        this.subs.push(sub); 
    },
    notify: function(){
        console.log("notifying"); 
        this.subs.forEach(function(sub){
            sub.update(); 
        })
    }
}

Dep.target = null; 


var data = {
    user: {
        name: "liangshaofeng",
        age: "24"
    },
    address: {
        city: "beijing"
    }
};

var observer = new Observer(data); 
// console.log(observer.data.user); 
// console.log(typeof observer); 
// console.log(observer.data); 
// console.log(observer.watch); 
// observer.data.user.watch("age", function(age){
//     console.log(`我的年纪变了，现在已经是：${age}岁了`);
// })
new Watch(data, "user" , function(){
    console.log("I am here"); 
})
// console.log("here"); 
