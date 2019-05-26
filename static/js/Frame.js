class Frame extends THREE.Object3D{
    constructor(){
        super()
        let frameUDgeometry = new THREE.BoxGeometry(110, 5, 20 );

        let frameDown = new THREE.Mesh( frameUDgeometry, settings.normalMaterial );
        frameDown.position.y = -7.5;
        this.add(frameDown)

        let frameUp = new THREE.Mesh( frameUDgeometry, settings.normalMaterial);
        frameUp.position.y = 204;
        this.add(frameUp)

        let frameLRgeometry = new THREE.BoxGeometry(5,208,20)

        let frameLeft = new THREE.Mesh( frameLRgeometry, settings.normalMaterial);
        frameLeft.position.x = -52.5;
        frameLeft.position.y = 98;
        this.add(frameLeft)
        
        let frameRight = new THREE.Mesh( frameLRgeometry, settings.normalMaterial);
        frameRight.position.x = 52.5;
        frameRight.position.y = 98;
        this.add(frameRight)
        
        
        
    }
}