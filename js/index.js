function refreshTime() {
    const timeDisplay = document.getElementById("time");
    const dateString = new Date().toLocaleTimeString();
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
  }
    setInterval(refreshTime, 1000);

const today = new Date().getDate();
const date=new Date().getDay();
const month = new Date().getMonth();
const year = new Date().getFullYear();
const dayList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturaday"];
const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const fullDate= today+" "+monthList[month]+" "+year;
const currentDay =document.getElementById("day");
const dateName =document.getElementById("day-name");
dateName.textContent= dayList[date];
currentDay.textContent = fullDate;

const nigntMode=document.getElementById("nightModeImg");
const lightMode=document.getElementById("lightModeImg");
themeChange();
let value=0;

function themeChange(){
  nigntMode.addEventListener("click",()=>{
    document.body.style.backgroundImage="url('assets/majid-ghahravi-zade-m7icn_RxeD4-unsplash.jpg')"
  });
  lightMode.addEventListener("click",()=>{
    document.body.style.backgroundImage="url('assets/dominik-schroder-FIKD9t5_5zQ-unsplash.jpg')"
    
  });
}

// function findBtnClicked(){
//     const searchFeild = $("#search");
//      console.log(searchFeild.val());
    
//      var typedText = searchFeild.val();

//      const cityName = $("#");
//      cityName.text(typedText);
// }


