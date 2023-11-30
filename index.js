// targetting element----------------------------------------------
const welcomeScreen = document.querySelector('#welcome-screen')
const questionScreen = document.querySelector('#question-screen')
const confirmationScreen = document.querySelector('#confirmation-screen')
const thankScreen = document.querySelector('#thank-screen')

const questionBox = document.querySelector('#question-box')
const questionNo = document.querySelector('.questionNo')

const startBTN = document.querySelector('#start-btn')
const prevBTN = document.querySelector('#prev-btn')
const nextBTN = document.querySelector('#next-btn')
const skipBTN = document.querySelector('#skip-btn')

const yes = document.querySelector('#sub-yes')
const no = document.querySelector('#sub-no')


// ----------------------------------------------------------------------



// question accecss by JavaScript
const questions = [
    { id: 1, text: "How satisfied are you with our products?", type: "rating", max: 5 },
    { id: 2, text: "How fair are the prices compared to similar retailers?", type: "rating", max: 5 },
    { id: 3, text: "How satisfied are you with the value for money of your purchase?", type: "rating", max: 5 },
    { id: 4, text: "On a scale of 1-10, how would you recommend us to your friends and family?", type: "rating", max: 10 },
    { id: 5, text: "What could we do to improve our service?", type: "text" }
]

let currentIndex = 0
let answer = {}

// function---------------------------------------------------------------------

// function for start survey
function startSurvey() {
    welcomeScreen.style.display = 'none'
    questionScreen.style.display = 'block'
    displayQuestion()
}

// function for display question
function displayQuestion() {
    const currentQuestion = questions[currentIndex]

    if (currentQuestion) {
        const questionProgressNo = `${currentIndex + 1}/${questions.length}`
        questionNo.innerHTML = questionProgressNo
        let div = document.createElement('div')
        div.classList.add('rating-box')
        if (currentQuestion.type === 'rating') {
            for (let i = 1; i <= currentQuestion.max; i++) {
                let input = document.createElement('input')
                input.classList.add('rating-no')
                input.setAttribute('onClick', `colorChange(${i})`)
                // input.setAttribute('id', 'answerInput')
                input.setAttribute('type', 'text')
                input.setAttribute('value', `${i}`)
                // input.value = `${i}`
                input.readOnly = true
                div.appendChild(input)
            }
        } else {
            let textarea = document.createElement('textarea')
            textarea.setAttribute('id', 'answerInput')
            textarea.setAttribute('placeholder', 'Write your suggestion')
            textarea.setAttribute('rows', '10')
            textarea.setAttribute('cols', '60')
            textarea.classList.add('textarea-style')
            div.appendChild(textarea)
        }
        // console.log(div);
        questionBox.innerHTML = `
        <p class='q-style'>${currentQuestion.text}</p>
        `
        questionBox.appendChild(div)
        prevBTN.style.display = currentIndex === 0 ? 'none' : 'inline-block'
    }
    else {
        confirmationScreen.style.display = 'block'
        questionScreen.style.display = 'none'
    }
}

// function for color change
function colorChange(buttonIndex) {
    let buttons = document.querySelectorAll('.rating-no')

    buttons.forEach((elm, ind) => {
        if (ind === buttonIndex - 1) {
            elm.classList.add('rating-visited')
        } else {
            elm.classList.remove('rating-visited')
        }
    })
}

// function for previous question
function prevQuestion() {
    currentIndex--;
    displayQuestion()
}


// function for next question
function nextQuestion() {
    const answerInput = document.querySelector('#answerInput')
    if (!answerInput) {
        const options = document.querySelectorAll('.rating-no')
        options.forEach((elm) => {
            if (elm.classList.contains('rating-visited')) {
                console.log(elm.value);
                answer[currentIndex + 1] = elm.value
            }
        })
    }else{
        answer[currentIndex + 1] = answerInput.value
    }
    console.log(answerInput);
    console.log(answer);
    currentIndex++
    displayQuestion()
}

// function for skip question
function skipQuestion() {
    currentIndex++
    displayQuestion()
}

// function for confirm submit
function confirmSubmit() {
    confirmationScreen.style.display = 'none'
    thankScreen.style.display = 'block'
    submitSurvey()
}


// function for confirm submit
function cancelSubmit() {
    confirmationScreen.style.display = 'none'
    questionScreen.style.display = 'block'
}


// function for  submit survey
function submitSurvey() {
    answer['status'] = 'Complete'
    // we can sent this data to the backend using ajax and node.js
    console.log("Survey submited", answer);
    resetSurvey()
}

// function for  reset survey
function resetSurvey() {
    currentIndex = 0
    answer = {}
    questionBox.innerHTML = ''
    prevBTN.style.display = 'none'
    nextBTN.style.display = 'inline-block'
    skipBTN.style.display = 'inline-block'
    questionScreen.style.display = 'none'
    setTimeout(() => {
        thankScreen.style.display = 'none'
        // window.location.relode()
        welcomeScreen.style.display = 'block'
    }, 2000)
}


window.onbeforeunload = function () {
    if (currentIndex < questions.length) {
        return "Are you sure you want to leave the survey?";
    }
};




// --------------------------------------------------------------------------------------

// Eventlisteners
startBTN.addEventListener('click', (e) => {
    startSurvey()
})

prevBTN.addEventListener('click', (e) => {
    prevQuestion()
})

nextBTN.addEventListener('click', (e) => {
    nextQuestion()
})

skipBTN.addEventListener('click', (e) => {
    skipQuestion()
})


yes.addEventListener('click', (e) => {
    confirmSubmit()
})


no.addEventListener('click', (e) => {
    cancelSubmit()
})

