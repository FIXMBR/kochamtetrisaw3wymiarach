class CameraBoy {
    constructor(){
        this.flipFlop = false
    }
    dollyZoom(){

    }
    changeZoom(){
        if(this.flipFlop){
            this.flipFlop=false
            window.camera.position.z = 5000
            window.camera.fov = 2
        }else{
            this.flipFlop=true
            //window.camera.position.z = 300
            window.camera.fov = 45
        }
    }
}