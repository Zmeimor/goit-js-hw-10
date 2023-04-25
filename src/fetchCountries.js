// Напиши функцію fetchCountries(name), яка робить HTTP-запит на ресурс name 
// і повертає проміс з масивом країн - результатом запиту.
// Винеси її в окремий файл fetchCountries.js і зроби іменований експорт.

function fetchCountry(nameCountry) {
    return fetch(`https://restcountries.com/v3.1/name/${nameCountry}?fields=name,flags,capital,languages,population,currencies`).
        then(response => {
            return response.json();
        });
};

export default { fetchCountry };