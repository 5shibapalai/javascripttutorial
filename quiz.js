(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
    
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    },
    {
      question: "Which of the following is an advantage of using JavaScript?",
      answers: {
        a: "Less server interaction",
        b: "Immediate feedback to the visitors",
        c: " Increased interactivity",
        d: " All of the above."
      },
      correctAnswer: "d"
    },
    {
      question: "Which of the following is a valid type of function javascript supports?",
      answers: {
        a: "named function",
        b: "anonymous function",
        c: "Both of the above.",
        d: " None of the above."
      },
      correctAnswer: "c"
    },
    {
      question: "Which built-in method returns the length of the string?",
      answers: {
        a: "length()",
        b: "size()",
        c: "index()",
        d: "None of the above."
      },
      correctAnswer: "a"
    },
    {
      question: "Which of the following function of Number object returns a string value version of the current number in a format that may vary according to a browser's locale settings.?",
      answers: {
        a: "toExponential()",
        b: "toFixed()",
        c: "toLocaleString()",
        d: "toString()"
      },
      correctAnswer: "c"
    },
    {
      question: "Which of the following function of Array object extracts a section of an array and returns a new array?",
      answers: {
        a: "reverse()",
        b: "shift()",
        c: "slice()",
        d: "some()"
      },
      correctAnswer: "c"
    },
    {
      question: "Which of the following function of String object creates an HTML anchor that is used as a hypertext target?",
      answers: {
        a: "anchor()",
        b: "link()",
        c: "blink()",
        d: "big()"
      },
      correctAnswer: "a"
    },
    {
      question: "Which of the following function of String object creates an HTML hypertext link that requests another URL?",
      answers: {
        a: "link()",
        b: "sub()",
        c: "sup()",
        d: "small()"
      },
      correctAnswer: "a"
    },
    

  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
