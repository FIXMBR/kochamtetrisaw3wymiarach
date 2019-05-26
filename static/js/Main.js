$(document).ready(function () {
    var client = io();
    client.on("onconnect", function (data) {
        alert(data.clientName)
    })


    let width = window.innerWidth;
    let height = window.innerHeight;
    let fov = 45;
    window.scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        fov,
        width / height,
        0.1,
        10000
    );
    //var controls = new THREE.OrbitControls( camera );



    $(window).resize(function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });


    //
    //THREE
    //

    //zmienne to 3js
    //var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0xf0f0f0); //kolor tła sceny
    renderer.setSize(width, height); //rozmiary renderowanego okna
    $("#render").append(renderer.domElement);

    //zmienne do kamery

    camera.position.x = 50;
    camera.position.y = 100;
    camera.position.z = 50;
    camera.lookAt(window.scene.position);

    grid = new Grid
    window.scene.add(grid.getGrid())
    
    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(window.scene, camera)
    });

    window.scene.add(new Piece())

var lastUpdate =   Date.now() 

    function render() {
        var now = Date.now();
        var dt = (now - lastUpdate) * 0.01;
        lastUpdate = now;
        
        requestAnimationFrame(render);
        renderer.render(window.scene, camera);

    }
    render();

})