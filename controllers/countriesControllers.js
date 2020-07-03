const countriesRepositories = require('../repositories/countriesRepositories');
const uuid = require('uuid'); //uuid needs to be installed
const countriesUtilities = require('../utilities/countriesUtilities');


//get all countries
exports.getAllCountries = (req, res) => {
    res.success(countriesRepositories.getAllCountries());
}

//get a single country
exports.getCountry = (req, res) => {
    const availableCountries = countriesRepositories.getCountry(req.params.name);
    if (availableCountries.length !== 0) {
        res.success(availableCountries);
    }
    else {
        const countryName = countriesUtilities.capitalizeFirstLetter(req.params.name);
        return res.notFound();
    }           
};

// post/add a country
exports.postCountry = (req, res) => {

            const {name, capital} = req.body;
            const newCountry = {id: uuid.v4(), name, capital};

            if (!newCountry.name || !newCountry.capital) {
                return res.customedError(`Please include a name AND a capital.`);
            }
                const countries = countriesRepositories.getAllCountries();
                const finalCountriesList = [...countries, newCountry];
                // countries.push(newCountry);
                res.success(finalCountriesList);
};

//update Country 
exports.updateCountry = (req, res) => {
    const availableCountries = countriesRepositories.getCountry(req.params.name);
    if (availableCountries.length !== 0) {
        const wantedCountryUpdates = req.body;
        const updatedCountry = availableCountries[0];

        updatedCountry.name = wantedCountryUpdates.name ? wantedCountryUpdates.name : updatedCountry.name;
        updatedCountry.capital = wantedCountryUpdates.capital ? wantedCountryUpdates.capital : updatedCountry.capital;
        updatedCountry.population = wantedCountryUpdates.population ? wantedCountryUpdates.population : updatedCountry.population;
    
        res.success(availableCountries);
    }
    else {
        const countryName = countriesUtilities.capitalizeFirstLetter(req.params.name);
        return res.notFound();
    } 
} 

//delete country
exports.deleteCountry = (req, res) => {

        const remainingCountries = countriesRepositories.deleteCountry(req.params.name);
        const initialCountryListLength = countriesRepositories.getAllCountries().length;
        const countryName = countriesUtilities.capitalizeFirstLetter(req.params.name);
    
        if(remainingCountries.length === initialCountryListLength) {
             res.notFound();
        }
        else {
            req.countryName = countryName;
            req.remainingCountries = remainingCountries;
            res.success({msg: `${countryName} was deleted.`, remainingCountries});
        }  
}
