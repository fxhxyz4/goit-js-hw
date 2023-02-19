console.clear();

import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs';
import debounce from 'lodash.debounce';
import { markupInfo, markupList } from './js/render';

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener(
  'input',
  debounce(e => {
    let inputVal = e.target.value.trim();
    if (!inputVal) {
      refs.divEl.innerHTML = '';
      refs.listEl.innerHTML = '';
      return;
    }

    fetchCountries(inputVal)
      .then(countries => {
        if (countries.length > 10) {
          refs.divEl.innerHTML = '';
          refs.listEl.innerHTML = '';
          Notify.info(
            'Too many matches found. Please enter more specific name.'
          );
        }

        if (countries.length <= 10 && countries.length >= 2) {
          refs.divEl.innerHTML = '';
          markupList(countries);
          Notify.success(
            'We made a list of countries which are close to your request.'
          );
        }

        if (countries.length === 1) {
          refs.listEl.innerHTML = '';
          markupInfo(countries);
          Notify.success('This is your country!');
        }

        console.log(countries);
      })
      .catch(err => {
        refs.divEl.innerHTML = '';
        refs.listEl.innerHTML = '';

        Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);
