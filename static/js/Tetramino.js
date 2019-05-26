class Piece extends THREE.Object3D{
    constructor(num){
        super()
        switch(num){
            case 0:
                this.add(new Piece().position.x=2)
                break;
        }
        var axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu
        this.add(axes)
        
    }
}