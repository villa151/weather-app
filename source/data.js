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

//search by city starts

function showCurrentTemp(response) {
  metricTemperature = response.data.main.temp;
  metricFeels = response.data.main.feels_like;

  document.querySelector("#temp-number").innerHTML =
    Math.round(metricTemperature);
  document.querySelector("#current-city").innerHTML = response.data.name;
  //document.querySelector("#fahrenheit-link").innerHTML = "°C";
  //document.querySelector("#celsius-link").innerHTML = "°F";
  document.querySelector("#feels-like").innerHTML = Math.round(metricFeels);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon-1")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon-1")
    .setAttribute("alt", response.data.weather[0].description);
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
//forecast
function forecast(response) {
  let apiKey = "8c9e2e229b27479d87f45960af4a2ad3";
  let apiBase = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl2 = `${apiBase}lat=${response.coords.latitude}&lon=${response.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(showCurrentTemp);
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

//units;

function convertToCelsius(event) {
  event.preventDefault();
  //fahrentheit.classlist.remove("active");
  //celsius.classlist.add("active");
  document.querySelector("#temp-number").innerHTML =
    Math.round(metricTemperature);
  document.querySelector("#feels-like").innerHTML = Math.round(metricFeels);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  //celsius.classlist.remove("active");
  //fahrentheit.classlist.add("active");
  document.querySelector("#temp-number").innerHTML = Math.round(
    (metricTemperature * 9) / 5 + 32
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    (metricFeels * 9) / 5 + 32
  );
}

let metricTemperature = null;
let metricFeels = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

//search on load
searchByCity("Mexico City");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
