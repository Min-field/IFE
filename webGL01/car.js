var scene, 
    camera,
    renderer,
    light;  

function init(){
    initScene(); 
    initCamera(); 
    initRenderer(); 
    initLight(); 
    initCar(); 
    renderer.render(scene, camera);

}

function initScene(){
    scene = new THREE.Scene(); 
}

function initRenderer(){
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas"),
        antialias: true,              //抗锯齿
        precision: "highp" 
    }); 
    renderer.setClearColor(0x666666); 
}

function initCamera(){
    var canvas = document.getElementById("mainCanvas"); 
    // camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 1, 20);
    camera =  new THREE.PerspectiveCamera(50, canvas.clientWidth/canvas.clientHeight, 1, 100);
    camera.position.set(-7, 5, -9); 
    camera.lookAt(new THREE.Vector3(0, 0, 0)); 
    scene.add(camera);
}


function initCar(){
    // var material = new THREE.MeshBasicMaterial({
    //      color: 0xffff00,
    //      wireframe: true
    // }); 

    var material = new THREE.MeshNormalMaterial({
         // color: 0xffff00,
         // wireframe: true
    }); 
    // var carBody = new THREE.Mesh(new THREE.CubeGeometry(4, 3, 3), material); 
    // carBody.position.set(2, 0, 0); 
    // scene.add(carBody); 

    var carHead = rightAngleLadder(3);  
    carHead = new THREE.Mesh(carHead, material); 
    scene.add(carHead); 

    // (function addWheels(){
    //     var wheels = new Array(); 
    //     for(var i = 0; i < 4; i++){
    //         wheels.push(new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 12, 18), material));
    //         console.log(wheels[wheels.length - 1])
    //         scene.add(wheels[wheels.length - 1]);  
    //     }
    //     wheels[0].position.set(0, -1.5, 1.5); 
    //     wheels[1].position.set(2.5, -1.5, -1.5); 
    //     wheels[2].position.set(0, -1.5, -1.5); 
    //     wheels[3].position.set(2.5, -1.5, 1.5); 
    // })(); 
}

function initLight(){
    var ambientLight = new THREE.AmbientLight(0x666666); 
    scene.add(ambientLight); 
    light = new THREE.DirectionalLight(0x989898);
    light.position.set(0, 2, 5);
    scene.add(light);
}
window.onload = function(){
    init(); 
}

//直角梯形，输入下底面边长，坐标中心在底面中心
//高为底面边长的一半
//上底面边长为下底面的一半
function rightAngleLadder(x){
    var geometry = new THREE.Geometry(); 

    // 下底面4点
    geometry.vertices.push(new THREE.Vector3(0, x/2, -x/2)); 
    geometry.vertices.push(new THREE.Vector3(0, -x/2, -x/2)); 
    geometry.vertices.push(new THREE.Vector3(0, -x/2, x/2)); 
    geometry.vertices.push(new THREE.Vector3(0, x/2, x/2));

    //上底面4点
    geometry.vertices.push(new THREE.Vector3(-x/2, 0, -x/2)); 
    geometry.vertices.push(new THREE.Vector3(-x/2, -x/2, -x/2)); 
    geometry.vertices.push(new THREE.Vector3(-x/2, -x/2, x/2)); 
    geometry.vertices.push(new THREE.Vector3(-x/2, 0, x/2));

    // 上下面
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(2, 3, 0));
    geometry.faces.push(new THREE.Face3(4, 5, 6));
    geometry.faces.push(new THREE.Face3(6, 7, 4));

    // 侧面4个面  
    geometry.faces.push(new THREE.Face3(1, 2, 6));
    geometry.faces.push(new THREE.Face3(6, 5, 1));
    geometry.faces.push(new THREE.Face3(2, 3, 7));
    geometry.faces.push(new THREE.Face3(7, 6, 2));
    geometry.faces.push(new THREE.Face3(4, 0, 3));
    geometry.faces.push(new THREE.Face3(3, 7, 4));
    geometry.faces.push(new THREE.Face3(0, 1, 5));
    geometry.faces.push(new THREE.Face3(5, 4, 0));
    
    geometry.computeFaceNormals(); 
    return geometry; 
}