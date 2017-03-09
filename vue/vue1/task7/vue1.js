// 模仿解决vue的动态数据绑定

function Observer(data){
    this.data = data; 
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

        Object.defineProperty(data, key, {
            enumerable: true, 
            configurable: true, 
            get: function(){
                console.log("你访问了" + key);
                return value; 
            }, 
            set: function(newValue){
                if(value === newValue)
                    return; 
                data[key] = newValue; 
                console.log("你设置了" + key); 
                console.log("新的" + key + "为" + newValue); 
            }
        })
    }
}

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
// console.log("here"); 
