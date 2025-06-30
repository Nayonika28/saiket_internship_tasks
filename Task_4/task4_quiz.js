const questions = [
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Cool Style Structure"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used to define a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  }
];

let currentIndex = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const nextBtn = document.getElementById("next-btn");

const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreDisplay = document.getElementById("score");
const emojiResult = document.getElementById("emoji-result");
const currentQ = document.getElementById("current-q");
const totalQ = document.getElementById("total-q");

totalQ.textContent = questions.length;

startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
};

restartBtn.onclick = () => {
  location.reload();
};

nextBtn.onclick = () => {
  const selected = document.querySelector(".option.selected");
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  const correctAnswer = questions[currentIndex].answer;

  if (selected.textContent === correctAnswer) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("wrong");
    [...optionsContainer.children].forEach(opt => {
      if (opt.textContent === correctAnswer) opt.classList.add("correct");
    });
  }

  nextBtn.disabled = true;

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
      nextBtn.disabled = false;
    } else {
      showResult();
    }
  }, 1000);
};

function loadQuestion() {
  currentQ.textContent = currentIndex + 1;
  questionText.textContent = questions[currentIndex].question;
  optionsContainer.innerHTML = "";

  questions[currentIndex].options.forEach(option => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.textContent = option;
    div.onclick = () => selectOption(div);
    optionsContainer.appendChild(div);
  });
}

function selectOption(selectedDiv) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => opt.classList.remove("selected"));
  selectedDiv.classList.add("selected");
}

function showResult() {
  quizBox.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreDisplay.textContent = `${score} / ${questions.length}`;
  if (score === questions.length) {
    emojiResult.textContent = "🌟 Perfect!";
  } else if (score === questions.length - 1) {
    emojiResult.textContent = "👍 Great job!";
  } else {
    emojiResult.textContent = "😅 Try again!";
  }
}
