var settings = {
    materialTetra: new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
    }),
    colors: [0xdd4613, 0x75c9e5, 0xf99e1d, 0x106ae8, 0xef0bc5, 0x02d325, 0xcdd10a, 0xe0e0e0],
    normalMaterial: new THREE.MeshNormalMaterial(),
    glow: new THREE.TextureLoader().load("images/glow.png"),
    hardD1: new THREE.TextureLoader().load("images/hardD1.png"),
    hardD2: new THREE.TextureLoader().load("images/hardD2.png"),
    rotatingCam:true

}

window.localPlane = new THREE.Plane(new THREE.Vector3(0, - 1, 0), 200);

settings.frameMaterial = new THREE.MeshLambertMaterial({
    color: 0xfc5130,
   //clippingPlanes: [window.localPlane],
    //clipShadows: true
})

settings.ghostMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,

    clippingPlanes: [window.localPlane],
    clipShadows: true
})
settings.attackMaterial = new THREE.MeshLambertMaterial({
    color: 0xe0e0e0,
    // transparent: true,
    // opacity: 0.9,
})
settings.clearMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
})
settings.materials = []
for (let i = 0; i < settings.colors.length; i++) {
    const element = settings.colors[i];
    settings.materials.push(new THREE.MeshLambertMaterial({
        color: element,

        clippingPlanes: [window.localPlane],
        clipShadows: true
    }))
}
settings.noClipMaterials = []
for (let i = 0; i < settings.colors.length; i++) {
    const element = settings.colors[i];
    settings.noClipMaterials.push(new THREE.MeshLambertMaterial({
        color: element

    }))
}
settings.spriteMaterial = new THREE.SpriteMaterial({
    map: settings.glow,
    transparent: true,
    opacity: 0.5,
    color: 0xffffff,
    blending: THREE.AdditiveBlending
});
settings.clearSprite = new THREE.Sprite(settings.spriteMaterial);

let spriteMaterial = new THREE.SpriteMaterial({
    map: settings.hardD1,
    transparent: true,
    opacity: 0.1,
    color: 0xffffff,
    blending: THREE.AdditiveBlending
});
settings.spriteOG = new THREE.Sprite(spriteMaterial);
settings.spriteOG.scale.set(33, 50, 1.0);

let attackAnimationMaterial = new THREE.SpriteMaterial({
    map: settings.hardD2,
    transparent: true,
    opacity: 1,
    color: 0xffffff,
    blending: THREE.AdditiveBlending
});
settings.attackAnimationSprite = new THREE.Sprite(attackAnimationMaterial);
settings.attackAnimationSprite.scale.set(20, 20, 1.0)


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

settings.ghostGeometry.translate(-length / 2, -width / 2, -depth / 2)
settings.pieceGeometry.translate(-length / 2, -width / 2, -depth / 2)




var pieces = []
var noclipPieces = []
var ghostPiece = new THREE.Mesh(settings.ghostGeometry, settings.ghostMaterial)
var attackPiece = new THREE.Mesh(settings.pieceGeometry, settings.attackMaterial)



for (let i = 0; i < settings.materials.length; i++) {
    pieces.push(new THREE.Mesh(settings.pieceGeometry, settings.materials[i]))
}

for (let i = 0; i < settings.noClipMaterials.length; i++) {
    noclipPieces.push(new THREE.Mesh(settings.pieceGeometry, settings.noClipMaterials[i]))
}


settings.scoresOpened = false;

