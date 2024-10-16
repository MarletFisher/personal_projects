const mongoose = require("mongoose");
const currencySchema = new mongoose.Schema({
	name: String,
	symbol: String,
});
const countrySchema = new mongoose.Schema({
	// _id: String, // Don't do this for the automatically generated _id ie. PK Objectid('.....') !!!
	name: String,
	nativeName: String,
	a2code: String,
	a3code: String,
	tld: [String],
	currencies: [currencySchema],
	capital: String,
	region: String,
	subregion: String,
	languages: String,
	latlng: String,
	googleMaps: String,
	population: Number,
	area: Number,
	continents: String,
	flag: String,
	coatOfArm: String,
});
module.exports = countrySchema;
