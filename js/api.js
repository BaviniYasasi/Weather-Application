const currLocation = $("#loc-current");
const currCountry = $("#loc-country");
const searchFeild =document.getElementById("search");
const currType = $("#weather-condition");
const currCondition = $("#img-weather");

const currDate=new Date().getDay();
const dayArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon","Tue"];
const reverseDayArray =["Sun","Sat","Fri","Thu","Wed","Tue","Mon","Sun","Sat","Fri","Thu","Wed","Tue","Mon","Sun"];
var last7Days = Last7Days ();

findBtnClicked();

function findBtnClicked(){
    $.ajax({
        method : "GET",
        url : `https://api.weatherapi.com/v1/current.json?key=47d04998957e478aae720234232609&q=${searchFeild.value}`,
        success : (resp) => {

            currLocation.text(resp.location.name)
            currCountry.text(resp.location.country)
            
            currType.text(resp.current.condition.text)           
            currCondition.attr("src",resp.current.condition.icon)
            $("#temp").text(resp.current.temp_c+"℃")
            $("#humi").text(resp.current.humidity+"%")
            $("#wind").text(resp.current.wind_kph+"Kmp/h")
            $("#rain").text(resp.current.precip_mm+"mm")
            $("#uv").text(resp.current.uv+"")
            $("#visibility").text(resp.current.vis_km+"")

            forecasat();

            previous();
            myMap(resp);
        }
    });
}

function forecasat(){
    $.ajax({
        method : "GET",
        url : `https://api.weatherapi.com/v1/forecast.json?key=47d04998957e478aae720234232609&q=${searchFeild.value}&days=4`,
        success : (con) => {
            $("#date-1").text(con.forecast.forecastday[1].date)
            $("#date-2").text(con.forecast.forecastday[2].date)
            $("#date-3").text(con.forecast.forecastday[3].date)

            $("#day-1").text(dayArray[currDate+1])
            $("#day-2").text(dayArray[currDate+2])
            $("#day-3").text(dayArray[currDate+3])
            
            $("#img-1").attr("src",con.forecast.forecastday[1].day.condition.icon)
            $("#img-2").attr("src",con.forecast.forecastday[2].day.condition.icon)
            $("#img-3").attr("src",con.forecast.forecastday[3].day.condition.icon)

            $("#fore-con").text(con.forecast.forecastday[1].day.condition.text)
            $("#fore-con-1").text(con.forecast.forecastday[2].day.condition.text)
            $("#fore-con-2").text(con.forecast.forecastday[3].day.condition.text)
            
        }
    })
}

function previous(){
    for(let i=1;i<8;i++){
        $.ajax({
            method : "GET",
            url : `https://api.weatherapi.com/v1/history.json?key=47d04998957e478aae720234232609&q=${searchFeild.value}&dt=${last7Days[i]}`,
            success : (con) => {
                $("#pre-day-"+i).text(con.forecast.forecastday[0].date)
                $("#pre-day-"+i+"-day").text(reverseDayArray[currDate+(i+5)])
                $("#pre-day-"+i+"-img").attr("src",con.forecast.forecastday[0].day.condition.icon)
                $("#pre-day-"+i+"-con").text(con.forecast.forecastday[0].day.condition.text)
                $("#pre-day-"+i+"-temp").text(con.forecast.forecastday[0].day.avgtemp_c+"℃")

            }
        })
    }
}

function Last7Days () {

    var today = new Date();
    var oneDayAgo = new Date(today);
    var twoDaysAgo = new Date(today);
    var threeDaysAgo = new Date(today);
    var fourDaysAgo = new Date(today);
    var fiveDaysAgo = new Date(today);
    var sixDaysAgo = new Date(today);
    var sevenDaysAgo = new Date(today);

    oneDayAgo.setDate(today.getDate() - 1);
    twoDaysAgo.setDate(today.getDate() - 2);
    threeDaysAgo.setDate(today.getDate() - 3);
    fourDaysAgo.setDate(today.getDate() - 4); 
    fiveDaysAgo.setDate(today.getDate() - 5);
    sixDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setDate(today.getDate() - 7);

    var result = [formatDate(today),formatDate(oneDayAgo),formatDate(twoDaysAgo),formatDate(threeDaysAgo),formatDate(fourDaysAgo),formatDate(fiveDaysAgo),formatDate(sixDaysAgo),formatDate(sevenDaysAgo)];
    // var result = result0+","+result1+","+result2+","+result3+","+result4+","+result5+","+result6+","+result7;
    // console.log(result);
    return(result);
}

function formatDate(date){

    // var dd = date.getDate();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    // date = mm+'/'+dd+'/'+yyyy;
    date = yyyy+'-'+mm+'-'+dd;
    return date
 }


function myMap(data) {
    // console.log(data);
    let lati = data.location.lat;
    let lon = data.location.lon;
    // console.log(data.location.lon);
    // console.log(data.location.lat);
    let mapProp = {
      center: new google.maps.LatLng(lati, lon),
      zoom: 12,
    };
  
    let map = new google.maps.Map(document.getElementById("map"), mapProp);
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(lati, lon),
      map: map,
      title: data.location.name,
    });
}
