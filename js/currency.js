let currency = {};
$("#overlay").hide();
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
           is displayed to.
           Set() was used so that the values gotten from IndexedDB
           wont have any replication.
           *******************************************************/

          let enlist = new Set();

          let list = document.querySelector('#OfflineList');
          $('.added').empty();

          let findcurrencies = db.collection('converted').find();


            for(let i=0; i<=findcurrencies.length;i++){

            for(let x in findcurrencies[i]){
              if(x != 'CURRENCY'){

               enlist.add(x);

              }

            }

        }

        let sNum = 1;
        let interval = setInterval(myTimer,1000);
        const genIterator = getcurrencies();

          function* getcurrencies(){
            for(let g of enlist){

              let tr = document.createElement('tr');
              tr.setAttribute('class','added');

              let tdN = document.createElement('td');
              let txtN = document.createTextNode(sNum);
              tdN.appendChild(txtN);
              tr.appendChild(tdN);

              let tdV = document.createElement('td');
              let txtV = document.createTextNode(g);
              tdV.appendChild(txtV);
              tr.appendChild(tdV);

              list.appendChild(tr);


              sNum++;

                 yield;

          }

        }

        function myTimer(){
          if(genIterator.next().done == false){
            $('#getAmount').prop('disabled',true);
          }else{
            $('#getAmount').prop('disabled',false);

          }
          genIterator.next();



        }


          let val = res[query].val;
          let total = val * amount;

          if(total != null || total != undefined || total != 0){
            $("#overlay").hide();


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
          Set() was used so that the values gotten from IndexedDB
          wont have any replication.
          *****************************************************************/
          if(findcurrencies.length < 1 ){
            $("#CURR_valDIV").text('Unable to convert please check Network connection');

          }else{

            let enlist = new Set();

            let list = document.querySelector('#OfflineList');
            $('.added').empty();

            let findcurrencies = db.collection('converted').find();


              for(let i=0; i<=findcurrencies.length;i++){

              for(let x in findcurrencies[i]){
                if(x != 'CURRENCY'){

                 enlist.add(x);

                }

              }

          }
          let sNum = 1;
          let interval = setInterval(myTimer,1000);
          const genIterator = getcurrencies();

            function* getcurrencies(){
              for(let g of enlist){

                let tr = document.createElement('tr');
                tr.setAttribute('class','added');

                let tdN = document.createElement('td');
                let txtN = document.createTextNode(sNum);
                tdN.appendChild(txtN);
                tr.appendChild(tdN);

                let tdV = document.createElement('td');
                let txtV = document.createTextNode(g);
                tdV.appendChild(txtV);
                tr.appendChild(tdV);

                list.appendChild(tr);


                sNum++;

                   yield;
            }

          }

          function myTimer(){

            genIterator.next();

          }



          let result;
          for(let r = 0;r<=findcurrencies.length;r++){
            for(let f in findcurrencies[r]){
              if(f == myQuery){
                result = findcurrencies[r][myQuery] * amount;
              }
            }
          }

          if(isNaN(result)){
            $("#CURR_valDIV").text(`Not Available Offline`);
          }else{
            $("#overlay").hide();
            $('#getAmount').prop('disabled',false);

            $("#CURR_valDIV").text(`${result}`);
          }



          }

        }

      });

}


/*****************************************
      Convert currency Button Trigger
*****************************************/
 $("#getAmount").on('click',()=>{


   $("#overlay").show();
   $("#CURR_valDIV").text('');
   $('#getAmount').prop('disabled',true);

  /******************************************************
              Getting the input values
  ******************************************************/
   let initVal = document.querySelector("#init_Val").value;
   let curFrom = document.querySelector('#CURR_FR');
   let fromValue = curFrom.options[curFrom.selectedIndex].value;

   let curTo = document.querySelector('#CURR_TO');
   let toValue = curTo.options[curTo.selectedIndex].value;

   convertCurrency(initVal, fromValue, toValue, (err, amount) => {

     $("#CURR_valDIV").text(`${amount}`);
   });

 });
