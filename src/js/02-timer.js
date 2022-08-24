import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const daysWrapper = document.querySelector('[data-days]');
const hoursWrapper = document.querySelector('[data-hours]');
const minutesWrapper = document.querySelector('[data-minutes]');
const secondsWrapper = document.querySelector('[data-seconds]');
let endDate;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateSelect(selectedDates[0]);
  },
});

function onDateSelect(selectedDate) {
  if (selectedDate < new Date()) {
    startBtn.disabled = true;
    Notify.failure('Please choose a date in the future');
    return;
  }

  endDate = selectedDate;
  startBtn.disabled = false;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
startBtn.addEventListener('click', () => {
  const intervalId = setInterval(() => {
    const currentTime = convertMs(endDate.getTime() - Date.now());
    updateInterface(currentTime);
    if (
      !currentTime.days &&
      !currentTime.hours &&
      !currentTime.minutes &&
      !currentTime.seconds
    ) {
      clearInterval(intervalId);
    }
  }, 1000);
});

function updateInterface({ days, hours, minutes, seconds }) {
  daysWrapper.innerHTML = addLeadingZero(days);
  hoursWrapper.innerHTML = addLeadingZero(hours);
  minutesWrapper.innerHTML = addLeadingZero(minutes);
  secondsWrapper.innerHTML = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
