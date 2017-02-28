function init(){
    var canvas = document.getElementById("mainCanvas"); 
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true              //抗锯齿
    });
    renderer.setClearColor(0x666666);
    
    var scene = new THREE.Scene(); 

    var camera = new THREE.PerspectiveCamera(50, canvas.clientWidth/canvas.clientHeight, 1, 100);
    camera.position.set(6, 9, 10); 
    camera.lookAt(new THREE.Vector3(0, 0, 0)); 
    scene.add(camera); 
   
   var cube = new THREE.Mesh(new THREE.CubeGeometry(4, 3, 3), new THREE.MeshNormalMaterial()); 
   cube.position.set(2, 1.5, 1.5); 
   scene.add(cube); 

   var wheel1 = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.2, 12, 18), new THREE.MeshNormalMaterial());; 
   wheel1.position.set(1, 0, 3.5); 
   scene.add(wheel1); 

   var wheel2 = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.2, 12, 18), new THREE.MeshNormalMaterial());; 
   wheel2.position.set(3, 0, 3.5); 
   scene.add(wheel2);

   renderer.render(scene, camera); 
}

window.onload = function(){
    init();
}
