const countriesRepositories = require('../repositories/countriesRepositories');
const countriesUtilities = require('../utilities/countriesUtilities');
const customResponses = require('./customResponses');



exports.countryExists = (req, res, next) => {

    const availableCountries = countriesRepositories.getCountries(req.params.name);
    if (availableCountries.length !== 0) {
        console.log("if found");
        req.availableCountries = availableCountries;
        next();
    }
    else {
        const countryName = countriesUtilities.capitalizeFirstLetter(req.params.name);
        res.status(400).json({msg: `No country with the name '${countryName}' was found in our database.`});
    }
    
}

exports.checkEnteredProperties = (req, res, next) => {
    const {name, capital} = req.body;
    if (!name || !capital) {
        return res.status(400).json({ msg: `Please include a name AND a capital.` });
    }
    next();
}

exports.whichCountryToDelete = (req, res, next) => {
    const remainingCountries = countriesRepositories.deleteCountry(req.params.name);
    const initialCountryListLength = countriesRepositories.getAllCountries().length;

    const countryName = countriesUtilities.capitalizeFirstLetter(req.params.name);

    if(remainingCountries.length === initialCountryListLength) {
        // res.status(400).json({ msg: `Sorry, we couldn't find '${countryName}' in our database.`})
        //return res.badRequest();
        //return res.notFound(countryName);
        //return res.badRequest();
        // console.log("str: ");
        // const word = "alabala";
        // console.log("word: ", word);
        // const test = customResponses.capitalize(word);
        // console.log(test);
        //const str = word.customResponses.capitalize(word);
        
        //return res.json({ customResponses: str});
        //res.status(400).json({ msg: `Sorry, we couldn't find '${countryName}' in our database.`})
        return res.badRequest();
    }
    else {
        req.countryName = countryName;
        req.remainingCountries = remainingCountries;
        next();
    }
}

