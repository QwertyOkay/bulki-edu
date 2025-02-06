document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    let userAnswers = [];
    let quizData = null;

    // Элементы
    const startPage = document.getElementById("start-page");
    const quizContainer = document.getElementById("quiz-container");
    const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
    const quizContent = document.getElementById("quiz-content");
    const startButton = document.getElementById("start-btn");
    const nextButton = document.getElementById("next-btn");
    const prevButton = document.getElementById("prev-btn");
    const quizImageContainer = document.getElementById("quiz-image-container");
    const quizCompletionPage = document.getElementById("quiz-completion");

    // Создание изображения для котика
    const catImg = new Image();
    catImg.classList.add("quiz-cat");
    catImg.alt = "Quiz Cat";
    catImg.style.display = "none";
    quizImageContainer.appendChild(catImg);

    // Прелоад изображений (11 котов)
    const preloadImages = [
        "../assets/img/cat-firstPage.svg",
        "../assets/img/cat-step1.svg",
        "../assets/img/cat-step2.svg",
        "../assets/img/cat-step3.svg",
        "../assets/img/cat-step4.svg",
        "../assets/img/cat-step5.svg",
        "../assets/img/cat-step6.svg",
        "../assets/img/cat-step7.svg",
        "../assets/img/cat-step8.svg",
        "../assets/img/cat-step9.svg",
        "../assets/img/cat-step10.svg",
        "../assets/img/cat-step11.svg"
    ];

    catImg.onerror = () => {
        console.error("Ошибка загрузки изображения:", catImg.src);
        catImg.style.display = "none";
    };

    // Старт квиза
    startButton.addEventListener("click", () => {
        startPage.style.display = "none";
        quizContainer.classList.remove("hidden");
        quizHeaderWrapper.classList.remove("hidden");
        quizContent.classList.remove("hidden");
        currentStep = 0;
        catImg.src = "../assets/img/cat-step1.svg";
        catImg.style.display = "block";
        updateButtonStyles();
    });

    // Загрузка данных квиза
    const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

    fetch(`../${langFolder}/locales/quiz.json`)
        .then((response) => response.json())
        .then((data) => {
            if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
                throw new Error("Ошибка: некорректные данные квиза");
            }

            quizData = data;
            userAnswers = new Array(quizData.steps.length).fill(null);
            loadStep();

            nextButton.addEventListener("click", () => navigate(1));
            prevButton.addEventListener("click", () => navigate(-1));
        })
        .catch(console.error);

    function loadStep() {
        if (!quizData || !quizData.steps || !quizData.steps[currentStep]) {
            console.error("Ошибка: шаг не найден", currentStep);
            return;
        }

        document.getElementById("quiz-title").textContent = quizData.steps[currentStep].question;
        document.querySelector(".quiz-progress").textContent = `${currentStep + 1}/${quizData.steps.length}`;

        const optionsContainer = document.getElementById("quiz-options");
        optionsContainer.innerHTML = "";

        const stepData = quizData.steps[currentStep];

        stepData.options.forEach((option) => {
            const label = document.createElement("label");
            label.className = "quiz-option";

            const input = document.createElement("input");
            input.type = stepData.multiSelect ? "checkbox" : "radio";
            input.name = "answer";
            input.value = option;

            // Восстанавливаем сохраненный ответ
            if (userAnswers[currentStep]) {
                if (Array.isArray(userAnswers[currentStep]) && userAnswers[currentStep].includes(option)) {
                    input.checked = true;
                    label.classList.add("selected");
                } else if (userAnswers[currentStep] === option) {
                    input.checked = true;
                    label.classList.add("selected");
                }
            }

            const span = document.createElement("span");
            span.textContent = option;

            label.append(input, span);
            optionsContainer.appendChild(label);

            // 🔥 Исправляем проблему с выбором
            label.addEventListener("click", () => {
                if (stepData.multiSelect) {
                    // Множественный выбор (checkbox)
                    input.checked = !input.checked;

                    if (input.checked) {
                        label.classList.add("selected");
                    } else {
                        label.classList.remove("selected");
                    }

                    userAnswers[currentStep] = Array.from(
                        document.querySelectorAll('input[name="answer"]:checked')
                    ).map((el) => el.value);
                } else {
                    // Одиночный выбор (radio)
                    document.querySelectorAll(".quiz-option").forEach((opt) => opt.classList.remove("selected"));
                    input.checked = true;
                    label.classList.add("selected");

                    userAnswers[currentStep] = input.value;
                }

                updateButtonStyles();
            });
        });

        if (currentStep < preloadImages.length) {
            catImg.src = preloadImages[currentStep];
            catImg.style.display = "block";
        }

        updateButtonStyles();
        prevButton.style.display = currentStep > 0 ? "none" : "none";
    }

    function navigate(direction) {
        if (!quizData) return;

        if (direction === 1 && currentStep < 9) {
            saveAnswer();
        }

        currentStep += direction;

        if (currentStep >= quizData.steps.length) {
            showCompletionPage();
        } else {
            loadStep();
        }
    }

    function updateButtonStyles() {
        const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');

        if (currentStep === 9) {
            nextButton.textContent = "Відправити";
            nextButton.classList.remove("btn-skip", "btn-disabled");
            nextButton.classList.add("btn-active");
        } else if (selectedOptions.length > 0) {
            nextButton.textContent = "Продовжити";
            nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
            nextButton.classList.add("btn-active");
        } else {
            nextButton.textContent = "Пропустити питання";
            nextButton.classList.remove("btn-active", "btn-submit");
            nextButton.classList.add("btn-skip", "btn-disabled");
        }
    }

    function saveAnswer() {
        const selected = document.querySelectorAll('input[name="answer"]:checked');
        userAnswers[currentStep] = selected.length > 1
            ? Array.from(selected).map(el => el.value)
            : (selected[0] ? selected[0].value : null);
    }

    function showCompletionPage() {
        quizContainer.classList.add("hidden");
        quizHeaderWrapper.classList.add("hidden");
        quizCompletionPage.classList.remove("hidden");
    }

    // Логика "Назад" на стрелку
    const backArrow = document.querySelector(".image-arrow-left");

    if (backArrow) {
        backArrow.addEventListener("click", () => {
            if (currentStep === 0) {
                startPage.style.display = "flex";
                quizContainer.classList.add("hidden");
                quizHeaderWrapper.classList.add("hidden");
                quizContent.classList.add("hidden");

                document.body.style.overflow = "auto";
                document.body.style.height = "auto";
            } else {
                navigate(-1);
            }
        });
    }
});