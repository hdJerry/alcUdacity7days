"use stricks";

let db;
function init_db(){
    if(db == null || db == "undefined"){
        window.fdb = new ForerunnerDB();
        db = fdb.db("AlcUdacity");
        db.persist.driver("IndexedDB");
    }
    // console.log(db);
    db_user = db.collection("currencies", {
        primaryKey : "currencyName"
    });


    db_cur = db.collection("converted", {
        primaryKey : 'CURRENCY'
    });


    let data = {};

    $.ajax({
      url  : 'https://free.currencyconverterapi.com/api/v5/currencies',
      type : 'get',
      data : data,
      success : (res) =>{
        db_user.insert(res.results);
        db_user.save();
        db_user.load();
      //   console.group('int value');
      // console.log(db_user.find());
      // console.groupEnd();

      },
      error : (err) =>{
        console.log(err);
      }
    });




    db_country = db.collection("country", {
        primaryKey : "countryName"
    });


    let countrydata = {};

    $.ajax({
      url  : 'https://free.currencyconverterapi.com/api/v5/countries',
      type : 'get',
      data : countrydata,
      success : (res) =>{
        db_country.insert(res.results);
        db_country.save();
        db_country.load();
      //   console.group('int value');
      // console.log(db_country.find());
      // console.groupEnd();

      },
      error : (err) =>{
        console.log(err);
      }
    });


    /*****************************************
         Currencies Object
    ******************************************/

      let curArray = ["EUR", "GBP", "KWD", "RSD", "USD", "QAR", "ZAR", "NGN", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "AED", "FJD", "FKP", "AFN", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF", "KPW","KRW","ALL","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","AUD","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","AOA","RON","AMD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","ANG","UYU","UZS","VEF","VND","VUV","WST","XAF","XCD","XDR","XOF","XPF","YER","ARS","ZMW"];

let count = "1";
// let interval = setInterval(myTimer,10000);
//
// let testdata = {};
//
// for(let x = 0; x<=curArray.length; x++){
//   testdata[count] = ""+curArray[x];
//    console.log(curArray[x]);
//   count++;
// }
// console.log(curArray.length);
//
// console.log(testdata);

const genIterator = getcurrencies();


function* getcurrencies(){
  console.log("function started");

  for(let i =121; i<=156; i++){
    // if (count <=20) {
        // console.log(curArray[i]);
        // convertCurrency(1, 'NGN', curArray[i] , (err, amount) => {
        //   console.log("first");
        // });
        yield;

    // }
    count++;

  }

  console.log("function ended");

}

let base = 'NGN';
let Others ={
  "EUR":0.002418,
  "GBP":0.002141,
  "KWD":0.000848,
  "RSD":0.285191,
  "USD":0.002801,
  "QAR":0.010196,
  "ZAR":0.038754,
  "NGN":1,
  "AWG":0.004986,
  "AZN":0.00476,
  "BAM":0.004738,
  "BBD":0.005602,
  "BDT":0.235238,
  "BGN":0.004716,
  "BHD":0.001059,
  "BIF":4.904705,
  "BND":0.003789,
  "BOB":0.019187,
  "BRL":0.010815,
  "BSD":0.002801,
  "BTC":4.59414e-7,
  "BTN":0.192017,
  "BWP":0.029317,
  "BYN":0.005602,
  "BYR":54.90195,
  "BZD":0.005596,
  "CAD":0.003723,
  "CDF":4.385152,
  "CHF":0.002795,
  "CLP":1.80986,
  "CNY":0.018548,
  "COP":8.245377,
  "CRC":1.582773,
  "CUP":0.07423,
  "CVE":0.266695,
  "CZK":0.062852,
  "DJF":0.497204,
  "DKK":0.018018,
  "DOP":0.138909,
  "DZD":0.329725,
  "EGP":0.049973,
  "ERN":0.041989,
  "ETB":0.07636,
  "AED":0.010287,
  "FJD":0.005846,
  "FKP":0.002139,
  "AFN":0.203361,
  "GEL":0.00685,
  "GHS":0.013021,
  "GIP":0.002139,
  "GMD":0.130812,
  "GNF":25.224086,
  "GTQ":0.020989,
  "GYD":0.579524,
  "HKD":0.021983,
  "HNL":0.066972,
  "HRK":0.017718,
  "HTG":0.18493,
  "HUF":0.792353,
  "IDR":40.29411,
  "ILS":0.01021,
  "INR":0.192768,
  "IQD":3.316526,
  "IRR":119.299699,
  "ISK":0.299468,
  "JMD":0.365574,
  "JOD":0.001987,
  "JPY":0.308384,
  "KES":0.282269,
  "KGS":0.190828,
  "KHR":11.333051,
  "KMF":1.180504,
  "KPW":2.521008,
  "KRW":3.143947,
  "ALL":0.30465,
  "KYD":0.002297,
  "KZT":0.954789,
  "LAK":23.534999,
  "LBP":4.215683,
  "LKR":0.443137,
  "LRD":0.41675,
  "LSL":0.038852,
  "LVL":0.001738,
  "LYD":0.003848,
  "MAD":0.026724,
  "MDL":0.047207,
  "MGA":9.159657,
  "MKD":0.148235,
  "MMK":3.960782,
  "MNT":6.873944,
  "MOP":0.022641,
  "MRO":0.994396,
  "MUR":0.096779,
  "MVR":0.043613,
  "MWK":1.99843,
  "MXN":0.056054,
  "MYR":0.011316,
  "MZN":0.164538,
  "NAD":0.038726,
  "AUD":0.003816,
  "NIO":0.088336,
  "NOK":0.022942,
  "NPR":0.308263,
  "NZD":0.004145,
  "OMR":0.001078,
  "PAB":0.002801,
  "PEN":0.009158,
  "PGK":0.009192,
  "PHP":0.149944,
  "PKR":0.340252,
  "PLN":0.010559,
  "PYG":15.90167,
  "AOA":0.696442,
  "RON":0.011271,
  "AMD":1.348935,
  "RUB":0.176741,
  "RWF":2.379354,
  "SAR":0.010504,
  "SBD":0.022313,
  "SCR":0.037618,
  "SDG":0.050295,
  "SEK":0.025227,
  "SGD":0.003828,
  "SHP":0.002139,
  "SLL":22.40894,
  "SOS":1.596636,
  "SRD":0.020813,
  "STD":59.232987,
  "SYP":1.442519,
  "SZL":0.038844,
  "THB":0.092829,
  "TJS":0.025633,
  "TMT":0.009552,
  "TND":0.007322,
  "TOP":0.006488,
  "TRY":0.012864,
  "TTD":0.018626,
  "TWD":0.085622,
  "TZS":6.352935,
  "UAH":0.073613,
  "UGX":10.851258,
  "ANG":0.00507,
  "UYU":0.087814,
  "UZS":21.960781,
  "VEF":268.235237,
  "VND":64.240883,
  "VUV":0.30507,
  "WST":0.007295,
  "XAF":1.586722,
  "XCD":0.007539,
  "XDR":0.001994,
  "XOF":1.586722,
  "XPF":0.288807,
  "YER":0.69986,
  "ARS":0.077619,
  "ZMW":0.027815
};

  // for(let i =0; i <=0; i++){
  //   // console.log(currencies[i]);
  //   convertCurrency(1, 'NGN', 'PHP', (err, amount) => {
  //     console.log("first");
  //   });
  // }


    function myTimer(){

      genIterator.next();

    }



}

init_db();
