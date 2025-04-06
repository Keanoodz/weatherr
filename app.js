const apiKey = "5769f986a52495d00e616774475c445c"; // Vul hier je API-sleutel in

// Haal het weer op op basis van stad
function getWeather() {
  const city = document.getElementById("city").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        alert("City not found");
      } else {
        displayWeather(data);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while fetching the weather data.");
    });
}

// Haal het weer op op basis van de geolocatie van de gebruiker
function getWeatherByGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          displayWeather(data);
        })
        .catch(error => {
          console.error("Error:", error);
          alert("An error occurred while fetching the weather data.");
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Functie om het weer weer te geven en achtergrond aan te passen
function displayWeather(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const icon = data.weather[0].icon;

  // Stel de achtergrond in op basis van de weersomstandigheden
  setBackground(description);

  // Toon de stad en het weer met emoji
  document.getElementById("city-name").innerText = `Weather in ${cityName} ${getWeatherEmoji(description)}`;
  document.getElementById("temperature").innerText = `Temperature: ${temperature}°C 🌡️`;
  document.getElementById("description").innerText = `Description: ${description} ${getWeatherEmoji(description)}`;
  document.getElementById("humidity").innerText = `Humidity: ${humidity}% 💧`;
  document.getElementById("wind").innerText = `Wind Speed: ${windSpeed} m/s 🌬️`;
}

// Functie om weer-emoji's te krijgen op basis van de weersomstandigheden
function getWeatherEmoji(description) {
  if (description.includes("clear")) {
    return "☀️";
  } else if (description.includes("cloud")) {
    return "☁️";
  } else if (description.includes("rain")) {
    return "🌧️";
  } else if (description.includes("snow")) {
    return "❄️";
  } else if (description.includes("storm")) {
    return "⛈️";
  } else {
    return "🌤️";
  }
}

// Functie om de achtergrond in te stellen op basis van de weersomstandigheden
function setBackground(description) {
  if (description.includes("clear")) {
    document.body.style.backgroundImage = "url('https://www.w3schools.com/w3images/sunset.jpg')";
    document.body.style.backgroundSize = "cover";
  } else if (description.includes("cloud")) {
    document.body.style.backgroundImage = "url('https://www.w3schools.com/w3images/clouds.jpg')";
    document.body.style.backgroundSize = "cover";
  } else if (description.includes("rain")) {
    document.body.style.backgroundImage = "url('https://www.w3schools.com/w3images/rain.jpg')";
    document.body.style.backgroundSize = "cover";
  } else if (description.includes("snow")) {
    document.body.style.backgroundImage = "url('https://www.w3schools.com/w3images/snow.jpg')";
    document.body.style.backgroundSize = "cover";
  } else if (description.includes("storm")) {
    document.body.style.backgroundImage = "url('https://www.w3schools.com/w3images/storm.jpg')";
    document.body.style.backgroundSize = "cover";
  } else {
    document.body.style.backgroundImage = "url('https://www.w3schools.com/w3images/forest.jpg')";
    document.body.style.backgroundSize = "cover";
  }
}
