import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
//import 'notiflix/dist/notiflix/-3.2.6.min.css';
//import 'notiflix/dist/notiflix-3.2.5.min.css';

const btnEl = document.querySelector('[data-start]');
const InputEl = document.querySelector('#datetime-picker');
const SpanDaysEl = document.querySelector('[data-days]');
const SpanHoursEl = document.querySelector('[data-hours]');
const SpanMinEl = document.querySelector('[data-minutes]');
const SpanSecEl = document.querySelector('[data-seconds]');

btnEl.disabled = true;
btnEl.addEventListener('click', countTimeStart);

let deadLineDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      deadLineDate = selectedDates[0];
      btnEl.disabled = false;
    }
  },
};

function countTimeStart() {
  btnEl.disabled = true;
  InputEl.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const diff = deadLineDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(diff);

    SpanDaysEl.textContent = days;
    SpanHoursEl.textContent = hours;
    SpanMinEl.textContent = minutes;
    SpanSecEl.textContent = seconds;

    if (diff < 1000) {
      clearInterval(timerId);
      btnEl.disabled = false;
      InputEl.disabled = false;
    }
  }, 1000);
}

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

flatpickr(InputEl, options);
