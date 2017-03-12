function Observer(data){
    this.data = data; 
    this.parent = null; 
    this.walk(this.data); 
}

Observer.prototype = {
    walk: function(data){
        var that = this; 
        Object.keys(data).forEach(function(key){
            console.log(key); 
            if(data.hasOwnProperty(key))
                that.define(data, key, data[key]); 
        }); 
    }, 

    define: function(data, key, value){
        if(typeof value === "object"){
            console.log("hree"); 
            new Observer(value); 
        }

        Object.defineProperty(data, key, {
            enumerable: true, 
            configurable: true, 
            get: function(){
                console.log("you get " + key); 
                return value; 
            }, 
            set: function(newVal){
                if(newVal === value)
                    return; 

                value = newVal; 
                console.log("you set " + key + ". The new value is " + value); 
                 
                // that.bind(that.selector, that.data);  
                if(typeof value === "object")
                    new Observer(value); 

            }
        })
    }
}


function Vue(obj){
    this.selector = document.getElementById(obj.el.substring(1)); 
    this.data = obj.data;
    this.observer = new Observer(this.data); 
    this.observer.parent = this;    
    this.bind(this.selector, this.data); 
}

Vue.prototype = {
    bind: function(sel, data){
        var html = sel.innerHTML,  
            text = html.split(/{{.*}}/), 
            keys = html.match(/{{.*}}/g), 
            value = new Array(); 

        for(var i = 0; i < keys.length; i++)
            keys[i] = keys[i].substring(2, keys[i].length - 2); 
        
        var that = this; 
        keys.forEach(function(key){
            var path = key.split("."), 
                obj = that.data;
            console.log(obj);    
            for(var i = 0; i < path.length; i++)
                obj = obj[path[i]]; 
            value.push(obj); 
        }); 

        html = ""; 
        for(var i = 0; i < text.length; i++){
            if(i === text.length - 1)
                html += text[i]; 
            else 
                html = html + text[i] + value[i];  
        } 
        sel.innerHTML = html; 

        console.log(keys);
        console.log(value);  
        console.log(text);  
        console.log(sel.innerHTML); 
    }
}

var app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    }   
  }
});

app.data.user.age = 24; 