function addCurrentDay() {
  // event.preventDefault();
  let todayDate = new Date();

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
  let month = months[todayDate.getMonth()];
  let date = todayDate.getDate();
  // let htime = todayDate.getHours();
  // if (htime < 10) {
  //   htime = `0${htime}`;
  // }
  // let mtime = todayDate.getMinutes();
  // if (mtime < 10) {
  //   mtime = `0${mtime}`;
  // }

  let h4 = document.querySelector("h4");
  // h4.innerHTML = `${day}, ${month} ${date}, ${htime}:${mtime}`;
  h4.innerHTML = `${day}, ${month} ${date}`;
}

function updateCitynametemp() {
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

      let tempDescription = document.querySelector(
        ".present-stats .city-timetemp-info .tempdescription"
      );
      // let x = response.weather;
      // console.log(x);
      tempDescription.innerHTML = response.data.weather[0].description;
    }
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput.value}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
  } else {
    prompt("please enter a valid city name");
  }
}

function changeTempToF() {
  let tempVariable = document.querySelector("#temp-type");
  if (tempVariable.innerHTML != "F") {
    let valueOfTemp = document.querySelector("#temp-value");
    let tempinF = valueOfTemp.innerHTML;
    tempinF = Number(tempinF);
    valueOfTemp.innerHTML = Math.round((tempinF * 9) / 5 + 32);

    let updateTempType = document.querySelector("#temp-type");
    updateTempType.innerHTML = "F";
  }
}

function changeTempToC() {
  let tempVariable = document.querySelector("#temp-type");
  // console.log(tempVariable);
  if (tempVariable.innerHTML != "C") {
    let valueOfTemp = document.querySelector("#temp-value");
    let tempinC = valueOfTemp.innerHTML;
    tempinC = Number(tempinC);
    valueOfTemp.innerHTML = Math.round(((tempinC - 32) * 5) / 9);

    let updateTempType = document.querySelector("#temp-type");
    // console.log(typeof updateTempType);
    updateTempType.innerHTML = "C";
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", addCurrentDay);
form.addEventListener("submit", updateCitynametemp);

let tempCelsius = document.querySelector("#temp-c");
tempCelsius.addEventListener("click", changeTempToC);

let tempFar = document.querySelector("#temp-f");
tempFar.addEventListener("click", changeTempToF);

function showPresentTemp() {
  addCurrentDay();
  function updateTemp(response) {
    // console.log(response.data);
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
