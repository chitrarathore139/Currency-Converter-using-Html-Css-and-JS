const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const Dropdown= document.querySelectorAll("#dropdown select");
const btn= document.querySelector("form button");

for(let select of Dropdown){
    for(let code in countryList){
        let newOption= document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;

        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && code==="INR"){
            newOption.selected="selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();

    let amount= document.querySelector("#amount input");
    let amtValue=amount.value;

    if(amtValue==="" || amtValue<1){
        amtValue=1;
        amount.value=1;
    }

    let fromCurr = document.querySelector("#from select").value;
    let toCurr = document.querySelector("#to select").value;

    const URL = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;

    let response= await fetch(URL);
    let data= await response.json();

    let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    let finalAmount = amtValue * rate;
    
    let Exchange_result= document.querySelector("#exchange-result");
    Exchange_result.innerText = `${amtValue} ${fromCurr} = ${finalAmount} ${toCurr}`;
});