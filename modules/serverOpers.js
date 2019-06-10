module.exports = {
    operations: require("../modules/Operations.js"),
    mongoClient: require('mongodb').MongoClient,
    loginToSrv: function (username, password, host, database, callback) {
        if (username != "" && password != "") {
            this.mongoClient.connect(`mongodb://${username}:${password}@${host}/${database}`, function (err, client) {
                if (err) {
                    console.log(err)
                    callback(false)
                } else {
                    console.log("baza podłączona")
                    var dataObj = {
                        "currentHost": host,
                        "currentDatabase": client.db(database),
                        "currentUsername": username,
                        "currentPassword": password
                    }
                    callback(dataObj)
                }
            })
        } else {
            console.log("daj hasło ziomek bo nie chce mi się implementować localhosta XD")
        }
    },
    getScoresCollectionFromSrv: function(db, callback) {
        db.createCollection("scores", function (err, coll) {
            //console.log("kolekcja powstała, sprawdź w konsoli mango")
            collection = coll;
            callback(collection)
          })
    },
    getHelpCollection: function(db, callback) {
        db.createCollection("help", function (err, coll) {
            //console.log("kolekcja powstała, sprawdź w konsoli mango")
            collection = coll;
            callback(collection)
          })
    }
}