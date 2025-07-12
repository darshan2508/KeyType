import {para1} from "./texts.js";

let start_button = document.querySelector("#start-button");
let totalUserChars = 0;
let totalUserWords = 0;
let correctChars = 0;
let pointer = 0;

start_button.addEventListener("click", () => {
    let userInput = document.querySelector("#user-text-input");
    
    userInput.style.display = "block";
    userInput.focus();
    typingStarted(userInput);
})

function typingStarted(userInput){
    let displayedElement = document.querySelector("#p1"); 

    // initializing the first line for user to type
    displayedElement.innerHTML = para1.l1; 

    // setting the width of input field equal to the width of the line
    userInput.style.width = `${document.querySelector("#p1").offsetWidth}px`;
    
    // once the user clicks on the start button, the start button will be removed
    start_button.remove();
    counter();
}

// this function prevents user from using backspace key
document.querySelector("#user-text-input").addEventListener("keydown", (event) => {
    if (event.key === 'Backspace') {
        event.preventDefault();
    }    
})

// taking user input for validation
const inputField = document.querySelector("#user-text-input");
inputField.addEventListener("input", (ele) => {
    const userInput = ele.target.value;
    const correctSentence = document.querySelector("#p1").textContent;
    
    checkChar(pointer,userInput,correctSentence);
    // this condition is necessary because when the pointer reaches to the end of the line then the next line will be displayed else it would append undefined
    if(pointer < correctSentence.length-1) {
        pointer = userInput.length;
        const sentenceText = correctSentence.substring(0, pointer) + `<span style="text-decoration: underline;">${correctSentence[pointer]}</span>` + correctSentence.substring(pointer+1);
        document.querySelector("#p1").innerHTML = sentenceText; 
    }
})

// to check if the character entered by user is correct
function checkChar(pointer,userInput,correctSentence){
    if(userInput[pointer]===correctSentence[pointer]){
        correctChars++;
        if(userInput[pointer] === " ") totalUserWords++;
    }
    totalUserChars++;
}




function counter(){
    // By fault the timer is not visible
    // Once you start the test the timer will be displayed
    document.querySelector("#timer").style.display = "block";

    // initilaize the timer to 60 secs
    let time = 60;

    // start the timer
    let intervalId = setInterval(() => {
        document.getElementById('timer').textContent = time;
        time--;
        if (time === -1) {
            console.log("correct chars = "+correctChars); 
            console.log("totalUserChars = "+totalUserChars);
                      
            clearInterval(intervalId);
            alert("Time's up!");
            endOfTimer()
        }

        // check if the user has typed the entire line
        checkEndOfLine();
    }, 1000);
}




function endOfTimer(){
    //let userInput = document.querySelector("#user-text-input");
    let userInput = document.querySelector("#user-text-input");
    let statsBox = document.querySelector(".stats");

    statsBox.style.display = "block";
    userInput.style.display = "none";

    calculateSpeed();
    calculateAccuracy();
}


function calculateSpeed(){
    let statsBox = document.querySelector(".stats");
    statsBox.style.display = "block";

    let speed = totalUserWords;
    document.querySelector("#speed-in-wpm").textContent = `${speed} wpm`; //speed;

    speed = totalUserChars;
    document.querySelector("#speed-in-cpm").textContent = `${speed} cpm`;

    let commentBox = document.querySelector("#comment");
    if(totalUserWords < 40) commentBox.textContent = "You're a T-REX !";
    else commentBox.textContent = "You're an Octopus !";
}

function calculateAccuracy(){
    let accuracy = (correctChars / totalUserChars) * 100;
    let accuracyBox = document.querySelector("#percentage");
    accuracyBox.textContent = `${accuracy.toFixed(3)}%`;

    
}


function checkEndOfLine(){
    let displayedElement = document.querySelector("#p1"); 
    let userInput = document.querySelector("#user-text-input");

    if(displayedElement.textContent.length <= userInput.value.length){
        nextLine(displayedElement);
    }
}

// initialize the line number
let lineNumber = 2;
// here it is 2 because the first line is already displayed

// the below method is used to update the line
function nextLine(displayedElement){ 
    // will display the new line   
    displayedElement.innerHTML = para1[`l${lineNumber}`];

    // will reset the input field to null
    let userInput = document.querySelector("#user-text-input");
   // totalUserChars += userInput.value.length;
    console.log("totalUserChars-> "+totalUserChars);
    userInput.value = "";
    
    // will set the width of inout field equal to the width of the line
    userInput.style.width = `${document.querySelector("#p1").offsetWidth}px`; //document.querySelector("#p1").offsetWidth;

    // update the line number
    lineNumber++;  
    
    // update the pointer
    pointer=0;
}
