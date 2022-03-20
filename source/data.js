function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today];

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
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();

  return `${day}, ${month} ${date} - ${hours}:${minutes}`;
}

let now = new Date();
let h3 = document.querySelector("#current-date");
h3.innerHTML = formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["S", "M", "T", "W", "T", "F", "S"];

  return days[day];
}

//forecast
function formatForecastDate(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let dayDate = forecastDate.getDate();
  let numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  return numbers[dayDate];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    metricHigh = forecastDay.temp.max;
    metricLow = forecastDay.temp.min;
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-sm">
    <span class="futureDay" id="futureDay">${formatDay(forecastDay.dt)}</span>
    <br />
    <span class="futureDate">${formatForecastDate(forecastDay.dt)}</span>
    <br />
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="Clear" id="icon"/>
    <br />
    <span class="tempHigh" id="temp-high">${Math.round(metricHigh)}°</span>
    <br />
    <span class="tempLow" id="temp-low">${Math.round(metricLow)}°</span>
  </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8c9e2e229b27479d87f45960af4a2ad3";
  let apiBase = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl2 = `${apiBase}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(displayForecast);
}

//search by city starts

function showCurrentTemp(response) {
  metricTemperature = response.data.main.temp;
  metricFeels = response.data.main.feels_like;
  metricSpeed = response.data.wind.speed;

  document.querySelector("#temp-number").innerHTML =
    Math.round(metricTemperature);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#speed").innerHTML = Math.round(metricSpeed);
  document.querySelector("#speed-unit").innerHTML = " m/s";
  document.querySelector("#feels-like").innerHTML = Math.round(metricFeels);
  document.querySelector("#feels-unit").innerHTML = "°C";
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  getForecast(response.data.coord);
}

function searchByCity(city) {
  let apiKey = "8c9e2e229b27479d87f45960af4a2ad3";
  let apiBase = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiBase}q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchByCity(city);
}

//geolocation starts

function searchByPosition(position) {
  let apiKey = "8c9e2e229b27479d87f45960af4a2ad3";
  let apiBase = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl1 = `${apiBase}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl1).then(showCurrentTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchByPosition);
}

let hereButton = document.querySelector("#here");
hereButton.addEventListener("click", currentLocation);

//search on load
searchByCity("Mexico City");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
