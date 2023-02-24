import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchApi from './components/fetchImg';
import loadmore from './components/loadmore';
import { renderHtml, addHtml } from './components/render';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const apiService = new fetchApi();
const loadMoreBtn = new loadmore({
  selector: '.load-more',
  isHidden: true,
});

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

  loadMoreBtn.show();
  fetchData().finally(() => form.reset());
});

function fetchData() {
  loadMoreBtn.disable();
  let currentHits = apiService.currentHits();

  return apiService
    .fetchImg()
    .then(({ hits, totalHits }) => {
      if (!hits.length) {
        loadMoreBtn.hide();
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      renderHtml(hits);

      if (currentHits >= totalHits) {
        loadMoreBtn.hide();
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return '';
      }
      loadMoreBtn.enable();
    })
    .catch(console.log);
}
