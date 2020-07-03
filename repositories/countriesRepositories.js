//const countries = require('../repositories/CountriesMockdata');
const countries = require('./CountriesMockdata');
const { json } = require('express');

exports.getCountry = (countryName) => {
    const wantedCountries = countries.filter( country => country.domainName === countryName);
    return wantedCountries;
} 

// exports all countries
exports.getAllCountries = () => countries;

//delete country
exports.deleteCountry = (countryName) => {
    const remainingCountries = countries.filter( country => country.domainName !== countryName);
    return remainingCountries;
}



