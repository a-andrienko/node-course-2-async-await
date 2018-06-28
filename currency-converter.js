// currency convertor:
// the function takes 3 parameters:
// 1) currency code (ex: USD)
// 2) currency code to convert to 
// 3) amount

// fixer.io
// http://data.fixer.io/api/latest?access_key=62d3f4883c2e3ec7378721676ac41ba8&format=1

const axios = require('axios');

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=62d3f4883c2e3ec7378721676ac41ba8&format=1');
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];
        
        if (isNaN(rate)){
            throw new Error();
        }
        
        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
};


const getCountries = async (currencyCode) => {
    try {
         const response = await   axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${to}`);
    }
   
};

const convertCurrency = async  (from, to, amount) => {
    const rate = await getExchangeRate(from, to, amount);
    var convertedAmount = (amount * rate).toFixed(2);
    const countries = await getCountries(to);
     return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it it the following countries: ${countries.join(',')}`;
};

convertCurrency('USD', 'CAD', 20).then((message) => {
    console.log(message)
});

//const getExchangeRate = (from, to) => {
//  return axios.get('http://data.fixer.io/api/latest?access_key=62d3f4883c2e3ec7378721676ac41ba8&format=1').then((response) => {
//      const euro = 1 / response.data.rates[from];
//      const rate = euro * response.data.rates[to];
//      return rate;
//  })  
//};


//
//getExchangeRate('USD', 'CAD').then((rate) => {
//    console.log(rate);
//})
//
//getCountries('USD').then((countries) => {
//    console.log(countries);
//})

//const convertCurrency = (from, to, amount) => {
//    let convertedAmount;
//    return getExchangeRate(from, to).then((rate) => {
//        convertedAmount = (amount * rate).toFixed(2);
//        return getCountries(to);
//    }).then((countries) => {
//        return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it it the following countries: ${countries.join(',')}`;
//    })
//};