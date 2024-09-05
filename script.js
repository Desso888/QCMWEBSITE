const homeBtn = document.querySelector('.navbar a.active');
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
const questionCountSelect = document.getElementById('question-count');
const prevBtn = document.querySelector('.prev-btn');

let totalQuestions = 20;
let timer;
let timeLeft = 20;

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
    startTimer();
}

tryAgainBtn.onclick = () => {
    resetTimer();
    startTimer();

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
    resetTimer();

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

homeBtn.onclick = () => {
    aboutBtn.classList.remove('active');
    servicesBtn.classList.remove('active');
    contactBtn.classList.remove('active');
    homeBtn.classList.add('active');
    aboutModal.style.display = 'none';
    servicesModal.style.display = 'none';
    contactModal.style.display = 'none';
};

aboutBtn.onclick = () => {
    homeBtn.classList.remove('active');
    servicesBtn.classList.remove('active');
    contactBtn.classList.remove('active');
    aboutBtn.classList.add('active');
    aboutModal.style.display = 'block';
    servicesModal.style.display = 'none';
    contactModal.style.display = 'none';
}

closeBtn.onclick = () => {
    aboutModal.style.display = 'none';
    aboutBtn.classList.remove('active');
    homeBtn.classList.add('active');
}

servicesBtn.onclick = () => {
    homeBtn.classList.remove('active');
    aboutBtn.classList.remove('active');
    contactBtn.classList.remove('active');
    servicesBtn.classList.add('active');
    servicesModal.style.display = 'block';
    aboutModal.style.display = 'none';
    contactModal.style.display = 'none';
};

closeServicesBtn.onclick = () => {
    servicesBtn.classList.remove('active');
    servicesModal.style.display = 'none';
    homeBtn.classList.add('active');
}

contactBtn.onclick = () => {
    homeBtn.classList.remove('active');
    aboutBtn.classList.remove('active');
    servicesBtn.classList.remove('active');
    contactBtn.classList.add('active');
    contactModal.style.display = 'block';
    aboutModal.style.display = 'none';
    servicesModal.style.display = 'none';
};

closeContactBtn.onclick = () => {
    contactBtn.classList.remove('active');
    contactModal.style.display = 'none';
    homeBtn.classList.add('active');
}

prevBtn.onclick = () => {
    clearInterval(timer);
    resetTimer();
    if (questionCount > 0) {
        questionCount--;
        showQuestions(questionCount);
        questionNumb--;
        questionCounter(questionNumb);
        nextBtn.classList.add('active');
    }
    startTimer();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    clearInterval(timer);
    resetTimer();
    if (questionCount < totalQuestions - 1) {
      questionCount++;
      showQuestions(questionCount);
      questionNumb++;
      questionCounter(questionNumb);
      nextBtn.classList.remove('active');
      startTimer();
    } else {
      showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `Question ${index + 1} of ${totalQuestions}: ${questions[index].question}`;

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

    if (index === 0) {
        prevBtn.classList.remove('active');
    } else {
        prevBtn.classList.add('active');
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
    questionTotal.textContent = `${index} of ${totalQuestions} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${totalQuestions}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your score ${userScore} out of ${totalQuestions}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / totalQuestions) * 100;
    let speed = 100 / totalQuestions;

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

function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('time-left').textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        if (questionCount < totalQuestions - 1) {
          nextBtn.click();
        } else {
          showResultBox();
        }
      }
    }, 1000);
}

function resetTimer() {
    timeLeft = 20;
    document.getElementById('time-left').textContent = timeLeft;
}
