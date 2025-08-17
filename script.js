// ✅ Your OpenWeatherMap API key
const apiKey = "4137ca4c11ae79d06425174c5cf3c35f";

async function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");

  if (city === "") {
    result.innerHTML = "⚠️ Please enter a city name!";
    return;
  }

  try {
    // Fetch weather data from OpenWeatherMap API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      result.innerHTML = "❌ City not found!";
      return;
    }

    // Display weather information
    result.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌍 Condition: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    result.innerHTML = "⚠️ Error fetching weather data!";
    console.error(error); // Optional: log error for debugging
  }
}

// ✅ Add "Enter key" listener
document.getElementById("city").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    getWeather();
  }
});
