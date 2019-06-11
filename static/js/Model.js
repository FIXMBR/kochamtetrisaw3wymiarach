class Model {
    init() {
        this.loader = new THREE.GLTFLoader();
        this.gltf = null
    }
    loadModel(callback) {
        var that = this
        loader.load(
            // resource URL
            'models/gltf/duck/duck.gltf',
            // called when the resource is loaded
            function (gltf) {
                that.gltf = gltf
                scene.add( that.gltf.scene );
                that.gltf.animations; // Array<THREE.AnimationClip>
                that.gltf.scene; // THREE.Scene
                that.gltf.scenes; // Array<THREE.Scene>
                that.gltf.cameras; // Array<THREE.Camera>
                that.gltf.asset; // Object
                
            },
            // called while loading is progressing
            function ( xhr ) {
        
              //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            function ( error ) {
        
              //console.log( 'An error happened' );
        
            }
        );
    }
}