javascript: (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })()
$(document).ready(function () {
    settings.scoreOpened = false
    window.ui = new Ui()
    window.ui.init()
    window.net = new Net()

    window.xOffset = 0
    window.offsetAmount = 200
    window.playerNum = 1
    window.client = io();
    window.client.on("onconnect", function (data) {
        // alert(data.id)
        xOffset = data.id
        window.playerNum = data.players.length
        data.players.forEach(id => {
            let frame = new Frame
            frame.position.x = window.offsetAmount * (id.id) + 45;
            scene.add(frame)
            frameArray.push(frame)
            // let background = new Background
            // background.position.x = window.offsetAmount * (id ) //+45;
            // scene.add(background)
            // bgArray.push(background)

            // console.log(id)

        })
        window.camera.position.x = 40 + 100 * (data.players.length - 1)
        //  controls.target.set(40 + 100 * (data.players.length - 1), 100, 500);

        window.Renderr.render(false)
    })
    window.client.on("playerNumber", function (data) {
        frameArray.forEach(frame => {
            scene.remove(frame)
        });
        data.players.forEach(id => {

            let frame = new Frame
            frame.position.x = window.offsetAmount * (id.id) + 45;
            scene.add(frame)
            frameArray.push(frame)


            // let background = new Background
            // background.position.x = window.offsetAmount * (id )// +45;
            // //bgArray.push(background)
            // scene.add(background)

        })

        window.Renderr.render(false)

        window.camera.position.x = 40 + 100 * (data.players.length - 1)
        // controls.target.set(40 + 100 * (data.players.length - 1), 100, 500);
        window.playerNum = data.players.length
    })


    window.client.on("startGame", function (data) {
        console.log('startGame')
        hold.holdyBoysArray.forEach(boy => {
            window.scene.remove(boy)

        });
        game.clearLiveBoard()
        game.reset()

        game.gameStarted = true

        window.Renderr.render(false)
        window.Renderr.render(true)
        $("#waitDiv").hide("slow");
        rng = new RNG(start)
    })


    var frameArray = []
    var bgArray = []
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
    window.camera = new THREE.OrthographicCamera(width / -4, width / 4, height / 4, height / -4, 50, 150);
    scene.add(window.camera);
    scene.add(camera2);
    //var controls = new THREE.OrbitControls(window.camera);
    //var controls = new THREE.OrbitControls(window.camera2);

    cameraBoy = new CameraBoy()

    $(window).resize(function () {

        renderer.setSize(window.innerWidth, window.innerHeight);
        window.camera.left = window.innerWidth / -4
        window.camera.right = window.innerWidth / 4
        window.camera.top = window.innerHeight / 4
        window.camera.bottom = window.innerHeight / -4
        window.camera.updateProjectionMatrix();
    });


    //
    //THREE
    //

    //zmienne to 3js
    //var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer({
        //antialias: true
    });
    renderer.setClearColor(0x303036); //kolor tła sceny
    renderer.setSize(width, height); //rozmiary renderowanego okna
    $("#render").append(renderer.domElement);

    renderer.localClippingEnabled = true;

    //zmienne do kamery

    window.camera.position.x = 40;
    window.camera.position.y = 100;
    window.camera.position.z = 100;
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
    //frame.position.x = 45 + window.offsetAmount *(window.xOffset);

    function start() {

        window.tetramino = new Tetramino()
        window.ghost = new Ghost()

        game.newTetramino()

        render();
        //console.log('asdf')
    }

    rng = new RNG(start)
    hold = new Hold
    var multi = new Multi()
    window.preview = new Preview()
    window.attacks = new Attacks()
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


    window.Renderr = new Render
    window.Renderr.render(true)
    window.cameraNum = 1
    //window.localPlane.position.y = 100
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
        if (window.tetramino.touching) {
            window.tetramino.localLock -= dt
            window.tetramino.totalLock -= dt
            if (window.tetramino.localLock <= 0 || window.tetramino.totalLock <= 0) {
                game.clearLiveBoard()
                window.tetramino.addTetramino()
                window.tetramino.place()
            }

        }
        if (game.gravity >= game.dropTimer) {
            game.dropTimer += dt
        } else {
            while (game.gravity < game.dropTimer) {
                game.dropTimer -= game.gravity
                if (!window.tetramino.touching)
                    window.tetramino.move(0)
            }
        }

        requestAnimationFrame(render);
        if (window.cameraNum == 1) {
            renderer.render(window.scene, window.camera);
        } else {
            renderer.render(window.scene, window.camera2);
        }

    }

    // window.client.on("boards", function (data) {
    //     game.board = data.board
    //     game.liveBoard = data.liveBoard
    //     window.Renderr.render(true)
    //     window.Renderr.render(false)
    // })


    document.onkeydown = checkKey;

    function checkKey(e) {
        // console.log(game.lock);
        if (game.playing) {
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
                else if (e.keyCode == '67') {
                    window.tetramino.hold()
                } else if (e.keyCode == '9') {
                    e.preventDefault()
                    console.log('pressed')
                    console.log(settings.scoreOpened)
                    if (settings.scoreOpened) {
                        window.ui.closeScore()
                        console.log('clScore')
                    } else if (settings.scoreOpened == false) {
                        window.ui.showScore()
                        console.log('opScore')
                    }
                }
            }
        }
    }




    // UI LISTENERS 
    //ui = new Ui()
   // ui.init()
 
})