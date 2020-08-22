window.addEventListener("load", () => {
  let longtitude;
  let latitude;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  //getting current long/lat
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longtitude = position.coords.longitude;
      latitude = position.coords.latitude;

      // API connection
      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=b76b2c10a8663a76702c8c94a86561a5`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //set Icon
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }
  //setting icons depending on weather condition
  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
