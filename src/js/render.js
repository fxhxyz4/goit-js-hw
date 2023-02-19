import { refs } from './refs';

export function markupInfo(country) {
  const markup = country
    .map(({ name, languages, capital, population, flags }) => {
      return `<ul>
          <li>
            <img src="${flags.svg}" alt="${flags.alt} width="70" height="50"/>
            <h2>${name.official}</h2>
            <p>languages: ${Object.values(languages)}</p>
            <p>capital: ${capital}</p>
            <p>population: ${population}</p>
          </li>
        </ul>`;
    })
    .join(' ');
  refs.divEl.innerHTML = markup;
}

export function markupList(country) {
  const markup = country
    .map(({ flags, name }) => {
      return `<li>
          <img src="${flags.svg}" alt="${flags.alt} width="70" height="50" />
          <h2>${name.official}</h2>
        </li>`;
    })
    .join(' ');
  refs.listEl.innerHTML = markup;
}
