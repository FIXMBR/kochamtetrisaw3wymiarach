$(document).ready(function () {
    window.client = io();
    window.client.on("onconnect", function (data) {
        alert(data.clientName)
    })


    let width = window.innerWidth;
    let height = window.innerHeight;
    let fov = 15;
    window.scene = new THREE.Scene();
    //window.camera = new THREE.PerspectiveCamera(
    // fov,
    // width / height,
    //     0.1,
    //     10000
    //);
    window.camera = new THREE.OrthographicCamera(width / -4, width / 4, height / 4, height / -4, 1, 1000);
    scene.add(camera);
    var controls = new THREE.OrbitControls(window.camera);

    cameraBoy = new CameraBoy()

    $(window).resize(function () {
        window.camera.aspect = window.innerWidth / window.innerHeight;
        window.camera.updateProjectionMatrix();
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

    window.camera.position.x = 40;
    window.camera.position.y = 100;
    window.camera.position.z = 1000;
    // camera.lookAt(window.scene.position);
    // 
    window.camera.lookAt(40, 100, 0);
    console.log(window.scene.position);
    //grid = new Grid
    //window.scene.add(grid.getGrid())

    game = new Game
    frame = new Frame
    scene.add(frame)
    frame.position.x = 45;

    window.tetramino = new Tetramino(Math.floor(Math.random() * 7))


    //  var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    //  orbitControl.addEventListener('change', function () {
    //       renderer.render(window.scene, camera)
    //  });

    //window.scene.add(new Piece())
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 5)
    window.scene.add(directionalLight);
    var light = new THREE.AmbientLight(0x404040, 1.5); // soft white light
    scene.add(light);

    var lastUpdate = Date.now()

    new Render(true)

    function render() {
        var now = Date.now();
        var dt = (now - lastUpdate) * 0.01;
        lastUpdate = now;

        requestAnimationFrame(render);
        renderer.render(window.scene, window.camera);

    }
    render();

    window.client.on("boards", function (data) {
        window.board = data.board
        window.liveBoard = data.liveBoard
        new Render(true)
        new Render(false)
    })


    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            window.tetramino.move(1)
        } else if (e.keyCode == '40') {
            window.tetramino.move(0)
        } else if (e.keyCode == '37') {
            window.tetramino.move(3)
        } else if (e.keyCode == '39') {
            window.tetramino.move(2)
        } else if (e.keyCode == '90') {
            window.tetramino.rotateLeft()
        } else if (e.keyCode == '88') {
            window.tetramino.rotateRight()
        } else if (e.keyCode == '32') {
            window.tetramino.place()
        }

    }


})