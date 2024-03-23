const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button")
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000
const minute = second * 60 
const hour = minute * 60
const day = hour * 24

//set date input Min with Today's Date
const today = new Date().toISOString().split('T'[0]);
dateEl.setAttribute('min', today);

//populate countdown/ complete UI
function updateDOM(){
    countdownActive = setInterval(() =>{
        const now = new Date().getTime();
    const distance = countdownValue - now

    const days = Math.floor(distance/day);
    const hours = Math.floor((distance% day) / hour) 
    const minutes = Math.floor((distance% hour) / minute) 
    const seconds = Math.floor((distance% minute) / second) 

 //hide input
 inputContainer.hidden = true;

 //if the countdown has ended, show complete 
 if(distance<0){
    countdownEl.hidden = true;
    clearInterval(countdownActive);
    completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    completeEl.hidden = false;
 } else {
    //else, show the countdown in progress
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent =`${days}`;
    timeElements[1].textContent =`${hours}`;
    timeElements[2].textContent =`${minutes}`;
    timeElements[3].textContent =`${seconds}`;
    completeEl.hidden = true;
    countdownEl.hidden = false;
 }

// //populate countdown


// //show countdown
// countdownEl.hidden = false;

    },second);   
}

//reset all values
function reset(){
    //hide countdown , show input
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;
    //reset countdown
    clearInterval(countdownActive);
    //reset value
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem("countdown");
}

//take values from form input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
       title:countdownTitle,
       date:countdownDate,  
    };
    console.log(savedCountdown);
    localStorage.setItem("countdown", JSON.stringify(savedCountdown))
    // console.log(e);
    if(countdownDate ===""){
        alert('Please select a date for the countdown.')
    }
    //get number version of current Dte , updateDOM
    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown value:', countdownValue)
    updateDOM();
}

function restoreRreviousCountdown(){
   if(localStorage.getItem("countdown")){
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
     countdownTitle = savedCountdown.title;
     countdownDate = savedCountdown.date;
     countdownValue = new Date(countdownDate).getTime();
     updateDOM()
   } 
}

//event listeners
countdownForm.addEventListener("submit",updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);
//On load , check localStorage
restoreRreviousCountdown()