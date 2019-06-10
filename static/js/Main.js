javascript: (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })()
$(document).ready(function () {
    settings.scoreOpened = false
    window.ui = new Ui()
    window.ui.init()
    window.net = new Net()

    window.lastPlayers = []
    window.labelsArray = []
    window.xOffset = 0
    window.offsetAmount = 200
    window.playerNum = 1
    window.client = io();
    window.client.on("onconnect", function (data) {
        // alert(data.id)

        window.playerNum = data.players.length
        window.lastPlayers = [...data.players]
        let x = 0
        data.players.forEach(id => {
            let frame = new Frame(id)
            frame.position.x = window.offsetAmount * x + 45;
            scene.add(frame)
            frameArray.push(frame)
            // let background = new Background
            // background.position.x = window.offsetAmount * (id ) //+45;
            // scene.add(background)
            // bgArray.push(background)

            // console.log(id)
            if (data.id == id.id) {
                xOffset = x
            }

            x++
        })
        window.camera.position.x = 40 + 100 * (data.players.length - 1)
        //  controls.target.set(40 + 100 * (data.players.length - 1), 100, 500);

        window.Renderr.render(false)
    })
    window.client.on("playerNumber", function (data) {
        frameArray.forEach(frame => {
            scene.remove(frame)
        });
        window.lastPlayers = [...data.players]
        let x = 0
        data.players.forEach(id => {

            let frame = new Frame(id)
            frame.position.x = window.offsetAmount * (x) + 45;
            scene.add(frame)
            frameArray.push(frame)

            if (data.id == id.id) {
                xOffset = x
            }

            // let background = new Background
            // background.position.x = window.offsetAmount * (id )// +45;
            // //bgArray.push(background)
            // scene.add(background)
            x++
        })

        window.Renderr.render(false)

        window.camera.position.x = 40 + 100 * (data.players.length - 1)
        // controls.target.set(40 + 100 * (data.players.length - 1), 100, 500);
        window.playerNum = data.players.length
    })
    window.client.on("updateNames", function (data) {
        window.lastPlayers = [...data.players]
    })
    function addLabels() {
        window.labelsArray.forEach(label => {
            window.scene.remove(label)
        })
        var loader = new THREE.FontLoader();
        loader.load('fonts/Roboto_Light.json', function (font) {
            window.lastPlayers.forEach(player => {


                let textMesh = new THREE.TextGeometry(player.name, {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 6
                });
                let playerText = new THREE.Mesh(textMesh, settings.frameMaterial);
                playerText.position.y = 240
                playerText.position.x = window.offsetAmount * player.id
                window.scene.add(playerText)
                window.labelsArray.push(playerText)
            })
        });


    }

    window.client.on("startGame", function (data) {
        console.log('startGame')
        hold.holdyBoysArray.forEach(boy => {
            window.scene.remove(boy)

        });
        game.fallyBoisArray.forEach(element => {
            window.scene.remove(element)
        });
        game.clearLiveBoard()
        game.reset()
        game.playing = true
        game.gameStarted = true

        addLabels()

        window.Renderr.render(false)
        window.Renderr.render(true)
        $("#waitDiv").hide("slow");
        $("#loginDiv").hide("slow")
        window.ui.hideBckd();
        rng = new RNG(start)
    })

    window.client.on("gameEnded", function (data) {
        console.log('startGame')
        hold.holdyBoysArray.forEach(boy => {
            window.scene.remove(boy)

        });
        game.clearLiveBoard()
        game.reset()
        game.playing = false
        game.gameStarted = false

        window.Renderr.render(false)
        window.Renderr.render(true)
        $("#waitDiv").show("slow");
       //$("#loginDiv").hide("slow")
        window.ui.showBckd();
        //rng = new RNG(start)
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

    var mixer;
    function render() {
        var now = Date.now();
        var dt = (now - lastUpdate);
        lastUpdate = now;
        mixer.update(dt);
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

            e.preventDefault()
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

                    // console.log('pressed')
                    //console.log(settings.scoreOpened)
                    if (settings.scoreOpened) {
                        window.ui.closeScore()
                        //console.log('clScore')
                    } else if (settings.scoreOpened == false) {
                        window.ui.showScore()
                        // console.log('opScore')
                    }
                }
            }
        } else {
            if (e.keyCode == '9') {
                e.preventDefault()
                //console.log('pressed')
                //console.log(settings.scoreOpened)
                if (settings.scoreOpened) {
                    window.ui.closeScore()
                    //console.log('clScore')
                } else if (settings.scoreOpened == false) {
                    window.ui.showScore()
                    // console.log('opScore')
                }
            }
        }

    }




    // UI LISTENERS 
    //ui = new Ui()
    // ui.init()

   
    var loader = new THREE.GLTFLoader();

    loader.load(
        // resource URL
        'images/orange_justice/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            const model = gltf.scene
            window.scene.add(model);
            //window.scene.add(gltf.animations)
            //gltf.animations; // Array<THREE.AnimationClip>
           // gltf.scene; // THREE.Scene
           // gltf.scenes; // Array<THREE.Scene>
         //   gltf.cameras; // Array<THREE.Camera>
          //  gltf.asset; // Object

            mixer = new THREE.AnimationMixer(model);
            console.log(gltf.animations)
            mixer.clipAction(gltf.animations[0]).play();
   
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
            console.log(error)
    
        }
    );

})