//todo MAIN

const images = ["../images/img15inh.jpg", "../images/img22inh.jpg", "../images/img17inh.jpg"];
const circles = document.querySelectorAll(".circle");
const bgi = document.querySelector(".main");

const removeGreen = () =>{
    circles.forEach(circle => circle.classList.remove("active"));
}

circles.forEach((circle, index) => {
    circle.onclick = () => {
        removeGreen()
        bgi.style.backgroundImage = `url("${images[index]}")`;
        circles[index].classList.add("active");
        intervalIndex = index
    }
})
let intervalIndex = 1
setInterval(()=>{
    removeGreen()
    bgi.style.backgroundImage = `url("${images[intervalIndex]}")`;
    circles[intervalIndex].classList.add("active");
    intervalIndex++
    if(intervalIndex === circles.length){
        intervalIndex=0
    }
},5000)

//todo SLIDER
const sliderItems = document.querySelectorAll(".sliderItem");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const sliderTexts = document.querySelectorAll(".sliderText");
const slider = document.querySelector(".slider");
const activeSlider = document.querySelector(".activeSlider");



let indexSlide = 0


const getData = async () => {
    try {
        const response = await fetch("../json/index_slider.json")
        const datas = await response.json();

        sliderItems.forEach((item, index) => {
            item.style.backgroundImage = datas[index].img;
            sliderTexts[index].innerText = datas[index].text;
        })
        let bgUrl = activeSlider.style.backgroundImage;
        slider.style.backgroundImage = bgUrl;

        prevBtn.onclick = () => {
            sliderItems.forEach((item, index) =>{
                item.style.backgroundImage = datas[indexSlide].img;
                sliderTexts[index].innerText = datas[indexSlide].text;
                indexSlide++
                if(indexSlide === 4) indexSlide = 0;
            })
            let bgUrl = activeSlider.style.backgroundImage;
            slider.style.backgroundImage = bgUrl;


        }
        nextBtn.onclick = () => {
            indexSlide++
            if(indexSlide === 4) indexSlide = 0;
            let innerIndex = indexSlide
            sliderItems.forEach((item, index) =>{
                item.style.backgroundImage = datas[innerIndex].img;
                sliderTexts[index].innerText = datas[innerIndex].text;
                innerIndex++
                if (innerIndex === 4) innerIndex = 0
                // Animation(innerIndex)
            })
            let bgUrl = activeSlider.style.backgroundImage;
            slider.style.backgroundImage = bgUrl;
        }
        slider.style.backdropFilter = "blur(1px)";
    } catch(error) {
        console.log(error)
    } finally {
        console.log('finally')
    }
}

getData()




