// js/modules/weather.js
// Widget de clima ao vivo para Florianópolis usando Open-Meteo (gratuito, sem API key)

(function () {
  const LAT = -27.5954;
  const LON = -48.5480;
  const REFRESH_MS = 15 * 60 * 1000; // 15 minutos

  const $ = (id) => document.getElementById(id);

  // Mapeia códigos WMO (Open-Meteo) para emoji + descrição PT-BR
  function weatherInfo(code) {
    const map = {
      0:  { icon: "☀️", desc: "Céu limpo" },
      1:  { icon: "🌤️", desc: "Principalmente limpo" },
      2:  { icon: "⛅", desc: "Parcialmente nublado" },
      3:  { icon: "☁️", desc: "Nublado" },
      45: { icon: "🌫️", desc: "Nevoeiro" },
      48: { icon: "🌫️", desc: "Nevoeiro com geada" },
      51: { icon: "🌦️", desc: "Garoa leve" },
      53: { icon: "🌦️", desc: "Garoa moderada" },
      55: { icon: "🌧️", desc: "Garoa intensa" },
      61: { icon: "🌧️", desc: "Chuva leve" },
      63: { icon: "🌧️", desc: "Chuva moderada" },
      65: { icon: "🌧️", desc: "Chuva forte" },
      71: { icon: "🌨️", desc: "Neve leve" },
      73: { icon: "🌨️", desc: "Neve moderada" },
      75: { icon: "🌨️", desc: "Neve forte" },
      80: { icon: "🌦️", desc: "Pancadas leves" },
      81: { icon: "🌧️", desc: "Pancadas moderadas" },
      82: { icon: "⛈️", desc: "Pancadas violentas" },
      95: { icon: "⛈️", desc: "Trovoada" },
      96: { icon: "⛈️", desc: "Trovoada com granizo" },
      99: { icon: "⛈️", desc: "Trovoada forte com granizo" },
    };
    return map[code] || { icon: "🌡️", desc: "Condição desconhecida" };
  }

  async function updateWeather() {
    // Se o widget não está na página, não faz nada
    if (!$("weather-temp")) return;

    try {
      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${LAT}&longitude=${LON}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
        `&hourly=precipitation_probability` +
        `&timezone=America/Sao_Paulo`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Falha na API");

      const data = await res.json();
      const current = data.current;
      const info = weatherInfo(current.weather_code);

      // Temperatura e condição
      $("weather-temp").textContent = Math.round(current.temperature_2m);
      $("weather-condition").textContent = info.desc;
      $("weather-icon").textContent = info.icon;

      // Detalhes
      $("weather-feels").textContent = Math.round(current.apparent_temperature) + "°C";
      $("weather-humidity").textContent = current.relative_humidity_2m + "%";
      $("weather-wind").textContent = Math.round(current.wind_speed_10m) + " km/h";

      // Probabilidade de chuva na hora atual
      const nowHour = new Date().getHours();
      const hourlyIndex = data.hourly.time.findIndex((t) =>
        new Date(t).getHours() === nowHour
      );
      const rainProb =
        hourlyIndex >= 0 ? data.hourly.precipitation_probability[hourlyIndex] : "--";
      $("weather-rain").textContent = rainProb + "%";

    } catch (err) {
      console.warn("Clima indisponível:", err);
      $("weather-condition").textContent = "Clima indisponível no momento";
      $("weather-temp").textContent = "--";
    }
  }

  // Roda quando o widget for injetado na página
  document.addEventListener("DOMContentLoaded", () => {
    // Espera o includes.js terminar de injetar os componentes
    const tryUpdate = () => {
      if ($("weather-temp")) {
        updateWeather();
        setInterval(updateWeather, REFRESH_MS);
      } else {
        setTimeout(tryUpdate, 300);
      }
    };
    tryUpdate();
  });

})();