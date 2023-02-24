const gallery = document.querySelector('.gallery');

export function renderHtml(img) {
  const markup = img
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" height="370" width="540" />
            <div class="info">
              <p class="info-item">
                <b>Likes: ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${downloads}</b>
              </p>
            </div>
          </div>
        `;
      }
    )
    .join(' ');

  addHtml(markup);
}

export function addHtml(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}
