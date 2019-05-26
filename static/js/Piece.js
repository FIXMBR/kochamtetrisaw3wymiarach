class Piece extends THREE.Object3D{
    constructor(){
        super()
        var length = 9, width = 9, depth = 10

        var shape = new THREE.Shape();
        shape.moveTo( 0,0 );
        shape.lineTo( 0, width );
        shape.lineTo( length, width );
        shape.lineTo( length, 0 );
        shape.lineTo( 0, 0 );
        
        var extrudeSettings = {
            steps: 2,
            depth: depth,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: -2,
            bevelSegments: 1
        };
        
        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        geometry.translate(-length/2,-width/2,-depth/2)
        var material = new THREE.MeshNormalMaterial()
        var mesh = new THREE.Mesh( geometry, material ) ;
        this.add( mesh );
        var axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu
        this.add(axes)
        
    }
}