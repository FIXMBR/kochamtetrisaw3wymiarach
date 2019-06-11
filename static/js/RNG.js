

class RNG {
    constructor(callback) {
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
        this.array = shuffle([0, 1, 2, 3, 4, 5, 6])
      //console.log(this.array)
        this.RNGnum = 0

        this.startNum = 5

        this.getRNG(callback)

    }

    getRNG(callback) {
        let _this = this

        $.ajax({
            url: "/getRNG",
            data: {
                num: JSON.stringify(this.RNGnum)
            },
            type: "POST",
            success: function (added) {
                //console.log("no siema: " + _this.RNGnum)
                _this.RNGnum++
                game.incomingTetraminos.push(added)
                if (_this.startNum > 0) {
                    _this.startNum--
                    _this.getRNG(callback)
                } else if (_this.startNum == 0) {
                    callback()
                }
            },
            error: function (xhr, status, error) {
              //console.log(xhr);
            }

        })
    }

    gen() {
        if (this.array.length <= 1) {
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

            this.array = shuffle([0, 1, 2, 3, 4, 5, 6])


           // window.preview.update()
            return result
        } else {
            let result = this.array.pop()
            
            return result
        }

    }

    genv2() {
        let _this = this
        $.ajax({
            url: "/getRNG",
            data: {
                num: JSON.stringify(this.RNGnum)
            },
            type: "POST",
            success: function (added) {

                _this.RNGnum++
                game.incomingTetraminos.push(added)
            },
            error: function (xhr, status, error) {
              //console.log(xhr);
            }

        })
        // while(game.incomingTetraminos<6){

        // }
        // if(game.incomingTetraminos<5){

        // }
        let result = game.incomingTetraminos.shift()
        window.preview.update()
        return result
    }
}