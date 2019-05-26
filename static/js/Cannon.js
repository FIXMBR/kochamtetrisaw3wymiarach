class Cannon{
    constructor(){
        this.container = new THREE.Object3D()
        var material = new THREE.MeshNormalMaterial()
        var geometry = new THREE.CylinderGeometry(5,5, 30, 32);
        this.barrel = new THREE.Mesh(geometry, material);
        geometry.translate(0,15,0)
        //this.barrel.position.y = 10
        var wheelgeometry = new THREE.CylinderGeometry(15,15, 10, 32);
        var wheel1=new THREE.Mesh(wheelgeometry, material);
        var wheel2=new THREE.Mesh(wheelgeometry, material);
        wheel1.rotation.z = Math.PI/2
        wheel1.position.x = 10
        wheel2.rotation.z = Math.PI/2
        wheel2.position.x = -10
        var axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu
        this.container.add(axes)
        this.container.add(this.barrel)
        this.container.add(wheel1)
        this.container.add(wheel2)
        var geometryball = new THREE.SphereGeometry( 5, 32, 32 );
        var ball = new THREE.Mesh(geometryball, material);
        this.container.add(ball)
    }
    getContainer(){
        return this.container
    }
    setbarrel(angle){
        this.barrel.rotation.x=angle
    }
}