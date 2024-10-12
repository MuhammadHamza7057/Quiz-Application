let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question');
const numbers = document.querySelectorAll('.number ol li');
const submitButton = document.getElementById('submitButton');

function showQuestion(index) {
    questions.forEach((question, i) => {
        question.style.display = i === index ? 'block' : 'none';
    });

    // Update the number list
    numbers.forEach((num, i) => {
        num.style.fontWeight = i === index ? 'bold' : 'normal';
        num.style.color = i === index ? 'white' : 'black'; // Change text color for the active number to white
        num.style.backgroundColor = i === index ? 'black' : 'skyblue'; // Change background for the active number to black
    });

    // Check if the submit button should be enabled or disabled
    checkSubmitButton();
}

function changeQuestion(direction) {
    currentQuestionIndex += direction;

    if (currentQuestionIndex < 0) {
        currentQuestionIndex = 0; // Prevent going before the first question
    } else if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = questions.length - 1; // Prevent going after the last question
    }

    showQuestion(currentQuestionIndex);
}

// Add click event listeners to the number elements
numbers.forEach((num, index) => {
    num.addEventListener('click', () => {
        currentQuestionIndex = index; // Set current question index to the clicked number
        showQuestion(currentQuestionIndex);
    });
});

// Function to check if all questions have a selected option
function checkSubmitButton() {
    const allQuestionsAnswered = Array.from(questions).every((question) => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        return Array.from(inputs).some((input) => input.checked);
    });

    // Show or hide the submit button based on whether all questions are answered
    if (allQuestionsAnswered) {
        submitButton.style.display = 'block'; // Show the button
        submitButton.style.backgroundColor = 'green'; // Set background color
        submitButton.style.color = 'white'; // Set text color
    } else {
        submitButton.style.display = 'none'; // Hide the button
    }
}

// Add change event listeners to each radio button
questions.forEach((question) => {
    const inputs = question.querySelectorAll('input[type="radio"]');
    inputs.forEach((input) => {
        input.addEventListener('change', checkSubmitButton); // Call checkSubmitButton when any option is selected
    });
});

// Show the first question initially
showQuestion(currentQuestionIndex);
