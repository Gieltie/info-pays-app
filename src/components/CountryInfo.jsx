import React, { useEffect, useState } from 'react';

function CountryInfo() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error(error));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by country name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid">
        {filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country, index) => (
          <div key={index} className="card">
            <img src={country.flags.png} alt={country.name.common} />
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Population: {country.population}</p>
            <p>Area: {country.area}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryInfo;