/*
    Создай галерею с возможностью клика по её элементам и просмотра
    полноразмерного изображения в модальном окне.
*/

console.clear();

import { galleryItems } from "./gallery-items.js";
const galleryEl = document.querySelector(".gallery");
const itemEl = createMarkup(galleryItems);
console.log(galleryItems);

// функция для перебора "galleryItems" и создания "div" элемента
function createMarkup() {
	return galleryItems
		.map(({ preview, original, description }) => {
			return `
                <div class="gallery__item">
                    <a href="${original}" class="gallery__link">
                        <img
                            src="${preview}"
                            data-source="${original}"
                            alt="${description}"
                            class="gallery__image"
                        />
                    </a>
                </div>`;
		})
		.join(" ");
}

// добавление "galleryItems" в html
galleryEl.insertAdjacentHTML("beforeend", itemEl);

// слушатель события для "galleryEl"
galleryEl.addEventListener("click", onClick);

// функция сравнения и "keydown"
function onClick(e) {
	e.preventDefault();
	if (e.target.nodeName !== "IMG" && !document.querySelector(".basicLightbox")) {
		return;
	}
	const src = e.target.dataset.source;
	let width = 800;
	let height = 600;

	const imgCrt = basicLightbox.create(`
        <img src="${src} "width="${width}" height="${height}">
    `);
	imgCrt.show();

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape") {
			imgCrt.close();
		}
	});
}
