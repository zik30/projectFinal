//todo  PHONE BLOCK

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/   //maska

phoneButton.onclick = ()=>{
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    }else{
        phoneResult.innerHTML = 'Invalid Phone Number'
        phoneResult.style.color = 'red'
    }
}

//todo TAB SLIDER

const blocks = document.querySelectorAll('.tab_content_block')
const items = document.querySelectorAll('.tab_content_item')
const itemsParent = document.querySelector('.tab_content_items')

const hideContent = () =>{
    blocks.forEach((block) => {
        block.style.display = 'none'
    })
    items.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showContent = (index = 0) =>{
    blocks[index].style.display = 'block'
    items[index].classList.add('tab_content_item_active')
}
hideContent()
showContent()

let count = 0
let intervals = setInterval(() => {
    hideContent()
    showContent(count++)

    if( count === items.length ){
        count=0
    }
},3000)

itemsParent.onclick = (event)=>{
    if(event.target.classList.contains('tab_content_item')){
        items.forEach( (item, index) => {
            if(event.target === item){
                hideContent()
                showContent(index)
                count = index
            }
        })
    }
}


// todo  CONVERTER

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');


const converter = (element, targetElement1, targetElement2) => {
    element.oninput =() => {
        const getData = async () =>{
            try {
                const response = await fetch('../json/lessons.json')
                const data = await response.json();


                if (targetElement1.id ==="som" && targetElement2.id ==="eur") {
                    targetElement1.value = (element.value*data.usd).toFixed(2);
                    targetElement2.value = (targetElement1.value/data.eur).toFixed(2);
                }
                if (targetElement1.id ==="usd" && targetElement2.id === "eur") {
                    targetElement1.value = (element.value/data.usd).toFixed(2);
                    targetElement2.value = (element.value/data.eur).toFixed(2);
                }
                if(targetElement1.id ==="usd" && targetElement2.id === "som") {
                    targetElement2.value = (element.value * data.eur).toFixed(2);
                    targetElement1.value = (targetElement2.value / data.usd).toFixed(2);
                }
                if (element.value === "") {
                    targetElement1.value ="";
                    targetElement2.value ="";
                }
            } catch(error) {
                console.log(error)
            } finally {
                console.log('finally')
            }



        }
        getData()
    }
}
converter(usdInput, somInput, eurInput);
converter(somInput, usdInput, eurInput);
converter(eurInput, usdInput, somInput);


//todo WEATHER

const searchInput = document.querySelector('.cityName');
const searchBtn = document.querySelector('#search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const API_URL = "http://api.openweathermap.org/data/2.5/weather"
const API_KEY = "e417df62e04d3b1b111abeab19cea714"

searchBtn.onclick = () => {
    searchBtn.onclick = () => {
        const getData = async() =>{
            try {
                const response = await fetch(`${API_URL}?appid=${API_KEY}&q=${searchInput.value}&units=metric&lang=RU`)
                const data = await response.json();
                city.innerHTML = data.name || "город не найден"
                temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp) +'&deg;C' : "noooo"
            } catch(error) {
                console.log(error)
            } finally {
                console.log('finally')
            }
        }
        getData()
    }
}