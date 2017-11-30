const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
fetch(endpoint)
  .then((response) => response.json())
  .then(data => cities.push(...data));

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

// find if the search text matches any city or state
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi'); //gi flag for global and case insensitive
    return place.city.match(regex) || place.state.match(regex);
  });
}

// for better formatting
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// display the results to user
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  
  
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    
    
    return `
      <li>
        <span class='name'>${cityName}, ${stateName}</span>
        <span class='population'> ${numberWithCommas(place.population)} </span>
      </li>
    `
  }).join('');
  suggestions.innerHTML = html;
  
}






