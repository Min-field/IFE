##### 初始的想法
1. 用border-raduis和border-width实现外圈的3/4圆弧，用
   animation和transform实现外层动画
2. 内层一个粉色圆不动，上面罩一层扇形不断旋转

##### 遇到的问题及解决方案
```    
    border: 2px solid #FF298C; 
    border-radius: 50%; 
    border-left-width: 0px;
```   

希望出现的效果是3/4圆弧，但是在浏览器上的具体效果是这样的              
![]("./img/1.png")
为什么会这样，翻遍了google，找不到原因，mark一下，解决方法就是`border-left-color: transparent;`将左边框设为透明
