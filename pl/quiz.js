document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    let userAnswers = [];

    fetch("./locales/quiz.json")
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
        data.steps[currentStep].options.forEach(option => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "answer";
            input.value = option;

            const span = document.createElement("span");
            span.textContent = option;

            label.appendChild(input);
            label.appendChild(span);
            optionsContainer.appendChild(label);
        });

        document.getElementById("next-btn").textContent = (currentStep === data.steps.length - 1) ? data.buttons.submit : data.buttons.next;
        document.getElementById("prev-btn").style.display = currentStep > 0 ? "inline-block" : "none";
    }

    function saveAnswer() {
        const selectedOption = document.querySelector("input[name='answer']:checked");
        if (selectedOption) {
            userAnswers[currentStep] = selectedOption.value;
        }
    }

    function submitResults(answers) {
        fetch("https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: answers })
        })
        .then(() => alert("Done!"))
        .catch(error => console.error("Issue with a sending:", error));
    }
});