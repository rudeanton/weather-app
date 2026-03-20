const apiKey = "b45d2b8d899d23bc4cb2b629e71b39bc";
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const cityEl = document.querySelector(".cityDisplay");
const tempEl = document.querySelector(".tempDisplay");
const humidityEl = document.querySelector(".humidityDisplay");
const descEl = document.querySelector(".descDisplay");
const emojiEl = document.querySelector(".emojiDisplay");
const cardEl = document.querySelector(".card");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // removing auto refresh
  inputData = input.value;
  cardEl.style.display = "flex";

  if (inputData) {
    try {
      const weatherData = await getWeatherData(inputData);
      displayWeatherInfo(weatherData);
    } catch (error) {
      displayError(error);
    }
  } else {
    console.log("Pleas enter a city");
  }
});

async function getWeatherData(inputData) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&appid=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("Repsonse cannot be fetched");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name,
    main: { temp, humidity },
    weather: [{ main: description, id }],
  } = data;

  cityEl.textContent = name;
  tempEl.textContent = `${Math.round(temp - 273)}°C`;
  humidityEl.textContent = `Humidity: ${humidity}%`;
  descEl.textContent = description;
  emojiEl.textContent = getEmoji(id);
}

function getEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      return "😶‍🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId > 800 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  cityEl.textContent = message;
  tempEl.textContent = "";
  humidityEl.textContent = "";
  descEl.textContent = "";
  emojiEl.textContent = "";
}
