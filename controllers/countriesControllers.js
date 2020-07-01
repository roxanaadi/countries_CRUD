const countryRepositories = require('../repositories/countriesRepositories');
const uuid = require('uuid'); //uuid needs to be installed

//get all countries
// exports.getAllCountries = (req, res) => res.success(countries);
exports.getAllCountries = (req, res) => res.success(countryRepositories.getAllCountries());


//get a single country
exports.getCountries = (req, res) => {
             const {availableCountries} = req;
             res.success(availableCountries);
};

// post/add a country
exports.postCountry = (req, res) => {
    console.log("entered country controllers");
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
    console.log(availableCountries);
    
    const wantedCountryUpdates = req.body;
    const updatedCountry = availableCountries[0];
    updatedCountry.name = wantedCountryUpdates.name ? wantedCountryUpdates.name : updatedCountry.name;
    updatedCountry.capital = wantedCountryUpdates.capital ? wantedCountryUpdates.capital : updatedCountry.capital;
    updatedCountry.population = wantedCountryUpdates.population ? wantedCountryUpdates.population : updatedCountry.population;
    //return res.success( { id: updatedTeam.id } );
    res.success(availableCountries);
    //res.success(availableCountries);
} 

//delete country
exports.deleteCountry = (req, res) => {
    const {countryName, remainingCountries} = req;
    res.success({msg: `${countryName} was deleted.`, remainingCountries});
}

