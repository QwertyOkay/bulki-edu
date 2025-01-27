document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    let userAnswers = [];

    // Detect correct language folder
    const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

    fetch(`../${langFolder}/locales/quiz.json`) // Ensure correct JSON path
        .then(response => response.json())
        .then(data => {
            loadStep(data);

            document.getElementById("next-btn").addEventListener("click", () => {
                saveAnswer();
                if (currentStep < data.steps.length - 1) {
                    currentStep++;
                    loadStep(data);
                } else {
                    submitResults(userAnswers);
                }
            });

            document.getElementById("prev-btn").addEventListener("click", () => {
                if (currentStep > 0) {
                    currentStep--;
                    loadStep(data);
                }
            });
        });

    function loadStep(data) {
        document.getElementById("quiz-title").textContent = data.steps[currentStep].question;
        document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${data.steps.length}`;

        const optionsContainer = document.getElementById("quiz-options");
        optionsContainer.innerHTML = "";

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
                optionsContainer.appendChild(label);
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

                optionsContainer.appendChild(input);
            });
        }

        document.getElementById("next-btn").textContent = (currentStep === data.steps.length - 1) ? data.buttons.submit : data.buttons.next;
        document.getElementById("prev-btn").style.display = currentStep > 0 ? "inline-block" : "none";
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