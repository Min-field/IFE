var scene, camera, light, renderer; 
function init(){
    initScene(); 
    initRenderer(); 
    initCamera(); 
    initLight(); 
    initObject(); 
}

function initRenderer(){
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas"), 
        antialias: true, 
        precision: "highp"
    });
    renderer.setClearColor(0x666666); 
}

function initScene(){
    scene = new THREE.Scene(); 
}

function initCamera(){
    var canvas = document.getElementById("mainCanvas"); 
    camera = new THREE.PerspectiveCamera(50, canvas.clientWidth/canvas.clientHeight, 1, 100); 
    camera.position.set(7, 8, 9); 
    camera.lookAt(new THREE.Vector3(0, 0, 0)); 
}