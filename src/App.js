import { FormControl, Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InfoBox from "./InfoBox";
import './App.css';

function App() {

  const [countries, setContries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name : country.country,
            value : country.countryInfo.iso2
          }
        ));
        setContries(countries); 
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select 
          variant="outlined"
          onChange={onCountryChange}
          value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country=>
              <MenuItem value={country.value}>{country.name}</MenuItem>
            )
            }
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
          <InfoBox 
          title="Coronavirus Cases"
          cases="dvc"
          total="sdff"
          />
          <InfoBox 
          title="Recovered"
          cases="dvc"
          total="sdff"
          />
          <InfoBox 
          title="Deaths"
          cases="dvc"
          total="sdff"
          />
      </div>
    </div>
  );
}

export default App;
