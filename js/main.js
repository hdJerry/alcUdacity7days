"use stricks";
let db;

    /************************************
    Function to create db in the IndexedDB
    using ForerunnerDB.
    *************************************/

function init_db(){
     if(db == null || db == 'undefined'){
       window.fdb = new ForerunnerDB();
       db = fdb.db("AlcUdacity");
       db.persist.driver("IndexedDB");

     }
     db_cur = db.collection("converted", {
         primaryKey : 'CURRENCY'
     });

     db_cur.load();

}
init_db();
