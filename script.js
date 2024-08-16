const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSetion = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const aboutBtn = document.querySelector('.about-btn');
const aboutModal = document.querySelector('.about-modal');
const closeBtn = document.querySelector('.close-btn');
const servicesBtn = document.querySelector('.services-btn');
const servicesModal = document.querySelector('.services-modal');
const closeServicesBtn = document.querySelector('.close-services-btn');
const contactBtn = document.querySelector('.contact-btn');
const contactModal = document.querySelector('.contact-modal');
const closeContactBtn = document.querySelector('.close-contact-btn');


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    shuffleQuestions(questions);
    quizSetion.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    shuffleQuestions(questions);
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

goHomeBtn.onclick = () => {
    shuffleQuestions(questions);
    quizSetion.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

aboutBtn.onclick = () => {
    aboutModal.style.display = 'block';
}

closeBtn.onclick = () => {
    aboutModal.style.display = 'none';
}

window.onclick = (event) => {
    if (event.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
}

servicesBtn.onclick = () => {
    servicesModal.style.display = 'block';
}

closeServicesBtn.onclick = () => {
    servicesModal.style.display = 'none';
}

window.onclick = (event) => {
    if (event.target === servicesModal) {
        servicesModal.style.display = 'none';
    }
}

contactBtn.onclick = () => {
    contactModal.style.display = 'block';
}

closeContactBtn.onclick = () => {
    contactModal.style.display = 'none';
}

window.onclick = (event) => {
    if (event.target === contactModal) {
        contactModal.style.display = 'none';
    }
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `Question ${index + 1} of ${questions.length}: ${questions[index].question}`;

    const shuffledOptions = shuffleOptions([...questions[index].options]);

    let optionTag = shuffledOptions.map((option, i) => {
        const letter = String.fromCharCode(65 + i);
        return `<div class="option"><span>${letter}. ${option}</span></div>`;
    }).join('');

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent.split('. ').slice(1).join('. ');
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    const correctOption = questions[questionCount].options.find(option => option === correctAnswer);

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent.split('. ').slice(1).join('. ') === correctOption) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}


function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your score ${userScore} out of ${ questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 100 / questions.length;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}% `;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(225, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    },speed);
}

function shuffleQuestions(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}