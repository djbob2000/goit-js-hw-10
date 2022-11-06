import './css/styles.css';
import { fetchCountries } from './api-service.js';
import _ from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
// console.log(refs);
refs.searchForm.addEventListener('input', _.debounce(onSearch, 1000));

function onSearch(event) {
  console.log('++++ONSEARCH+++++++');
  event.preventDefault();
  const form = event.target;
  let searchQuery = form.value;
  searchQuery = searchQuery.trim();

  fetchCountries(searchQuery).then(renderQuery).catch(onFetchError);
}
// Дима прислал
// const DEBOUNCE_DELAY = 300;
// refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));
// function onInputValue(e) {
//     let inputValue = e.target.value.trim();

function renderQuery(countryInfo) {
  let filteredInfo = '';
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  let totalQuantityCountries = countryInfo.length;
  if (totalQuantityCountries > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (totalQuantityCountries > 2) {
    filteredInfo = countryInfo
      .map(info => {
        return `<li><img class="flag__image" src="${info.flags.png}" alt="${info.name.official}"/>${info.name.official}</li>`;
      })
      .join('');
    console.log(filteredInfo);
    refs.countryList.insertAdjacentHTML('beforeend', filteredInfo);
  } else if (totalQuantityCountries === 1) {
    filteredInfo = countryInfo.map(info => {
      return `
      <span class="title"><img class="flag__image" src="${
        info.flags.png
      }" alt="${info.name.official}" /> 
      ${info.name.official}</span>
      <p><span class="boldText">Capital: </span>${info.capital[0]}</p>
      <p><span class="boldText">Population: </span>${info.population}</p>
      <p><span class="boldText">Languages: </span>${
        Object.values(info.languages)[0]
      }</p>
      `;
    });
    refs.countryInfo.insertAdjacentHTML('beforeend', filteredInfo);
  }
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}
