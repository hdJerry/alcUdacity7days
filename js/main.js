"use stricks";
let db;


function init_db(){

        window.fdb = new ForerunnerDB();
        db = fdb.db("AlcUdacity");
        db.persist.driver("IndexedDB");

        db_cur = db.collection("converted", {
            primaryKey : 'CURRENCY'
        });

         db_cur.load();


}
init_db();
