const BASE_URl ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; 

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// add options in select tage in HTML...
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from"&&currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to"&&currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

//add flag according to select option and show on screen...
const updateFlag = (element)=>{
    let currCode=element.value;
    let counteryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${counteryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

// main logic exchange the rate and show on screen...
const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1"
    }
    const URL = `${BASE_URl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; //This will give exchange rate...
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

// add event listener on button...
btn.addEventListener("click",(evt)=>{
    evt.preventDefault(); //cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur...
    updateExchangeRate();
});

// Show 1 USD in INR value, when first time page will load... 
window.addEventListener("load",()=>{
    updateExchangeRate();
});