var settings = {
    materialTetra: new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
    }),
    colors: [0xdd4613,0x75c9e5,0xf99e1d,0x106ae8,0xef0bc5,0x02d325,0xcdd10a],
    normalMaterial: new THREE.MeshNormalMaterial(),
}

window.getMaterialTetra= function(color){ 
    let materialTetra =  new THREE.MeshLambertMaterial({
        color: settings.colors[color],
        side: THREE.DoubleSide,
    })
    return materialTetra
}