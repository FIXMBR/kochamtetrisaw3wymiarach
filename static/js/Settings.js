var settings = {
    materialTetra: new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
    }),
    colors: [0xdd4613, 0x75c9e5, 0xf99e1d, 0x106ae8, 0xef0bc5, 0x02d325, 0xcdd10a],
    normalMaterial: new THREE.MeshNormalMaterial()


}
settings.ghostMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5
})
settings.clearMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
})
settings.materials=[]
for (let i = 0; i < settings.colors.length; i++) {
    const element = settings.colors[i];
    settings.materials.push(new THREE.MeshLambertMaterial({
        color: element,
    }))
}
window.getMaterialTetra = function (color) {
    if (color == 'ghost') {
        // let materialTetra = new THREE.MeshLambertMaterial({
        //     color: 0xffffff,
        //     transparent: true,
        //     opacity: 0.5
        // })

        return settings.ghostMaterial
    } {
        

        return settings.materials[color]
    }
}


var length = 8, width = 8, depth = 10

var length2 = 7.95, width2 = 7.95, depth2 = 9.95



var shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

var extrudeSettings = {
    steps: 1,
    depth: depth,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: -2,
    bevelSegments: 1
};

var shape2 = new THREE.Shape();
shape2.moveTo(0, 0);
shape2.lineTo(0, width2);
shape2.lineTo(length2, width2);
shape2.lineTo(length2, 0);
shape2.lineTo(0, 0);

var extrudeSettings2 = {
    steps: 1,
    depth: depth2,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: -2,
    bevelSegments: 1
};

settings.ghostGeometry = new THREE.ExtrudeGeometry(shape2, extrudeSettings2);
settings.pieceGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

settings.ghostGeometry.translate(-length/2,-width/2,-depth/2)
settings.pieceGeometry.translate(-length/2,-width/2,-depth/2)