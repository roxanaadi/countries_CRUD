const countryControllers = require('../controllers/countriesControllers');
const countryMiddlewares = require('../middlewares/countryMiddlewares');

const express = require('express');
const router = express.Router();

//get all countries
router.get('/api/countries', countryControllers.getAllCountries);

// get single country
router.get('/api/countries/:name', countryMiddlewares.countryExists, countryControllers.getCountry);

//post a country
router.post('/api/countries', countryMiddlewares.checkEnteredProperties, countryControllers.postCountry);

//update country
router.put('/api/countries/:name', countryMiddlewares.countryExists, countryControllers.updateCountry);

//delete country
router.delete('/api/countries/:name', countryMiddlewares.whichCountryToDelete, countryControllers.deleteCountry);

module.exports = router;
