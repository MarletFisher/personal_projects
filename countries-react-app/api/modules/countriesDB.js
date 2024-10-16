const mongoose = require("mongoose");
const countrySchema = require("./countrySchema");
module.exports = class CountriesDB {
	constructor() {
		// We don't have a `Country` object until initialize() is complete
		this.Country = null;
	}
	// Pass the connection string to `initialize()`
	initialize(connectionString) {
		return new Promise((resolve, reject) => {
			const db = mongoose.createConnection(connectionString);
			db.once("error", (err) => {
				reject(err);
			});
			db.once("open", () => {
				this.Country = db.model("country", countrySchema);
				resolve();
			});
		});
	}
	async addNewCountry(data) {
		const newCountry = new this.Country(data);
		await newCountry.save();
		return newCountry;
	}
	getAllCountries(page, perPage, name) {
		let findBy = name ? { name: { $regex: name, $options: "i" } } : {};
		if (+page && +perPage) {
			return this.Country.find(findBy)
				.sort({ name: 1 })
				.skip((page - 1) * +perPage)
				.limit(+perPage)
				.exec();
		}
		return Promise.reject(
			new Error("page and perPage query parameters must be valid numbers")
		);
	}
	getCountryById(id) {
		return this.Country.findById(id).exec();
		// return this.Country.findOne({ _id: id }).exec(); // both work
	}
	updateCountryById(data, id) {
		return this.Country.updateOne({ _id: id }, { $set: data }).exec();
	}
	deleteCountryById(id) {
		return this.Country.deleteOne({ _id: id }).exec();
	}
};
