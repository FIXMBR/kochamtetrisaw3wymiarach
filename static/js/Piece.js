class Piece extends THREE.Object3D{
    constructor(color){
        super()

        var length = 8, width = 8, depth = 10
        if (color == 'ghost') {
            length = 7.95
            width = 7.95
            depth = 9.95
        }
        

        var shape = new THREE.Shape();
        shape.moveTo( 0,0 );
        shape.lineTo( 0, width );
        shape.lineTo( length, width );
        shape.lineTo( length, 0 );
        shape.lineTo( 0, 0 );
        
        var extrudeSettings = {
            steps: 1,
            depth: depth,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: -2,
            bevelSegments: 1
        };
        
        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        geometry.translate(-length/2,-width/2,-depth/2)
        var material = window.getMaterialTetra(color)
        var mesh = new THREE.Mesh( geometry, material ) ;
        this.add( mesh );
        //var axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu
       //this.add(axes)
        
    }
}