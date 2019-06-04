$(document).ready(function () {
    window.xOffset =0
    window.client = io();
    window.client.on("onconnect", function (data) {
       // alert(data.id)
        xOffset = data.id
        data.players.forEach(id => {
                let frame = new Frame
                frame.position.x = 200 * (id ) +45;
                scene.add(frame)
                frameArray.push(frame)
        })
        window.camera.position.x = 40 + 100*(data.players.length-1)
        controls.target.set( 40 + 100*(data.players.length-1), 100, 500 );
    })
    window.client.on("playerNumber", function (data) {
        data.players.forEach(id => {
                frameArray.forEach(frame => {
                    scene.remove(frame)
                });
                let frame = new Frame
                frame.position.x = 200 * (id ) +45;
                scene.add(frame)
        })
        
        window.camera.position.x = 40 + 100*(data.players.length-1)
        controls.target.set( 40 + 100*(data.players.length-1), 100, 500 );

    })
    var frameArray = []
    window.staticBoisArray = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let fov = 90;
    window.scene = new THREE.Scene();
    window.camera2 = new THREE.PerspectiveCamera(
        fov,
        width / height,
        0.1,
        10000
    );
    window.camera = new THREE.OrthographicCamera(width / -4, width / 4, height / 4, height / -4, 1, 1000);
    scene.add(window.camera);
    scene.add(camera2);
    var controls = new THREE.OrbitControls(window.camera);
    var controls = new THREE.OrbitControls(window.camera2);

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
    renderer.setClearColor(0x112d59); //kolor tła sceny
    renderer.setSize(width, height); //rozmiary renderowanego okna
    $("#render").append(renderer.domElement);

    //zmienne do kamery

    window.camera.position.x = 40;
    window.camera.position.y = 100;
    window.camera.position.z = 500;
    // camera.lookAt(window.scene.position);
    // 
    window.camera.lookAt(40, 100, 0);
    window.camera2.position.x = 40;
    window.camera2.position.y = 100;
    window.camera2.position.z = 500;
    // camera.lookAt(window.scene.position);
    // 
    window.camera2.lookAt(40, 100, 0);
    console.log(window.scene.position);
    //grid = new Grid
    //window.scene.add(grid.getGrid())

    game = new Game
    //frame = new Frame
    //scene.add(frame)
    //frame.position.x = 45 + 200 *(window.xOffset);

    rng = new RNG()

    game.newTetramino()

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
    let dropTimer

    new Render(true)
    window.cameraNum = 1


    function animate(dt) {
        game.animations.forEach(animation => {
            animation.animate(animation.data, dt)
        });
    }



    function render() {
        var now = Date.now();
        var dt = (now - lastUpdate);
        lastUpdate = now;

        animate(dt)
        if (tetramino.touching) {
            tetramino.localLock -= dt
            tetramino.totalLock -= dt
            if (tetramino.localLock <= 0 || tetramino.totalLock <= 0) {
                game.clearLiveBoard()
                tetramino.addTetramino()
                tetramino.place()
            }

        }

        if (game.gravity >= dropTimer) {
            dropTimer++
        } else {
            dropTimer = 0
            if (!tetramino.touching)
                window.tetramino.move(0)
        }

        requestAnimationFrame(render);
        if (window.cameraNum == 1) {
            renderer.render(window.scene, window.camera);
        } else {
            renderer.render(window.scene, window.camera2);
        }

    }
    render();

    // window.client.on("boards", function (data) {
    //     game.board = data.board
    //     game.liveBoard = data.liveBoard
    //     new Render(true)
    //     new Render(false)
    // })


    document.onkeydown = checkKey;

    function checkKey(e) {
        if (!game.lock) {
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
                window.tetramino.hardDrop()
            } else if (e.keyCode == '16') {
                window.tetramino.place()
            }
        }
    }


})