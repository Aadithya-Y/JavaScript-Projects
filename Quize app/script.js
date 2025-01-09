const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Venus", correct: false },
      ],
    },
    {
      question: "What is the largest ocean on Earth?",
      answers: [
        { text: "Atlantic Ocean", correct: false },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean", correct: false },
        { text: "Pacific Ocean", correct: true },
      ],
    },
  ];
  
  let currentQuestionIndex = 0;
  let timeLeft = 15;
  let timer;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const answersListElement = document.getElementById("answers-list");
  const nextButton = document.getElementById("next-btn");
  const timerElement = document.getElementById("time");
  const resultBox = document.getElementById("result-box");
  const scoreElement = document.getElementById("score");
  const totalElement = document.getElementById("total");
  const restartButton = document.getElementById("restart-btn");
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.style.display = "none";
    document.querySelector(".quiz-box").style.display = "block";
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("answer-btn");
      if (answer.correct) {
        button.dataset.correct = true;
      }
      button.addEventListener("click", selectAnswer);
      const li = document.createElement("li");
      li.appendChild(button);
      answersListElement.appendChild(li);
    });
  }
  
  function resetState() {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    nextButton.style.display = "none";
    while (answersListElement.firstChild) {
      answersListElement.removeChild(answersListElement.firstChild);
    }
  }
  
  function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
      score++;
      selectedButton.classList.add("correct");
    } else {
      selectedButton.classList.add("wrong");
    }
  
    Array.from(answersListElement.children).forEach((listItem) => {
      const button = listItem.firstChild;
      button.disabled = true;
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
    });
  
    clearInterval(timer); // Stop the timer
    nextButton.style.display = "block";
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      startTimer();
    } else {
      showResults();
    }
  });
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        disableAnswers();
        nextButton.style.display = "block";
      }
    }, 1000);
  }
  
  function disableAnswers() {
    Array.from(answersListElement.children).forEach((listItem) => {
      const button = listItem.firstChild;
      button.disabled = true;
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
    });
  }
  
  function showResults() {
    resetState();
    document.querySelector(".quiz-box").style.display = "none";
    resultBox.style.display = "block";
    scoreElement.textContent = score;
    totalElement.textContent = questions.length;
  }
  
  restartButton.addEventListener("click", startQuiz);
  
  startQuiz();
  