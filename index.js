const weatherBtn = document.getElementById("WeatherBtn");
let locationParam = "";

weatherBtn.addEventListener("click", function () {
  const searchBox = document.getElementById("search");
  let value;

  if (searchBox.style.display == "none") {
    value = locationParam;
  } else {
    value = searchBox.value;
  }
  // console.log(`https://api.weatherapi.com/v1/current.json?key=a58fadd816fc4dfda12132437220903&q=${city}&aqi=no`);

  let url = `https://api.weatherapi.com/v1/current.json?key=a58fadd816fc4dfda12132437220903&q=${value}&aqi=no`;

  const weatherPromise = fetch(url);

  weatherPromise
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(document.getElementById("weather_icon").src);

      console.log(data);
      document.getElementById("message").innerHTML = "";
      document.getElementById("temp").innerHTML = data.current.temp_c + "℃";
      document.getElementById("weather_icon").src = data.current.condition.icon;
      document.getElementById("date").innerHTML =
        data.current.last_updated.split(" ")[0];
      document.getElementById("time").innerHTML =
        data.current.last_updated.split(" ")[1];
    })
    .catch(() => {
      document.getElementById("message").innerHTML = "Incorrect City";
      document.getElementById("date").innerHTML = "----:--:--";
      document.getElementById("time").innerHTML = "--:--";
      document.getElementById("weather_icon").src = "weather.png";
      document.getElementById("temp").innerHTML = "-℃";
    });
});

// changing color of locationBtn and hiding and showing searchBox
const locationBtn = document.getElementById("locationBtn");
const alterColor = locationBtnHandler();

locationBtn.addEventListener("click", function () {
    getLocation();
    alterColor();
});

function locationBtnHandler() {
  var i = 0;

  function changeColor() {
    if (i % 2 == 0) {
      document.getElementById("search").style.display = "none";
      locationBtn.style.backgroundColor = "#5252f5";
    } else {
      document.getElementById("search").style.display = "initial";
      locationBtn.style.backgroundColor = "#efefef";
    }

    i++;
  }

  return changeColor;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function geoSuccess(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  locationParam = lat + "," + lng;
  console.log(locationParam);
}
function geoError() {
    alert("Geocoder failed.");
}