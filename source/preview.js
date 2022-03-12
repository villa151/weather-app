function WeatherForecastPreview(props) {
  function day() {
    let date = new Date(props.data.dt * 1000);
    let fDay = date.getDay();
    let days = ["S", "M", "T", "W", "T", "F", "S", "S"];
    return days[fDay];
  }

  function maxTemperature() {
    let temperature = Math.round(props.data.temp.max);

    return `${temperature}°`;
 }

  function minTemperature() {
    let temperature = Math.round(props.data.temp.min);

    return `${temperature}°`;
  }


let now = new Date();
let h3 = document.querySelector("#current-date");
h3.innerHTML = formatDate(now);

  return (
    <div className="forecast">
      <div className="futureDay">{day()}</div>
      <WeatherIcon code={props.data.weather[0].icon} size={38} />
      <div className="forecast-temperature">
        <span className="forecast-temperature-max">{maxTemperature()}</span>
        <span className="forecast-temperature-min">{minTemperature()}</span>
      </div>
    </div>
  );
} 





document.querySelector("tempHigh").innerHTML =
  response.data.main.daily.temp.max;


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showForecast);



//forecast
function forecast(response) {
  let apiKey = "8c9e2e229b27479d87f45960af4a2ad3";
  let apiBase = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl2 = `${apiBase}lat=${response.coords.latitude}&lon=${response.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(showCurrentTemp);
}
function showForecast(event) {
  event.preventDefault();
  let response = document.querySelector("#search-input").value;
  forecast(response);
}

