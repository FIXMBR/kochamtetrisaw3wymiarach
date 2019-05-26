class Grid {

    constructor(parametrA, parametrB) {
        var geometry = new THREE.PlaneGeometry(500, 500, 20, 20);
        var material = new THREE.MeshBasicMaterial({ color: 0xe4e4e4, side: THREE.DoubleSide, wireframe: true });
        this.plane = new THREE.Mesh(geometry, material);
        this.plane.rotation.x = Math.PI / 2


    }
    getGrid() {
        return this.plane
    }
}