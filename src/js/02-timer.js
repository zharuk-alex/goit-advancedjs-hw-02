import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

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

const addLeadingZero = value => value.toString().padStart(2, '0');

const data = {
  timerID: null,
  targetTimestamp: null,
};

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  fields: {},
};

Array.from(document.querySelectorAll('.field .value')).map(ref => {
  const key = Object.keys(ref.dataset)?.[0];
  refs.fields[key] = ref;
});

flatpickr(refs.datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: pickerCloseHandler,
});

const renderTime = timestamp => {
  // days, hours, minutes, seconds
  const timeParsed = convertMs(timestamp);
  Object.keys(timeParsed).forEach(key => {
    if (!!refs.fields?.[key]) {
      refs.fields[key].textContent = addLeadingZero(timeParsed[key]);
    }
  });
};

const startIsAble = () => {
  if (data.targetTimestamp - Date.now() > 0) {
    return true;
  }
  refs.startBtn.setAttribute('disabled', true);
  data.targetTimestamp = null;

  iziToast.error({
    title: 'Error',
    position: 'topCenter',
    message: 'Please choose a date in the future',
  });

  return false;
};

function pickerCloseHandler(selectedDates) {
  data.targetTimestamp = selectedDates[0].getTime();
  if (startIsAble()) {
    refs.startBtn.removeAttribute('disabled');
  }
}

refs.startBtn.addEventListener('click', function () {
  if (!startIsAble()) {
    return false;
  }

  this.setAttribute('disabled', true);
  refs.datePicker.setAttribute('disabled', true);

  data.timerID = setInterval(() => {
    const diff = data.targetTimestamp - Date.now();

    if (diff <= 0) {
      refs.datePicker.removeAttribute('disabled');
      clearInterval(data.timerID);
      iziToast.success({
        title: 'Thank you!',
        position: 'topLeft',
      });
      return;
    }

    renderTime(diff);
  }, 1000);
});
