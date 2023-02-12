console.clear();

import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const subBtn = document.querySelector('button');
const STORAGE_KEY = `feedback-form-state`;
const values = localStorage.getItem(STORAGE_KEY);
const dataObj = JSON.parse(values);
let formData = {};

addEvent();
reloadPage();
onActive();

function addEvent() {
	form.addEventListener('input', throttle(stgData, 300));
	form.addEventListener('submit', onSubmit);
}

function onSubmit(e) {
	e.preventDefault();

	const saveData = JSON.parse(localStorage.getItem(STORAGE_KEY));
	console.log(saveData);

	e.target.reset();
	localStorage.removeItem(STORAGE_KEY);

	formData = {};
	onActive();
}

function stgData(e) {
	formData[e.target.name] = e.target.value;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
	onActive();
}

function onActive() {
	if (input.value === '' || textarea.value === '') {
		subBtn.disabled = true;
	} else {
		subBtn.disabled = false;
	}
}

function dataReload(storageObj) {
	formData['email'] = storageObj.email;
	formData['message'] = storageObj.message;
}

function reloadPage() {
	if (values) {
		input.value = dataObj.email || '';
		textarea.value = dataObj.message || '';
		dataReload(dataObj);
	}
}
