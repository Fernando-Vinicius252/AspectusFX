const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");
const apiKey = atob("MThmZGZiNzAxZjU5M2FkMjgzZTE2NzNl");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_code) {
    //selecionando BRL por padrão como moeda DE e USD como moeda PARA
    let select;
    if(i == 0){
      select = currency_code == "BRL" ? "selected" : "";
    }else if(i == 1){
      select = currency_code == "USD" ? "selected" : "";
    }
    // criando tag de opção com passagem de código de moeda como texto e valor
    let optionTag = `<option value="${currency_code}" ${select}>${currency_code}</option>`;
    // inserindo tag options dentro da tag select
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", e=>{
    loadFlag(e.target); //chamando loadflag passando o elemento alvo como argumento
  });
}

function loadFlag(element){
  for (code in country_code){
    if(code == element.value){
      let imgTag = element.parentElement.querySelector("img"); //selecionando a tag img de uma lista suspensa específica
      // passando o código do país do código da moeda selecionada em uma url img
      imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
    }
  }
}

window.addEventListener("load", () =>{
  getExchangeRate();
});

getButton.addEventListener("click", e =>{
  e.preventDefault(); //impedindo o envio do formulário
  getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon")
exchangeIcon.addEventListener("click", ()=>{
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
  
});

function getExchangeRate(){
  const amount = document.querySelector(".amount input");
  const exchangeRateTxt = document.querySelector(".exchange-rate");
  let amountVal = amount.value;
  if(amountVal == "" || amountVal == "0"){
    amount.value = "1";
    amountVal = 1;
  }

  exchangeRateTxt.innerText = "Obtendo valor de conversão...";
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  fetch(url).then(response => response.json()).then(result =>{
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
  })
}