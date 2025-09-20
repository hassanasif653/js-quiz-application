var quiz = [
   {
      question: "Which HTML tag is used to include JavaScript code in an HTML file?",
      option: ["A) &lt;script&gt;", "B) &lt;js&gt;", "C) &lt;javascript&gt;", "D) &lt;code&gt;"],
      answer: "A) &lt;script&gt;"
   },
   {
      question: "How do you write a single-line comment in JavaScript?",
      option: ["A) // comment", "B) /* comment */", "C) &lt;!-- comment --&gt;", "D) ## comment"],
      answer: "A) // comment"
   },
   {
      question: "What is the correct syntax to display 'Hello World' in an alert box?",
      option: ["A) alert('Hello World');", "B) alertBox('Hello World');", "C) msg('Hello World');", "D) show('Hello World');"],
      answer: "A) alert('Hello World');"
   },
   {
      question: "How is a variable declared in JavaScript?",
      option: ["A) var myVariable;", "B) variable myVariable;", "C) v myVariable;", "D) int myVariable;"],
      answer: "A) var myVariable;"
   },
   {
      question: "What is the output of console.log(typeof 123);?",
      option: ["A) 'string'", "B) 'number'", "C) 'integer'", "D) 'object'"],
      answer: "B) 'number'"
   },
   {
      question: "Which operator is used for addition in JavaScript?",
      option: ["A) +", "B) -", "C) *", "D) /"],
      answer: "A) +"
   },
   {
      question: "How do you start a function definition in JavaScript?",
      option: ["A) function myFunc() {}", "B) func myFunc() {}", "C) def myFunc() {}", "D) function: myFunc() {}"],
      answer: "A) function myFunc() {}"
   },
   {
      question: "Which method converts a string to uppercase?",
      option: ["A) .toUpperCase()", "B) .upperCase()", "C) .capitalize()", "D) .caseUpper()"],
      answer: "A) .toUpperCase()"
   },
   {
      question: "What is the result of 5 + '5' in JavaScript?",
      option: ["A) '55'", "B) 10", "C) 5", "D) Error"],
      answer: "A) '55'"
   },
   {
      question: "How do you check if two values are exactly equal (including type)?",
      option: ["A) ===", "B) ==", "C) =", "D) !="],
      answer: "A) ==="
   },
   {
      question: "How is an array declared in JavaScript?",
      option: ["A) var arr = [1, 2, 3];", "B) array arr = 1,2,3;", "C) arr = (1, 2, 3);", "D) var arr = {1, 2, 3};"],
      answer: "A) var arr = [1, 2, 3];"
   },
   {
      question: "What does document.getElementById('demo') do?",
      option: ["A) Selects an HTML element by ID", "B) Gets a JavaScript variable", "C) Changes CSS style", "D) Gets all paragraph elements"],
      answer: "A) Selects an HTML element by ID"
   },
   {
      question: "Which symbol is used for logical AND in JavaScript?",
      option: ["A) &amp;&amp;", "B) ||", "C) &", "D) ||"],
      answer: "A) &amp;&amp;"
   },
   {
      question: "How do you declare a constant variable?",
      option: ["A) const PI = 3.14;", "B) let PI = 3.14;", "C) var PI = 3.14;", "D) constant PI = 3.14;"],
      answer: "A) const PI = 3.14;"
   },
   {
      question: "What will console.log([1,2,3].length); output?",
      option: ["A) 3", "B) 2", "C) 1", "D) Error"],
      answer: "A) 3"
   }
];

var currentquestion = 0;
var score = 0;
var attempts = 0;
var maxAttempts = 2;

var scoreElement = document.getElementById("score");
var disable = document.getElementById("buttondis");
var attemptsElement = document.getElementById("attempts");
var restartBtn = document.getElementById("restartBtn");

restartBtn.disabled = true;

function renderquestion() {
    var questionelement = document.getElementById("questions");
    questionelement.innerHTML = quiz[currentquestion].question;

    var optionselement = document.getElementById("options");
    optionselement.innerHTML = "";

    for (var i = 0; i < quiz[currentquestion].option.length; i++) {
        optionselement.innerHTML +=
            "<li onclick='checkCorrect(event)' " +
            "style='padding:10px 15px; margin-bottom:10px; cursor:pointer; border:1px solid #ccc; border-radius:5px;'>" +
            quiz[currentquestion].option[i] +
            "</li>";
    }

    scoreElement.innerHTML = "";  

    attemptsElement.innerHTML = "Attempts: " + attempts + "/" + maxAttempts;
    disable.disabled = true;
}

function gotonext() {
    currentquestion++;
    if (currentquestion >= quiz.length) {
        var percentage = ((score / quiz.length) * 100).toFixed(2);

        var message = "";
        if (percentage >= 80) {
            message = "Excellent work! 🎉";
        } else if (percentage >= 50) {
            message = "Good job! 🙂";
        } else {
            message = "Keep practicing! 💪";
        }

        document.getElementById("questions").innerHTML =
            "Quiz completed! Your score is: " + score + " out of " + quiz.length +
            " (" + percentage + "%)<br><br>" + message;

        document.getElementById("options").innerHTML = "";
        document.getElementById("attempts").innerHTML = "";
        disable.disabled = true;
        restartBtn.disabled = false; 
        return;
    }
    renderquestion();
}

function checkCorrect(event) {
    var selected = event.target.innerHTML;
    var correct = quiz[currentquestion].answer;

    if (correct === selected) {
        event.target.style.backgroundColor = "green";
        event.target.style.color = "white";
        score++;
    } else {
        event.target.style.backgroundColor = "red";
        event.target.style.color = "white";
    }

   

    var optionselement = document.getElementById("options");
    var allOptions = optionselement.getElementsByTagName("li");

    for (var i = 0; i < allOptions.length; i++) {
        allOptions[i].onclick = null;
        allOptions[i].style.cursor = "default";
    }
    disable.disabled = false;

    if (attempts < maxAttempts) {
        restartBtn.disabled = false;
    }
}

function restartQuiz() {
    if (attempts < maxAttempts) {
        attempts++;
        currentquestion = 0;
        score = 0;
        renderquestion();
        restartBtn.disabled = true; 
    } else {
        alert("You have already used all " + maxAttempts + " attempts. No more restarts allowed.");
        disable.disabled = true;
        restartBtn.disabled = true;
    }
}

renderquestion();
