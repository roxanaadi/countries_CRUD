const countryRepositories = require('../repositories/countriesRepositories');
const uuid = require('uuid'); //uuid needs to be installed

//get all countries
exports.getAllCountries = (req, res) => res.success(countryRepositories.getAllCountries());

//get a single country
exports.getCountry = (req, res) => {
             const {availableCountries} = req;
             res.success(availableCountries);
};

// post/add a country
exports.postCountry = (req, res) => {
            const {id = uuid.v4(), name, capital} = req.body;
            newCountry = {
                id, 
                name, 
                capital
            };

            const countries = countryRepositories.getAllCountries();
            const finalCountriesList = [...countries, newCountry];
            // countries.push(newCountry);
            res.success(finalCountriesList);
};

//update Country 
exports.updateCountry = (req, res) => {
    
    const {availableCountries} = req;
    const wantedCountryUpdates = req.body;
    const updatedCountry = availableCountries[0];

    updatedCountry.name = wantedCountryUpdates.name ? wantedCountryUpdates.name : updatedCountry.name;
    updatedCountry.capital = wantedCountryUpdates.capital ? wantedCountryUpdates.capital : updatedCountry.capital;
    updatedCountry.population = wantedCountryUpdates.population ? wantedCountryUpdates.population : updatedCountry.population;
    
    res.success(availableCountries);
} 

//delete country
exports.deleteCountry = (req, res) => {
    const {countryName, remainingCountries} = req;
    res.success({msg: `${countryName} was deleted.`, remainingCountries});
}

