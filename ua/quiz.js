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

    // Функция для загрузки текущего шага
    function loadStep() {
        // if (!quizData || !quizData.steps || !quizData.steps[currentStep]) {
        //     console.error("Ошибка: шаг не найден", currentStep);
        //     return;
        // }
        if (!quizData || !quizData.steps || !quizData.steps[currentStep]) {
        console.error("Ошибка: шаг не найден", currentStep);
        return;
    }

        // const stepData = quizData.steps[currentStep];
        // const quizTitle = document.getElementById("quiz-title");
        // const optionsContainer = document.getElementById("quiz-options");
        const stepData = quizData.steps[currentStep];
    const quizTitle = document.getElementById("quiz-title");
    const optionsContainer = document.getElementById("quiz-options");

        // Очищаем контейнер с вариантами
        optionsContainer.innerHTML = "";

         // Удаляем предыдущие классы шагов
        optionsContainer.classList.remove("step-2", "step-6", "step-7");
        
        // Добавляем класс для текущего шага
    if (currentStep === 1) {
        optionsContainer.classList.add("step-2");
    } else if (currentStep === 5) {
        optionsContainer.classList.add("step-6");
    } else if (currentStep === 6) { // Шаг 7 (индекс 6)
        optionsContainer.classList.add("step-7");
    }

        // Проверяем и очищаем подзаголовок перед добавлением нового
        let existingSubTitle = document.querySelector(".quiz-subtitle");
        if (existingSubTitle) existingSubTitle.remove();

        // Обновляем заголовок
        quizTitle.textContent = stepData.question;

        // 🟢 Если это ВТОРОЙ шаг, добавляем `step-2`
        if (currentStep === 1) {
            optionsContainer.classList.add("step-2");
        } else {
            optionsContainer.classList.remove("step-2");
        }

        // 🟢 Если это ШЕСТОЙ шаг, добавляем `step-6` и обрабатываем его отдельно
        if (currentStep === 5 && typeof stepData.options === "object") {
            optionsContainer.classList.add("step-6");

            // ✅ Блок 1: ДНИ НЕДЕЛИ (ЧЕКБОКСЫ)
            const daysGroup = document.createElement("div");
            daysGroup.classList.add("quiz-group", "quiz-days");
            stepData.options.days.forEach((day) => {
                const label = document.createElement("label");
                label.className = "quiz-option half-width";
                const input = document.createElement("input");
                input.type = "checkbox"; // 🔥 Чекбокс
                input.name = "answer-day";
                input.value = day;
                const span = document.createElement("span");
                span.textContent = day;
                label.append(input, span);
                daysGroup.appendChild(label);

                // Восстановление выбранных значений
                if (userAnswers[currentStep]?.days?.includes(day)) {
                    input.checked = true;
                    label.classList.add("selected");
                }

                // Обработчик клика
                label.addEventListener("click", () => {
                    input.checked = !input.checked;
                    label.classList.toggle("selected", input.checked);
                    updateSelectedAnswers();
                });
            });
            optionsContainer.appendChild(daysGroup);

            // ✅ Блок 2: ВРЕМЯ (ЧЕКБОКСЫ + ИКОНКИ)
            const timeGroup = document.createElement("div");
            timeGroup.classList.add("quiz-group", "quiz-times");
            stepData.options.times.forEach((time) => {
                const label = document.createElement("label");
                label.className = "quiz-option full-width";
                const input = document.createElement("input");
                input.type = "checkbox"; // 🔥 Чекбокс
                input.name = "answer-time";
                input.value = time.text;
                const icon = document.createElement("span");
                icon.className = "quiz-icon";
                icon.textContent = time.icon;
                const span = document.createElement("span");
                span.textContent = time.text;
                label.append(input, icon, span);
                timeGroup.appendChild(label);

                // Восстановление выбранных значений
                if (userAnswers[currentStep]?.times?.includes(time.text)) {
                    input.checked = true;
                    label.classList.add("selected");
                }

                // Обработчик клика
                label.addEventListener("click", () => {
                    input.checked = !input.checked;
                    label.classList.toggle("selected", input.checked);
                    updateSelectedAnswers();
                });
            });
            optionsContainer.appendChild(timeGroup);
        }
        // 🛠️ ОБРАБОТКА ДРУГИХ ШАГОВ (НЕ 6-го)
        else {
            optionsContainer.classList.remove("step-6");

            stepData.options.forEach((option, index) => {
                const label = document.createElement("label");
                label.className = "quiz-option";

                let optionText = "";
                if (typeof option === "string") {
                    optionText = option;
                    label.classList.add("half-width");
                } else {
                    optionText = option.text;
                    label.classList.add(option.width === "full" ? "full-width" : "half-width");
                }

                const input = document.createElement("input");
                input.type = stepData.multiSelect ? "checkbox" : "radio"; // 🔥 Радио или чекбокс
                input.name = "answer";
                input.value = optionText;

                if (userAnswers[currentStep]) {
                    if (
                        Array.isArray(userAnswers[currentStep]) &&
                        userAnswers[currentStep].includes(optionText)
                    ) {
                        input.checked = true;
                        label.classList.add("selected");
                    } else if (userAnswers[currentStep] === optionText) {
                        input.checked = true;
                        label.classList.add("selected");
                    }
                }

                const span = document.createElement("span");
                span.textContent = optionText;
                label.append(input, span);
                optionsContainer.appendChild(label);

                label.addEventListener("click", () => {
                    if (stepData.multiSelect) {
                        input.checked = !input.checked;
                        label.classList.toggle("selected", input.checked);
                    } else {
                        document.querySelectorAll(".quiz-option").forEach((opt) => opt.classList.remove("selected"));
                        input.checked = true;
                        label.classList.add("selected");
                        userAnswers[currentStep] = input.value;
                    }
                    updateButtonStyles();
                });
            });
        }

        updateButtonStyles();
        document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${quizData.steps.length}`;
    }

    // Функция для обновления ответов
    function updateSelectedAnswers() {
        if (currentStep === 5) { // Шаг 6 (индекс 5)
            const selectedDays = Array.from(document.querySelectorAll('input[name="answer-day"]:checked')).map(el => el.value);
            const selectedTimes = Array.from(document.querySelectorAll('input[name="answer-time"]:checked')).map(el => el.value);

            userAnswers[currentStep] = {
                days: selectedDays,
                times: selectedTimes
            };
        } else {
            const selected = document.querySelectorAll('input[name="answer"]:checked');
            userAnswers[currentStep] = quizData.steps[currentStep].multiSelect
                ? Array.from(selected).map(el => el.value)
                : (selected[0] ? selected[0].value : null);
        }
    }

    // Функция сохранения ответа
    function saveAnswer() {
        updateSelectedAnswers();
    }

    // Функция обновления стилей кнопок
    function updateButtonStyles() {
        let hasSelection = false;

        if (currentStep === 5) { // Шаг 6 (чекбоксы)
            const selectedDays = document.querySelectorAll('input[name="answer-day"]:checked').length > 0;
            const selectedTimes = document.querySelectorAll('input[name="answer-time"]:checked').length > 0;
            hasSelection = selectedDays || selectedTimes;
        } else { // Остальные шаги
            const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
            hasSelection = selectedOptions.length > 0;
        }

        if (currentStep === 9) { // Последний шаг
            nextButton.textContent = "Відправити";
            nextButton.classList.remove("btn-skip", "btn-disabled");
            nextButton.classList.add("btn-active");
        } else if (hasSelection) {
            nextButton.textContent = "Продовжити";
            nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
            nextButton.classList.add("btn-active");
        } else {
            nextButton.textContent = "Пропустити питання";
            nextButton.classList.remove("btn-active", "btn-submit");
            nextButton.classList.add("btn-skip", "btn-disabled");
        }
    }

    // Функция навигации
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

    // Функция обновления стилей кнопок
    function updateButtonStyles() {
        const hasSelectedDays = document.querySelectorAll('input[name="answer-day"]:checked').length > 0;
        const hasSelectedTimes = document.querySelectorAll('input[name="answer-time"]:checked').length > 0;

        if (currentStep === 9) {
            nextButton.textContent = "Відправити";
            nextButton.classList.remove("btn-skip", "btn-disabled");
            nextButton.classList.add("btn-active");
        } else if (hasSelectedDays || hasSelectedTimes || document.querySelectorAll('input[name="answer"]:checked').length > 0) {
            nextButton.textContent = "Продовжити";
            nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
            nextButton.classList.add("btn-active");
        } else {
            nextButton.textContent = "Пропустити питання";
            nextButton.classList.remove("btn-active", "btn-submit");
            nextButton.classList.add("btn-skip", "btn-disabled");
        }
    }

    // Функция сохранения ответа
    function saveAnswer() {
        updateSelectedAnswers();
    }

    // Функция показа страницы завершения
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