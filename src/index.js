function addCurrentDay(ms) {
  // event.preventDefault();
  let todayDate = new Date(ms);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "october",
    "November",
    "December",
  ];

  let day = days[todayDate.getDay()];

  // let month = months[todayDate.getMonth()];
  // let date = todayDate.getDate();
  let hours = todayDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = todayDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let p = document.querySelector(".current-day");
  p.innerHTML = `Last updated: ${day} ${hours}:${minutes}`;
  return `Last updated: ${day} ${hours}:${minutes}`;
  // h4.innerHTML = `${day}, ${month} ${date}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  // console.log(coordinates);
  let apikey = "ced3d576b797ba5539e509b6bb239e83";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
}

function updateCitynametemp(event) {
  event.preventDefault();
  let userCityInput = document.querySelector("#city-name");
  if (userCityInput.value) {
    let h3 = document.querySelector("h3");
    cityName = userCityInput.value.toUpperCase();
    h3.innerHTML = `${cityName}`;

    let apiKey = "ced3d576b797ba5539e509b6bb239e83";
    function showTemp(response) {
      // console.log(response.data);
      let temperature = Math.round(response.data.main.temp);
      // console.log(temperature);
      let valueOfTemp = document.querySelector("#temp-value");
      valueOfTemp.innerHTML = temperature;

      let iconId = response.data.weather[0].icon;
      let iconDesc = response.data.weather[0].description;

      let icon = document.querySelector("#icon");
      icon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${iconId}@2x.png`
      );
      icon.setAttribute("alt", `${iconDesc}`);

      let tempDescription = document.querySelector(
        ".present-stats .city-timetemp-info .tempdescription"
      );
      tempDescription.innerHTML = response.data.weather[0].description;

      let humid = document.querySelector(".Humidity");
      humid.innerHTML = response.data.main.humidity;

      // let maxTemp = document.querySelector(".max-temp");
      // maxTemp.innerHTML = Math.round(response.data.main.temp_max);

      // let minTemp = document.querySelector(".min-temp");
      // minTemp.innerHTML = Math.round(response.data.main.temp_min);

      let wind = document.querySelector(".Wind");
      wind.innerHTML = Math.round(response.data.wind.speed);

      let dateElement = document.querySelector(".current-day");
      // console.log(response.data.dt);
      let time = response.data.dt * 1000;
      dateElement.innerHTML = addCurrentDay(time);

      getForecast(response.data.coord);
    }
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput.value}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
  } else {
    prompt("please enter a valid city name");
  }
}

function changeTempToF() {
  let tempVariable = document.querySelector(".temp-type");
  if (tempVariable.innerHTML !== "F") {
    let valueOfTemp = document.querySelector("#temp-value");
    let tempinF = valueOfTemp.innerHTML;
    tempinF = Number(tempinF);
    valueOfTemp.innerHTML = Math.round((tempinF * 9) / 5 + 32);

    let updateTempType = document.querySelector(".temp-type");
    updateTempType.innerHTML = "F";
  }
}

function changeTempToC() {
  let tempVariable = document.querySelector(".temp-type");
  // console.log(tempVariable);
  if (tempVariable.innerHTML !== "C") {
    let valueOfTemp = document.querySelector("#temp-value");
    let tempinC = valueOfTemp.innerHTML;
    tempinC = Number(tempinC);
    valueOfTemp.innerHTML = Math.round(((tempinC - 32) * 5) / 9);

    let updateTempType = document.querySelector(".temp-type");
    // console.log(typeof updateTempType);
    updateTempType.innerHTML = "C";
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", updateCitynametemp);

let tempCelsius = document.querySelector("#temp-c");
tempCelsius.addEventListener("click", changeTempToC);

let tempFar = document.querySelector("#temp-f");
tempFar.addEventListener("click", changeTempToF);

function showPresentTemp() {
  function updateTemp(response) {
    console.log(response.data);
    let newTemp = document.querySelector("#temp-value");
    let currentTemp = Math.round(response.data.main.temp);
    // console.log(currentTemp);
    newTemp.innerHTML = `${currentTemp}`;

    let newCity = document.querySelector("h3");
    newCity.innerHTML = response.data.name.toUpperCase();

    let tempDescription = document.querySelector(
      ".present-stats .city-timetemp-info .tempdescription"
    );
    tempDescription.innerHTML = response.data.weather[0].description;

    let iconId = response.data.weather[0].icon;
    let iconDesc = response.data.weather[0].description;

    let icon = document.querySelector("#icon");
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${iconId}@2x.png`
    );
    icon.setAttribute("alt", `${iconDesc}`);

    let wind = document.querySelector(".Wind");
    wind.innerHTML = Math.round(response.data.wind.speed);

    let humid = document.querySelector(".Humidity");
    humid.innerHTML = response.data.main.humidity;

    let dateElement = document.querySelector(".current-day");
    let time = response.data.dt * 1000;
    // debugger;
    dateElement.innerHTML = addCurrentDay(time);
  }

  function showPos(position) {
    // console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // console.log(lat);
    // console.log(lon);
    let apiKey = "ced3d576b797ba5539e509b6bb239e83";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateTemp);
  }
  navigator.geolocation.getCurrentPosition(showPos);
}

let button = document.querySelector("#current-temp-button");
button.addEventListener("click", showPresentTemp);

displayForecast();
