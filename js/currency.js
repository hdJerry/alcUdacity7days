let currency = {};



function convertCurrency(amount, fromCurrency, toCurrency, cb) {

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  let query = fromCurrency + '_' + toCurrency;

  let url = 'https://free.currencyconverterapi.com/api/v5/convert?q='+ query+'&compact=y';

  let myQuery = fromCurrency + ' to ' + toCurrency;

      let data = {};

      $.ajax({
        url  : url,
        type : 'get',
        data : data,
        success : (res) =>{
          console.log(res[query]);


          currency[myQuery] = res[query].val;




         console.log(currency);
          db_cur.insert(currency);
          db_cur.save();
          // db_cur.load();

        console.group('currencies');
        console.log(db_cur.find());
        console.groupEnd();
          // console.log(res.results[query]);
          let val = res[query].val;
          let total = val * amount;
          console.log(total);
          if(total != null || total != undefined || total != 0){
            $("#CURR_valDIV").removeClass('bgF');
            // cb(null, Math.round(total * 100) / 100);
            cb(null, total.toFixed(4));


          }


        },
        error : (err) =>{
          console.log(err);


          let list = document.querySelector('#OfflineList');

          let findcurrencies = db.collection('converted').find()[0];
          if(findcurrencies == 'undefined' || findcurrencies == undefined){
            $("#CURR_valDIV").text('Unable to convert please check Network connection');

          }else{


            if( ($("ul#OfflineList").has("li").length === 0) ) {
              let interval = setInterval(myTimer,1000);

              const genIterator = getcurrencies();
              function* getcurrencies(){

              for(let x in findcurrencies){
                if(x != 'CURRENCY'){
                  let li = document.createElement('li');
                  li.innerHTML = x;
                  list.appendChild(li);
                }

                yield;
              }

            }


            function myTimer(){

              genIterator.next();

            }

          }

          let result = findcurrencies[myQuery] * amount;
          console.log(result);

          if(isNaN(result)){
            $("#CURR_valDIV").text(" Cant convert "+fromCurrency+" to "+ toCurrency);
          }else{
            $("#CURR_valDIV").removeClass('bgF');
            $("#CURR_valDIV").text(amount+" "+fromCurrency+" = "+result+" "+ toCurrency);
          }



          }




        }

      });

}


/*****************************************
      Convert currency Button Trigger
*****************************************/
 $("#getAmount").on('click',()=>{




   $("#CURR_valDIV").addClass('bgF');
   $("#CURR_valDIV").text('');

  /******************************************************
              Getting the input values
  ******************************************************/
   let initVal = document.querySelector("#init_Val").value;
   let curFrom = document.querySelector('#CURR_FR');
   let fromValue = curFrom.options[curFrom.selectedIndex].value;

   let curTo = document.querySelector('#CURR_TO');
   let toValue = curTo.options[curTo.selectedIndex].value;

   convertCurrency(initVal, fromValue, toValue, (err, amount) => {

     $("#CURR_valDIV").text(initVal+" "+fromValue+" = "+amount+" "+ toValue);
   });

 });
