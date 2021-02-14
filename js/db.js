var dbPromised = idb.open("favorite-team", 1, function (upgradeDb) {
    var favoritesObjectStore = upgradeDb.createObjectStore("favorites", {
        keyPath: "id"
    });
    favoritesObjectStore.createIndex("name", "name", {
        unique: false
    });
});

function saveFavorite(club) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("favorites", "readwrite");
            var store = tx.objectStore("favorites");
            console.log(club);
            store.put(club);
            return tx.complete;
        })
        .then(function () {
            console.log("Club berhasil disimpan ke favorite.");
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("favorites", "readonly");
                var store = tx.objectStore("favorites");
                return store.getAll();
            })
            .then(function (favorites) {
                resolve(favorites);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("favorites", "readonly");
                var store = tx.objectStore("favorites");
                return store.get(id);
            })
            .then(function (favorite) {
                resolve(favorite);
            });
    });
}

function deleteById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("favorites", "readwrite");
                var store = tx.objectStore("favorites");
                store.delete(id);
                return tx.complete;
            })
            .then(function () {
                resolve(true);
                console.log("Klub telah dihapus dari favorite.");
            });
    });
}