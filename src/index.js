import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
import API from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const formInputCountry = document.querySelector("#search-box");
const countryFind = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

function runSearch(event) {
    
    event.preventDefault();
        let nameCountry = event.target.value;
        console.log(nameCountry);
        if (nameCountry.length > 1) {
       
            console.log(nameCountry);
            //  fetchCountry(nameCountry).then(countries => countries.map(country => console.log(country)));
            API.fetchCountry(nameCountry.trim()).then(verificationCountry).catch(onFetchError);
            // Error handling
        };

    };
const debounceRunSearch = debounce(runSearch, DEBOUNCE_DELAY);

formInputCountry.addEventListener('input', debounceRunSearch);

function verificationCountry(countries) {
    if (countries.length >= 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
         console.log(countries);
    } else if (countries.length > 2 && countries.length < 10) {
        countryOutputShort(countries);
         console.log(countries);
    } else  {
        countryOutputFull(countries)
         console.log(countries);
    }   
};

function countryOutputShort(countries) {
    // const countryList = countries;
        const markupShort = countries.map((country) => {
            return `<div class = "country-card">
        <li>
        <img src = "${country.flags.svg}">
        <p><b>Name</b>:${country.name.official}</p>
        </div>`
        }).join("");
    countryInfo.innerHTML = markupShort;
   
    return countries;
};

function countryOutputFull(countries) {
    const markupLong = countries.map((country) => {
            const languages = Object.values(country.languages);
            return `<div class = "country-card">
            <li>
            <img src = "${country.flags.svg}">
            <p><b>Name</b>:${country.name.official}</p>
            <p><b>Capital</b>:${country.capital}</p>
            <p><b>languages</b>:${languages.slice(0, 2)}</p>
            <p><b>Population</b>:${country.population}</p>
            </div>`
        }).join("");
    countryInfo.innerHTML = markupLong;
     return countries;
    };

// function resetForm () {
// formInputCountry.requestFullscreen()
// };

function onFetchError(error) {
    Notify.warning("Oops, there is no country with that name");
};