module.exports = {

    //insert

    Insert: function (collection, data, callback) {
        collection.insertOne(data, function (err, result) {
            //console.log(result)
            if (err) console.log(err)
            else callback(result)
        });
    },

    //select all - zwraca tablicę pasujących dokumentów

    SelectAll: function (collection, callback) {
        collection.find({}).toArray(function (err, items) {
            //console.log(items)
            if (err) console.log(err)
            else callback(items)
        });
    },

    //select - zwraca tablicę pasujących dokumentów, z ograniczeniem

    SelectAndLimit: function (collection, callback) {
        collection.find({
            login: "test"
        }).toArray(function (err, items) {
            //console.log(items)
            if (err) console.log(err)
            else callback(items)
        });
    },

    //delete - usunięcie poprzez id - uwaga na ObjectID

    DeleteById: function (ObjectID, collection, id, callback) {
        collection.remove({
            _id: ObjectID(id)
        }, function (err, data) {
           // console.log(data)
            if (err) console.log(err)
            else callback(true)
        })
    },

    // update - aktualizacja poprzez id - uwaga na ObjectID - to funkcja, a nie string
    // uwaga: bez $set usuwa poprzedni obiekt i wstawia nowy
    // z $set - dokonuje aktualizacji tylko wybranego pola

    UpdateById: function (ObjectID, collection,id, data, callback) {
        collection.updateOne({
                _id: ObjectID(id)
            }, data
                //$set: {
              //      password: data
              //  }
            ,
            function (err, data) {
                console.log("update: " + data)
                if (err) console.log(err)
                else callback(true)
            })
    },

}