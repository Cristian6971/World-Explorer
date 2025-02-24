const BASE_URL = "https://restcountries.com/v3.1";

export const endpoints = {
  allCountries: `${BASE_URL}/all`,
  countryByName: (name) => `${BASE_URL}/name/${name}`,
  countryByCode: (code) => `${BASE_URL}/alpha/${code}`,
  region: (region) => `${BASE_URL}/region/${region}`,
};
