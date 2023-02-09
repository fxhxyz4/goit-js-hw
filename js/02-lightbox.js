console.clear();

import { galleryItems } from "./gallery-items.js";
const galleryEl = document.querySelector(".gallery");
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
		.join(" ");
}

// добавление "galleryItems" в html
galleryEl.insertAdjacentHTML("beforeend", itemEl);

// слушатель события для "galleryEl"
galleryEl.addEventListener("click", onClick);

// preventDefault() и "keydown"
function onClick(e) {
	e.preventDefault();

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape") {
			imgCrt.close();
		}
	});
}

let lightbox = new SimpleLightbox(".gallery__item", {
	captions: true,
	captionsData: "alt",
	captionDelay: 96,
	captionType: "alt",
	animationSpeed: 80,
	focus: true,
	preloading: true,
});

console.log(lightbox);
