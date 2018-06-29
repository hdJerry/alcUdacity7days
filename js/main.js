"use stricks";
let db;

    /************************************
    Function to create db in the IndexedDB
    using ForerunnerDB.
    *************************************/

function init_db(){

        window.fdb = new ForerunnerDB();
        db = fdb.db("AlcUdacity");
        db.persist.driver("IndexedDB");

        db_cur = db.collection("converted", {
            primaryKey : 'CURRENCY'
        });

        console.log(db_cur.find());

        db_cur.load();
        
}
init_db();
