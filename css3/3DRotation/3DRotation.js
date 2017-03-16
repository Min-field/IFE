window.onload = function(){
    var stage = document.getElementsByClassName("container")[0], 
        oLi = stage.getElementsByTagName("li"); 

    for(var i = 0; i < oLi.length; i++){

        oLi[i].style.transform = "rotateY(" + i * 60 + "deg)" + "translateZ(300px)"; 
    }
}

// function getRandomColor(){
//     return "#" + Math.floor(Math.random() * 16777215).toString(16); 
// }