console.clear();

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
const inputEl = document.getElementById('datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const timerEl = document.querySelector('.timer');
const filedEl = document.querySelectorAll('.field');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const bodyEl = document.querySelector('body');
const INTERVAL_VALUE = 1000;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onSelect(selectedDates);
  },
};
let selectedDate;
let currentDate = Date.parse(new Date());
let intervalId;

flatpickr(inputEl, options);

styledTimer();
btnEl.setAttribute('disabled', '');

function onSelect(selectedDates) {
  selectedDate = Date.parse(selectedDates[0]);

  if (selectedDate < currentDate) {
    Report.failure('Please choose a date in the future');
    btnEl.setAttribute('disabled', '');
    return;
  } else {
    updateTime();
  }

  if (btnEl.hasAttribute('disabled')) {
    btnEl.removeAttribute('disabled');
    Report.success('click to start');
  }
}

function updateTime() {
  const dateObj = convertMs(selectedDate - Date.now());
  console.log(dateObj);
  const { days, hours, minutes, seconds } = dateObj;

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

btnEl.addEventListener('click', e => {
  intervalId = setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    const deltaInSeconds = Number(((deltaTime % 60000) / 1000).toFixed(0));

    btnEl.setAttribute('disabled', '');

    updateTime();
  }, INTERVAL_VALUE);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function styledTimer() {
  timerEl.style.display = `flex`;
  bodyEl.style.userSelect = `none`;
  for (const field of filedEl) {
    field.style.padding = `10px`;
    field.style.fontSize = `17px`;
    field.style.fontWeight = `600`;
    field.classList.add('animateClass');
  }
}
