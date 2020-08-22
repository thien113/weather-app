const api = {
  key: "b76b2c10a8663a76702c8c94a86561a5",
  base: "https://api.openweathermap.org/data/2.5/",
};
// define weatherIcons
var weatherIcons;
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  document.getElementById("icon").classList.remove(icon);
  let weather_el = document.getElementById("icon").classList.add(icon);
  //document.querySelector(".current .weather");
  var prefix = "wi wi-";
  var code = weather.weather[0].id.toString();
  console.log("Code:", code, "Typ", typeof code);
  var icon = weatherIcons[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = "day-" + icon;
  }

  // Finally tack on the prefix.
  icon = prefix + icon;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `Min.: ${Math.round(
    weather.main.temp_min
  )}°c / Max.: ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
  let months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  let days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
