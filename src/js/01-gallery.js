console.clear();

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
const galleryEl = document.querySelector('.gallery');
const itemEl = createMarkup(galleryItems);
console.log(galleryItems);

// функция для перебора "galleryItems" и создания "a > img" элемента
function createMarkup() {
	return galleryItems
		.map(({ preview, original, description }) => {
			return `
                <a class="gallery__item" href="${original}">
                    <img class="gallery__image" src="${preview}" alt="${description}" />
                </a>`;
		})
		.join(' ');
}

// добавление "galleryItems" в html
galleryEl.insertAdjacentHTML('beforeend', itemEl);

// слушатель события для "galleryEl"
galleryEl.addEventListener('click', e => {
	e.preventDefault();
});

let lightbox = new SimpleLightbox('.gallery__item', {
	captions: true,
	captionsData: 'alt',
	captionDelay: 96,
	captionType: 'alt',
	animationSpeed: 80,
	focus: true,
	preloading: true,
});
