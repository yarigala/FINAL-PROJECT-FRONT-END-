let correct = 0;
let wrong = 0;
let totalQuestions = 0;
let currentQuestion = 0;
let rangeStart = 0;
let rangeEnd = 0;
let operations = [];
let correctAnswer = 0;
let timerInterval;

document.getElementById('start').addEventListener('click', startGame);

function startGame() {
    correct = wrong = currentQuestion = 0;
    totalQuestions = document.getElementById('numQuestions').value;
    rangeStart = parseInt(document.getElementById('rangeStart').value);
    rangeEnd = parseInt(document.getElementById('rangeEnd').value);

    operations = [];
    if (document.getElementById('add').checked) operations.push('+');
    if (document.getElementById('subtract').checked) operations.push('-');
    if (document.getElementById('multiply').checked) operations.push('*');
    if (document.getElementById('divide').checked) operations.push('/');

    document.getElementById('settings').style.display = 'none';
    document.getElementById('questionnaire').style.display = 'block';

    nextQuestion();
}

function nextQuestion() {
    clearInterval(timerInterval);
    if (currentQuestion >= totalQuestions) {
        showResults();
        return;
    }

    const num1 = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
    const num2 = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
    const operation = operations[Math.floor(Math.random() * operations.length)];

    switch (operation) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
        case '/': correctAnswer = parseFloat((num1 / num2).toFixed(2)); break;
    }

    document.getElementById('problem').textContent = `${num1} ${operation} ${num2}`;
    document.getElementById('userAnswer').value = '';
    currentQuestion++;

    startTimer();
}

document.getElementById('submit').addEventListener('click', () => {
    const userAnswer = parseFloat(document.getElementById('userAnswer').value);
    if (userAnswer === correctAnswer) {
        correct++;
    } else {
        wrong++;
    }
    nextQuestion();
});

function startTimer() {
    let timeLeft = 10;
    document.getElementById('timeLeft').textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            wrong++;
            nextQuestion();
        }
    }, 1000);
}

function showResults() {
    const accuracy = ((correct / totalQuestions) * 100).toFixed(2);
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    document.getElementById('correct').textContent = correct;
    document.getElementById('wrong').textContent = wrong;

    document.getElementById('questionnaire').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}

document.getElementById('restart').addEventListener('click', () => location.reload());
