'use strict';

const request = require('request-promise');

const MAP_URL = 'https://www.realtor.ca/Residential/Map.aspx';
const API_URL = 'https://api2.realtor.ca/Listing.svc/PropertySearch_Post';

const priceTiers = [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2500000, 3000000, 4000000, 5000000, 7500000, 10000000];

class Realtor {
	static post(options) {
		let form = {CultureId: 1, ApplicationId: 1, PropertySearchTypeId: 1};

		if (typeof options === 'object')
			Object.assign(form, options);

		return request({
			method: 'POST',
			uri: API_URL,
			form: form,
			json: true
		});
	}

	static buildUrl(options) {

		if (options.PriceMin) {
			options = findNextPriceTier(options, true);
		}

		if (options.PriceMax) {
			options = findNextPriceTier(options, false);
		}

		let qs = '#';

		for (var prop in options) {
			qs += prop + '=' + options[prop] + '&';
		}

		return MAP_URL + qs.slice(0, -1); //To remove trailing ampersand or pound
	}
}

function findNextPriceTier(options, minFlag) {

	let opt = (minFlag ? "PriceMin" : "PriceMax");
	let cost = options[opt];

	if (priceTiers.indexOf(cost) !== -1)
		return options;

	if (cost > priceTiers[priceTiers.length-1]) {
		delete options[opt];
		return options;
	}

	for (let i = 0; i < priceTiers.length; i++) {
		if (priceTiers[i] > options[opt]) {
			options[opt] = priceTiers[i];
			break;
		}
	}

	return options;
}

module.exports = Realtor;
