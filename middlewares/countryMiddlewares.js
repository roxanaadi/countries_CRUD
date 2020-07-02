const countriesRepositories = require('../repositories/countriesRepositories');
const countriesUtilities = require('../utilities/countriesUtilities');
const customResponses = require('./customResponses');

exports.countryExists = (req, res, next) => {

    const availableCountries = countriesRepositories.getCountry(req.params.name);
    if (availableCountries.length !== 0) {
        req.availableCountries = availableCountries;
        next();
    }
    else {
        const countryName = countriesUtilities.capitalizeFirstLetter(req.params.name);
        return res.notFound(countryName);
    } 
}

exports.checkEnteredProperties = (req, res, next) => {
    const {name, capital} = req.body;
    if (!name || !capital) {
        return res.customedError(`Please include a name AND a capital.`);
    }
    next();
}

exports.whichCountryToDelete = (req, res, next) => {
    const remainingCountries = countriesRepositories.deleteCountry(req.params.name);
    const initialCountryListLength = countriesRepositories.getAllCountries().length;

    const countryName = countriesUtilities.capitalizeFirstLetter(req.params.name);

    if(remainingCountries.length === initialCountryListLength) {
        return res.notFound(countryName);
    }
    else {
        req.countryName = countryName;
        req.remainingCountries = remainingCountries;
        next();
    }
}

