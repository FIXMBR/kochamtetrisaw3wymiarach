

class RNG {
    constructor(){
        function shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }
        this.array = shuffle([0,1,2,3,4,5,6])
        console.log(this.array)
    }


    gen(){
        if(this.array.length <=1){
            let result = this.array.pop()

            function shuffle(a) {
                var j, x, i;
                for (i = a.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = a[i];
                    a[i] = a[j];
                    a[j] = x;
                }
                return a;
            }

            this.array = shuffle([0,1,2,3,4,5,6])


            return result
        }else{
            return this.array.pop()
        }
        

    }
}