document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    let userAnswers = [];

    const startPage = document.getElementById("start-page");
    const quizContainer = document.getElementById("quiz-container");
    const startButton = document.getElementById("start-btn");
    const nextButton = document.getElementById("next-btn");
    const prevButton = document.getElementById("prev-btn");

    if (startButton) {
        startButton.addEventListener("click", function () {
            if (startPage && quizContainer) {
                startPage.style.display = "none"; // Hide start page
                quizContainer.style.display = "block"; // Show quiz
            }
        });
    }

    // Ensure quiz buttons exist before adding event listeners
    if (!nextButton || !prevButton) {
        console.error("Quiz buttons not found. Make sure the quiz container is in the HTML.");
        return;
    }

    // Detect correct language folder
    const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

    fetch(`../${langFolder}/locales/quiz.json`)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.steps) {
                console.error("Quiz JSON is missing or invalid");
                return;
            }
            loadStep(data);

            nextButton.addEventListener("click", () => {
                saveAnswer();
                if (currentStep < data.steps.length - 1) {
                    currentStep++;
                    loadStep(data);
                } else {
                    submitResults(userAnswers);
                }
            });

            prevButton.addEventListener("click", () => {
                if (currentStep > 0) {
                    currentStep--;
                    loadStep(data);
                }
            });
        })
        .catch(error => console.error("Error loading quiz JSON:", error));

    function loadStep(data) {
        const quizTitle = document.getElementById("quiz-title");
        const quizProgress = document.querySelector(".quiz-progress");
        const quizOptions = document.getElementById("quiz-options");
        const imageContainer = document.querySelector(".image-container");

        if (!quizTitle || !quizProgress || !quizOptions || !imageContainer) {
            console.error("Quiz elements are missing!");
            return;
        }

        quizTitle.textContent = data.steps[currentStep].question;
        quizProgress.textContent = `${currentStep + 1} / ${data.steps.length}`;

        quizOptions.innerHTML = "";
        imageContainer.innerHTML = ""; // Clear old images

        if (data.steps[currentStep].options) {
            data.steps[currentStep].options.forEach(option => {
                const label = document.createElement("label");
                label.classList.add("quiz-option");

                const input = document.createElement("input");
                input.type = "radio";
                input.name = "answer";
                input.value = option;

                if (userAnswers[currentStep] === option) {
                    input.checked = true;
                }

                const span = document.createElement("span");
                span.textContent = option;

                label.appendChild(input);
                label.appendChild(span);
                quizOptions.appendChild(label);
            });
        } else if (data.steps[currentStep].fields) {
            data.steps[currentStep].fields.forEach(field => {
                const input = document.createElement("input");
                input.type = "text";
                input.name = field;
                input.placeholder = field;

                if (userAnswers[currentStep]) {
                    input.value = userAnswers[currentStep];
                }

                quizOptions.appendChild(input);
            });
        }

        // Dynamically change the image based on the step
        const stepImages = [
            "../assets/img/cat-firstPage.svg",  // Step 1
            "../assets/img/cat-ua-step2.png",  // Step 2
            "../assets/img/cat-ua-step3.png",  // Step 3
            "../assets/img/cat-ua-step4.png"   // Step 4
        ];

        if (currentStep < stepImages.length) {
            const imgElement = document.createElement("img");
            imgElement.src = stepImages[currentStep];
            imgElement.alt = "Quiz Step Image";
            imgElement.classList.add("quiz-image");
            imageContainer.appendChild(imgElement);
        }

        nextButton.textContent = (currentStep === data.steps.length - 1) ? data.buttons.submit : data.buttons.next;
        prevButton.style.display = currentStep > 0 ? "inline-block" : "none";
    }

    function saveAnswer() {
        const selectedOption = document.querySelector("input[name='answer']:checked");
        const inputFields = document.querySelectorAll("input[type='text']");

        if (selectedOption) {
            userAnswers[currentStep] = selectedOption.value;
        } else if (inputFields.length > 0) {
            userAnswers[currentStep] = Array.from(inputFields).map(input => input.value);
        }
    }

    function submitResults(answers) {
        fetch("https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: answers })
        })
        .then(() => alert("Дані відправлено!"))
        .catch(error => console.error("Помилка при відправленні:", error));
    }
});