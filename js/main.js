"use stricks";
let db;

$( "#CURR_FR" )
  .change(function() {
    let str = "";
    $( "#CURR_FR option:selected" ).each(function() {

      str += $( this ).val() + " ";

    });
    let cls = str.slice(0,2).toLowerCase();
    $("#flagFR").addClass(`flag-icon-${cls}`);
  })
  .trigger( "change" );


  $( "#CURR_TO" )
    .change(function() {
      let st = "";
      $( "#CURR_TO option:selected" ).each(function() {

        st += $( this ).val() + " ";

      });
      let cl = st.slice(0,2).toLowerCase();
      $("#flagTO").addClass(`flag-icon-${cl}`);
    })
    .trigger( "change" );


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


        db_cur.save();


}
init_db();
