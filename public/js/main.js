const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector(".middle_layer"); //div gate by class name

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = "";
    if(cityName){
        cityVal = cityName.value;
    }

    if(cityVal === ""){
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add('data_hide');
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&APPID=0397238dff0418b06c4e21af6c6f45d2`;
            const response = await fetch(url);
            const data =await response.json(); // convert for object await for sometime wait
            const arrData = [data];
            
            city_name.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerHTML = arrData[0].main.temp;

            /* get weather icon from weather api */
            var iconcode = arrData[0].weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $('#wicon').attr('src', iconurl);


            const tempStatus = arrData[0].weather[0].main;

            console.log(tempStatus);
            // condition to check sunny or cloudy
            if (tempStatus == "Sunny") {
                temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            }else if (tempStatus == "Clouds") {
                temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempStatus == "Rainy") {
                temp_status.innerHTML =
                "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            }

            datahide.classList.remove('data_hide');


        }catch{
            city_name.innerText = `Plz Enter The City Name Properly`;
            datahide.classList.add('data_hide');
        }
    }
}

const getCurrentDay =()=>{
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tueday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let days = weekday[currentTime.getDay()]; // it gives 0,1,... 0  means monday
    const day = document.getElementById('day');

    day.innerText = days;
};

const getCurrentTime = ()=>{

    var months =[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();

    let hours = now.getHours();
    let mins = now.getMinutes();

    let periods = "AM";

    if(hours > 11){
        periods = "PM";
        if(hours>12)hours -=12;
    }
    if(mins<10){
        mins = "0"+mins; // if 10:05 instead of 10:5
    }

    const today_date = document.getElementById('today_date');

    today_date.innerText = `${month} ${date} | ${hours}:${mins}${periods}`;
    
};

getCurrentDay();
getCurrentTime();



submitBtn.addEventListener('click',getInfo);