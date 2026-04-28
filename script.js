const weatherForm = document.querySelector(".weatherForm");
const inputCity = document.querySelector(".inputCity");
const submitButton = document.querySelector(".submitButton");
const cityName = document.querySelector(".cityName");
const cityTemp = document.querySelector(".cityTemp");
const weatherDescription = document.querySelector(".weatherDescription");
const weatherCard = document.querySelector(".weatherCard");
const apiKey = "66cdd89de4ed97dc3a89faf9fcca2f44";
const loading = document.getElementById("loading");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityData = inputCity.value;
  getWeather(cityData);
  cityName.textContent = "";
  cityTemp.textContent = "";
  weatherDescription.textContent = "";
});

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    loading.style.display = "block";
    const weatherData = await fetch(apiUrl);
    const data = await weatherData.json();

    if (!weatherData.ok) {
      cityName.textContent = "Please enter a valid city";
      inputCity.value = "";
      return;
    }

    const convertedTemp = data.main.temp - 273.15;
    cityTemp.textContent = `${convertedTemp.toFixed(2)}°C`;
    cityName.textContent = `${inputCity.value}`;
    weatherDescription.textContent = data.weather[0].description;
    inputCity.value = "";
  } catch (error) {
    console.error(error);
  } finally {
    loading.style.display = "none";
    console.log("Request Completed");
  }
}
