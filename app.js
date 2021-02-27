
const MAX_VALUES = 6;
const MAX_BITS = 8;

const CIRCLE_OFF = 'circle';
const CIRCLE_ON = 'circle-on';

const VALUES = [40,20,10,8,4,2,1];
const KEYS = ["S","M","H"];

let binaryClock;
let clock24Hour;

function build24HourClock(hours, minutes, seconds) {
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return `${hours}:${minutes}:${seconds}`;
}

function buildBinaryClock(hours, minutes, seconds) {
  let binHours = hours.toString(2);
  let binMinutes = minutes.toString(2);
  let binSeconds = seconds.toString(2);

  if (binHours.length < MAX_BITS) {
    for (let i = 1; i = MAX_BITS - binHours.length; i++) {
      binHours = `0${binHours}`;
    }
  }

  if (binMinutes.length < MAX_BITS) {
    for (let i = 1; i = MAX_BITS - binMinutes.length; i++) {
      binMinutes = `0${binMinutes}`;
    }
  }

  if (binSeconds.length < MAX_BITS) {
    for (let i = 1; i = MAX_BITS - binSeconds.length; i++) {
      binSeconds = `0${binSeconds}`;
    }
  }

  return `${binHours}:${binMinutes}:${binSeconds}`;
}

function processCircles(hours, minutes, seconds) {
  let time;
  
  for (let key = 0; key <= 2; key++) {
    switch(key) {
      case 0: 
        time = parseInt(seconds);
        break;
      case 1:
        time = parseInt(minutes);
        break;
      case 2:
        time = parseInt(hours);
        break;
    }

    for (let i = 0; i <= MAX_VALUES; i++) {
      if (time - VALUES[i] >= 0) {
        document.getElementById(`${KEYS[key]}${VALUES[i]}`).classList.add = CIRCLE_ON;
        time -= VALUES[i];
      }
      else {
        document.getElementById(`${KEYS[key]}${VALUES[i]}`).classList.remove = CIRCLE_OFF;
      }
    }
  }
}

function UpdateClock() {
  let time = new Date();
  
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  clock24Hour = build24HourClock(hours, minutes, seconds);
  document.getElementById('clock24Hour').innerHTML = clock24Hour;

  binaryClock = buildBinaryClock(hours,minutes,seconds);
  document.getElementById('binaryClock').innerHTML = binaryClock;

  processCircles(hours, minutes, seconds);
	
  setTimeout(UpdateClock, 1000);
}

document.onload = UpdateClock();
