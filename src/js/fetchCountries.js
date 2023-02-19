const API_URL = `https://restcountries.com/v3.1/name/`;
const params = `fields=name,languages,capital,population,flags`;
const testName = `canada`;

export function fetchCountries(name) {
  return fetch(`${API_URL}${name}?${params}`).then(r => {
    console.log(r);
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}
