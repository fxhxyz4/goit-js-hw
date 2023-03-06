import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchApi from './components/fetchImg';
import { renderHtml, addHtml } from './components/render';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const apiService = new fetchApi();

function clearHtml() {
  gallery.innerHTML = '';
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  apiService.query = value;
  clearHtml();
  apiService.resetPage();

  fetchData().finally(() => form.reset());

  loadMore.classList.remove('is-hidden');
});

function fetchData() {
  let currentHits = apiService.currentHits();

  return apiService
    .fetchImg()
    .then(({ hits, totalHits }) => {
      if (!hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        loadMore.classList.add('is-hidden');
        return;
      }
      renderHtml(hits);

      if (currentHits >= totalHits) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadMore.classList.add('is-hidden');
        return '';
      }
    })
    .catch(console.log);
}

//fix

loadMore.addEventListener('click', async e => {
  if (apiService.displayAmount >= apiService.myTotalHits) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    loadMore.classList.add('is-hidden');
    return;
  }
  apiService.displayAmount += apiService.per_page;

  try {
    const fetchedData = await apiService.fetchArticles();
    const { hits: articles } = fetchedData;
    appendArticlesMarkup(articles);
  } catch (err) {
    console.error(err.message);
  }
});
