const countriesRepositories = require('../repositories/countriesRepositories');
//const customResponses = require('./customResponses');

exports.checkEnteredProperties = (req, res, next) => {
    const {name, capital} = req.body;
    if (!name || !capital) {
        return res.customedError(`Please include a name AND a capital.`);
    }
    next();
}



