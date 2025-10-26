import { useState } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../api/weather";

type Weather = {
  name: string;
  main: { temp: number; humidity: number; feels_like: number };
  weather: { description: string; icon: string; main: string }[];
  wind: { speed: number };
  sys: { country: string };
};

export default function WeatherCard() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  const search = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setError(null);
    setLoading(true);
    
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const detect = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setError(null);
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const data = await fetchWeatherByCoords(lat, lon);
          setWeather(data);
          setCity(data.name);
        } catch (e) {
          const error = e as Error;
          setError(error.message);
          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        let errorMessage = "Location permission denied";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
            break;
        }
        setError(errorMessage);
        setLoading(false);
      },
      {
        timeout: 10000,
        enableHighAccuracy: false
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="border border-slate-600 rounded-3xl p-8 bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-600/50">
        <div className="w-10 h-10 bg-cyan-600/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-100">Weather</h3>
      </div>

      {/* Search & Detect Buttons Inside */}
      <div className="space-y-3 mb-7">
        <input 
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200" 
          value={city} 
          onChange={e => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name..." 
          disabled={loading}
        />
        
        <button 
          onClick={search} 
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-lg hover:shadow-cyan-500/50 hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
          {loading ? "..." : "Search"}
        </button>
        
        <button 
          onClick={detect} 
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>📍 Detect Location</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-8 bg-slate-700/40 rounded-2xl border border-slate-600/50">
          <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-cyan-500"></div>
            <span className="text-slate-300 font-medium">Fetching weather...</span>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="p-5 bg-red-900/20 border-2 border-red-700/50 rounded-2xl text-red-200 mb-5 flex items-start gap-3">
          <svg className="w-6 h-6 mt-0.5 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 5v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div className="font-bold">Error</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        </div>
      )}

      {/* Weather Display */}
      {weather && (
        <div className="space-y-5">
          {/* Main Weather Section */}
          <div className="p-5 bg-slate-700/40 border border-slate-600 rounded-xl text-slate-100">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex-1 min-w-0">
                <div className="text-xl font-bold text-white truncate">{weather.name}</div>
                <div className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                  <span>🗓️</span>
                  <span>{new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description}
                className="w-14 h-14 flex-shrink-0 drop-shadow-lg"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="text-5xl font-black text-cyan-400">{Math.round(weather.main.temp)}°</div>
                <div className="text-sm text-slate-300 capitalize font-medium">{weather.weather[0].description}</div>
                <div className="text-xs text-slate-400 mt-2">Feels {Math.round(weather.main.feels_like)}°C</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2 bg-emerald-600/10 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <div className="text-xs">
                    <div className="text-slate-400">Humidity</div>
                    <div className="text-emerald-300 font-bold">{weather.main.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-sky-600/10 rounded-lg">
                  <svg className="w-5 h-5 text-sky-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                  </svg>
                  <div className="text-xs">
                    <div className="text-slate-400">Wind</div>
                    <div className="text-sky-300 font-bold">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}