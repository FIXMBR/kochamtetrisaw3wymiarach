class Ball extends THREE.Mesh{
    constructor(){
        super(
            new THREE.SphereGeometry( 4, 32, 32 ),
            new THREE.MeshNormalMaterial()
        )
        
    }
    getContainer(){
    }
}