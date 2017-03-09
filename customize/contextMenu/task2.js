window.onload = function(){
    var contextMenu = document.getElementsByClassName("context-menu")[0];
    var stage = document.getElementsByClassName("stage")[0]; 

    stage.addEventListener("contextmenu", function(event){
        var event = event || window.event; 
        event.preventDefault(); 
        var stageCoord = {
            x: stage.clientWidth, 
            y: stage.clientHeight
        }; 
        //设置style为block的语句必须放这
        // 不然第一次计算的contextMenu的clientWidth和clientHeight为0
        // 第一次点击靠近右边界的地方会导致右键菜单跑出到stage的右边界
        contextMenu.style.display = "block"; 
        var contextMenuCoord = {
            x: contextMenu.clientWidth, 
            y: contextMenu.clientHeight
        };
       
        var left = event.clientX - stage.offsetLeft, 
            top = event.clientY - stage.offsetTop; 

        if(left + contextMenuCoord.x > stageCoord.x)
            left = left - contextMenuCoord.x; 
        if(top + contextMenuCoord.y > stageCoord.y)
            top = top - contextMenuCoord.y; 
        
        // contextMenu.style.display = "block"; 
        contextMenu.style.left = left + "px"; 
        contextMenu.style.top = top + "px"; 
    }); 

    document.body.addEventListener("click", function(){
        contextMenu.style.display = "none"; 
    }); 
}