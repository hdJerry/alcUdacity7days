
function convertCurrency(amount, fromCurrency, toCurrency, cb) {

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  let query = fromCurrency + '_' + toCurrency;

  let url = 'https://free.currencyconverterapi.com/api/v5/convert?q='+ query;

      let data = {};

      $.ajax({
        url  : url,
        type : 'get',
        data : data,
        success : (res) =>{
          console.log(res.results[query]);
          let val = res.results[query].val;
          let total = val * amount;
          if(total != null || total != undefined || total != 0){
            $("#CURR_valDIV").removeClass('bgF');

          }
              cb(null, Math.round(total * 100) / 100);

        },
        error : (err) =>{
          console.log(err);
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

     $("#CURR_valDIV").text(initVal+" "+fromValue+" is equivalent to "+amount+" "+ toValue);
   });

 });
