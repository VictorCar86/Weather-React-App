export const OPT_GEO_API = (url, params = {}) => ( {
  method: 'GET',
  url: `${url}/cities`,
  params: params,
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
} );

export const GEO_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo"

export const WEATHER_URL = "https://api.openweathermap.org/data/2.5"

export const WEATHER_KEY = process.env.WEATHER_KEY