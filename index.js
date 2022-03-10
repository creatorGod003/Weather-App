const weatherBtn = document.getElementById("WeatherBtn");
weatherBtn.addEventListener('click', function(){

const city = document.getElementById("search").value;
console.log(`https://api.weatherapi.com/v1/current.json?key=a58fadd816fc4dfda12132437220903&q=${city}&aqi=no`);

const weatherPromise  = fetch(`https://api.weatherapi.com/v1/current.json?key=a58fadd816fc4dfda12132437220903&q=${city}&aqi=no`);

weatherPromise.then((data)=>{

    return data.json();

}).then((data)=>{

    console.log(document.getElementById("weather_icon").src);

    console.log(data);
    document.getElementById("message").innerHTML = "";
    document.getElementById("temp").innerHTML = data.current.temp_c+"℃";
    document.getElementById("weather_icon").src = data.current.condition.icon;
    document.getElementById("date").innerHTML = data.current.last_updated.split(" ")[0];
    document.getElementById("time").innerHTML = data.current.last_updated.split(" ")[1];

}).catch(()=>{

    document.getElementById("message").innerHTML = "Incorrect City";
    document.getElementById("date").innerHTML = '----:--:--';
    document.getElementById("time").innerHTML = '--:--';
    document.getElementById("weather_icon").src = "weather.png";
    document.getElementById("temp").innerHTML = "-℃";

});

});


