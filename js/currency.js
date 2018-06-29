let currency = {};

function convertCurrency(amount, fromCurrency, toCurrency, cb) {

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  let query = `${fromCurrency}_${toCurrency}`;

  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;

  let myQuery =`${fromCurrency} to ${toCurrency}`;

      let data = {};

      $.ajax({
        url  : url,
        type : 'get',
        data : data,
        success : (res) =>{



          currency[myQuery] = res[query].val;

          db_cur.insert(currency);
          db_cur.save();
          
           /******************************************************
           All convertions are done and saved to the IndexedDB
           provided user is online,
           and the list of currencies that can be converted offline
           is displayed to
           *******************************************************/

          let list = document.querySelector('#OfflineList');
          $('#OfflineList').empty();

          let findcurrencies = db.collection('converted').find();


            for(let i=0; i<=findcurrencies.length;i++){
              let interval = setInterval(myTimer,1000);

              const genIterator = getcurrencies();
              function* getcurrencies(){

              for(let x in findcurrencies[i]){
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

          let val = res[query].val;
          let total = val * amount;
          console.log(total);
          if(total != null || total != undefined || total != 0){
            $("#CURR_valDIV").removeClass('bgF');
            let totRound = Math.round(total * 100) / 100;
            if(totRound == 0){
              cb(null, total.toFixed(4));
            }else{
              cb(null,totRound);

            }


          }


        },
        error : (err) =>{


          let findcurrencies = db.collection('converted').find();
          /*****************************************************************
          Initially checks if any transaction has been save in the IndexedDB
          if Not then Displays unable to convert

          if there exist a transaction then is convert it

          on convertion there will be a list of available currencies that can
          be converted
          *****************************************************************/
          if(findcurrencies.length < 1 ){
            $("#CURR_valDIV").text('Unable to convert please check Network connection');

          }else{

            let list = document.querySelector('#OfflineList');
            $('#OfflineList').empty();

            let findcurrencies = db.collection('converted').find();


              for(let i=0; i<=findcurrencies.length;i++){

              let interval = setInterval(myTimer,1000);

              const genIterator = getcurrencies();
              function* getcurrencies(){

              for(let x in findcurrencies[i]){
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
          let result;
          for(let r = 0;r<=findcurrencies.length;r++){
            for(let f in findcurrencies[r]){
              if(f == myQuery){
                result = findcurrencies[r][myQuery] * amount;
              }
            }
          }

          console.log(result);

          if(isNaN(result)){
            $("#CURR_valDIV").text(`Cant convert ${fromCurrency }to ${toCurrency}`);
          }else{
            $("#CURR_valDIV").removeClass('bgF');
            $("#CURR_valDIV").text(`${amount}  ${fromCurrency} = ${result} ${toCurrency}`);
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

     $("#CURR_valDIV").text(`${initVal} ${fromValue} = ${amount} ${toValue}`);
   });

 });
