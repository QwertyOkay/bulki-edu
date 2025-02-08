
// Коты не меняются
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
        if (!quizData) {
            console.error("Ошибка: данные квиза не загружены.");
            alert("Данные для квиза не загружены. Пожалуйста, попробуйте позже.");
            return;
        }

        startPage.style.display = "none";
        quizContainer.classList.remove("hidden");
        quizHeaderWrapper.classList.remove("hidden");
        quizContent.classList.remove("hidden");
        currentStep = 0;
        // catImg.src = "../assets/img/cat-step1.svg";
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
            prevButton?.addEventListener("click", () => navigate(-1));
        })
        .catch((error) => {
            console.error("Ошибка при загрузке данных:", error);
            alert("Не удалось загрузить данные для квиза.");
        });
    
    function updateCatImage() {
    const stepIndex = currentStep + 1; // так как изображения нумеруются с 1
    if (stepIndex >= 0 && stepIndex < preloadImages.length) {
        catImg.src = preloadImages[stepIndex];
        catImg.style.display = "block";
    } else {
        catImg.style.display = "none";
    }
}

    // Функция для загрузки текущего шага
    function loadStep() {
        if (!quizData || !quizData.steps || !quizData.steps[currentStep]) {
            console.error("Ошибка: шаг не найден", currentStep);
            return;
        }

        const stepData = quizData.steps[currentStep];
        const quizTitle = document.getElementById("quiz-title");
        const optionsContainer = document.getElementById("quiz-options");

        // Очищаем контейнер с вариантами
        optionsContainer.innerHTML = "";

        // Удаляем предыдущие классы шагов
        optionsContainer.classList.remove("step-2", "step-6", "step-7", "step-8");

        // Добавляем класс для текущего шага
        if (currentStep === 1) { // Шаг 2
            optionsContainer.classList.add("step-2");

            stepData.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "quiz-option";

    let optionText = "";
    if (typeof option === "string") {
        optionText = option;
        label.classList.add("half-width");
    } else {
        optionText = option.text; // ✅ Берём текст вместо объекта
        label.classList.add(option.width === "full" ? "full-width" : "half-width");
    }

    const input = document.createElement("input");
    input.type = stepData.multiSelect ? "checkbox" : "radio"; // Радио или чекбокс
    input.name = "answer";
    input.value = optionText; // ✅ Используем только текст

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

    // Обработчик клика
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

        } else if (currentStep === 5) { // Шаг 6
            optionsContainer.classList.add("step-6");

            // ✅ Блок 1: ДНИ НЕДЕЛИ (ЧЕКБОКСЫ)
            const daysGroup = document.createElement("div");
            daysGroup.classList.add("quiz-group", "quiz-days");

            stepData.options.days.forEach((day) => {
                const label = document.createElement("label");
                label.className = "quiz-option half-width";

                const input = document.createElement("input");
                input.type = "checkbox"; // Чекбокс
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
                input.type = "checkbox"; // Чекбокс
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
        } else if (currentStep === 6) { // Шаг 7
            optionsContainer.classList.add("step-7");

            stepData.options.forEach((option, index) => {
                const label = document.createElement("label");
                label.className = "quiz-option full-width";

                const input = document.createElement("input");
                input.type = "radio"; // Только радио для шага 7
                input.name = "answer";
                input.value = option;

                const span = document.createElement("span");
                span.textContent = option;

                label.append(input, span);
                optionsContainer.appendChild(label);

                // Восстановление выбранных значений
                if (userAnswers[currentStep] === option) {
                    input.checked = true;
                    label.classList.add("selected");
                }

                // Обработчик клика
                label.addEventListener("click", () => {
                    document.querySelectorAll(".quiz-option").forEach((opt) => opt.classList.remove("selected"));
                    input.checked = true;
                    label.classList.add("selected");
                    userAnswers[currentStep] = input.value;
                    updateButtonStyles();
                });
            });
        } else if (currentStep === 7) { // Шаг 8 (слайдер бюджета)
            optionsContainer.classList.add("step-8");

            // Создаем слайдер для выбора бюджета
            const sliderWrapper = document.createElement("div");
            sliderWrapper.classList.add("slider-wrapper");

            const sliderLabel = document.createElement("label");
            sliderLabel.textContent = "Ваш бюджет за одне заняття: ";
            sliderWrapper.appendChild(sliderLabel);

            const sliderInput = document.createElement("input");
            sliderInput.type = "range";
            sliderInput.min = "200";
            sliderInput.max = "2000";
            sliderInput.step = "100";
            sliderInput.value = userAnswers[currentStep] || "200"; // Используем сохраненное значение или 200 по умолчанию

            const valueDisplay = document.createElement("span");
            valueDisplay.classList.add("value-display");
            valueDisplay.textContent = `${sliderInput.value} грн`;

            sliderWrapper.appendChild(sliderInput);
            sliderWrapper.appendChild(valueDisplay);

            
            // 🛠 ВАЖНО! Добавляем обработчик изменений
    sliderInput.addEventListener("input", () => {
        console.log("📌 Ползунок изменен! Новое значение:", sliderInput.value);
        valueDisplay.textContent = `${sliderInput.value} грн`;
        userAnswers[currentStep] = parseInt(sliderInput.value, 10); // ✅ Сохраняем ответ
        updateButtonStyles(); // ✅ Гарантированно обновляем кнопку
    });

    console.log("🎯 Ползунок загружен. Текущее значение:", sliderInput.value);

            optionsContainer.appendChild(sliderWrapper);
        } else {
            // Обработка других шагов
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
                input.type = stepData.multiSelect ? "checkbox" : "radio"; // Радио или чекбокс
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

                // Обработчик клика
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

        updateCatImage();

        // Обновляем заголовок
        quizTitle.textContent = stepData.question;

        updateButtonStyles();
        document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${quizData.steps.length}`;
    }


    function updateSelectedAnswers() {
    if (currentStep === 5) { // Шаг 6 (индекс 5)
        const selectedDays = Array.from(document.querySelectorAll('input[name="answer-day"]:checked')).map(el => el.value);
        const selectedTimes = Array.from(document.querySelectorAll('input[name="answer-time"]:checked')).map(el => el.value);
        userAnswers[currentStep] = {
            days: selectedDays,
            times: selectedTimes
        };
    } else if (currentStep === 7) { // Шаг 8 (слайдер бюджета)
        const sliderInput = document.querySelector('input[type="range"]');
        userAnswers[currentStep] = sliderInput ? parseInt(sliderInput.value, 10) : null;
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

    function updateButtonStyles() {
    let hasSelection = false;

    if (currentStep === 5) { // Шаг 6 (чекбоксы)
        const selectedDays = document.querySelectorAll('input[name="answer-day"]:checked').length > 0;
        const selectedTimes = document.querySelectorAll('input[name="answer-time"]:checked').length > 0;
        hasSelection = selectedDays || selectedTimes;
    } else if (currentStep === 7) { // 🟢 Шаг 8 (слайдер)
        const sliderInput = document.querySelector('input[type="range"]');
        console.log("🔹 Проверка слайдера:", sliderInput.value);
        hasSelection = sliderInput && parseInt(sliderInput.value, 10) !== 200; // ✅ Проверяем, что значение изменилось
    } else { // Остальные шаги
        const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
        hasSelection = selectedOptions.length > 0;
    }

    console.log("🔄 Обновление кнопки: hasSelection =", hasSelection);

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

    console.log("🟢 Кнопка после обновления:", nextButton.textContent);
}

    // Функция навигации
    function navigate(direction) {
        if (!quizData) return;

        if (direction === -1 && currentStep === 0) return; // Не переходим назад с первого шага
        if (direction === 1 && currentStep >= quizData.steps.length - 1) return; // Не переходим дальше последнего шага

        if (direction === 1) {
            saveAnswer(); // Сохраняем ответ перед переходом
        }

        currentStep += direction;

        if (currentStep >= quizData.steps.length) {
            showCompletionPage();
        } else {
            loadStep();
        }
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

// Коты испраовлены - нет контента
// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = -1; // Начинаем с -1, чтобы стартовая страница не совпадала с первым шагом
//     let userAnswers = [];
//     let quizData = null;

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const quizImageContainer = document.getElementById("quiz-image-container");
//     const quizCompletionPage = document.getElementById("quiz-completion");

//     // Создание изображения для кота
//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений (12 котов, включая стартовую страницу)
//     const preloadImages = [
//         "../assets/img/cat-firstPage.svg", // Стартовая страница (индекс 0)
//         "../assets/img/cat-step1.svg",
//         "../assets/img/cat-step2.svg",
//         "../assets/img/cat-step3.svg",
//         "../assets/img/cat-step4.svg",
//         "../assets/img/cat-step5.svg",
//         "../assets/img/cat-step6.svg",
//         "../assets/img/cat-step7.svg",
//         "../assets/img/cat-step8.svg",
//         "../assets/img/cat-step9.svg",
//         "../assets/img/cat-step10.svg",
//         "../assets/img/cat-step11.svg"
//     ];

//     catImg.onerror = () => {
//         console.error("Ошибка загрузки изображения:", catImg.src);
//         catImg.style.display = "none";
//     };

//     // ✅ Обновление кота
//     function updateCatImage() {
//         let imageIndex = currentStep + 1; // Сдвигаем индекс на +1, чтобы избежать дублирования
//         if (imageIndex >= 0 && imageIndex < preloadImages.length) {
//             const newCatSrc = preloadImages[imageIndex];
//             if (catImg.src !== newCatSrc) {
//                 catImg.style.opacity = "0"; // Скрываем кота перед сменой
//                 catImg.onload = () => {
//                     catImg.style.opacity = "1"; // Показываем после загрузки
//                 };
//                 catImg.src = newCatSrc;
//                 catImg.style.display = "block";
//             }
//         }
//     }

//     // ✅ Загрузка данных квиза
//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";
//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then((response) => response.json())
//         .then((data) => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }
//             quizData = data;
//             userAnswers = new Array(quizData.steps.length).fill(null);

//             startButton.addEventListener("click", () => {
//                 startQuiz();
//             });

//             nextButton.addEventListener("click", () => navigate(1));
//             prevButton?.addEventListener("click", () => navigate(-1));
//         })
//         .catch((error) => {
//             console.error("Ошибка при загрузке данных:", error);
//             alert("Не удалось загрузить данные для квиза.");
//         });

//     // ✅ Запуск квиза
//     function startQuiz() {
//         if (!quizData) {
//             console.error("Ошибка: данные квиза не загружены.");
//             alert("Данные для квиза не загружены. Пожалуйста, попробуйте позже.");
//             return;
//         }

//         startPage.style.display = "none";
//         quizContainer.classList.remove("hidden");
//         quizHeaderWrapper.classList.remove("hidden");
//         quizContent.classList.remove("hidden");

//         currentStep = 0;
//         loadStep();
//     }

//     // ✅ Функция загрузки текущего шага
//     function loadStep() {
//         if (!quizData || !quizData.steps || !quizData.steps[currentStep]) {
//             console.error("Ошибка: шаг не найден", currentStep);
//             return;
//         }

//         const stepData = quizData.steps[currentStep];
//         const quizTitle = document.getElementById("quiz-title");
//         const optionsContainer = document.getElementById("quiz-options");

//         // ✅ Обновляем изображение кота перед рендерингом контента
//         updateCatImage();

//         // Очищаем контейнер с вариантами
//         optionsContainer.innerHTML = "";

//         // ✅ Обновляем заголовок
//         quizTitle.textContent = stepData.question;

//         // ✅ Обновляем кнопку
//         updateButtonStyles();

//         // ✅ Обновляем прогресс
//         document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${quizData.steps.length}`;
//     }

//     // ✅ Обновление кнопки
//     function updateButtonStyles() {
//         let hasSelection = false;

//         if (currentStep === 5) { // Шаг 6 (чекбоксы)
//             const selectedDays = document.querySelectorAll('input[name="answer-day"]:checked').length > 0;
//             const selectedTimes = document.querySelectorAll('input[name="answer-time"]:checked').length > 0;
//             hasSelection = selectedDays || selectedTimes;
//         } else if (currentStep === 7) { // Шаг 8 (слайдер)
//             const sliderInput = document.querySelector('input[type="range"]');
//             hasSelection = sliderInput && parseInt(sliderInput.value, 10) !== 200;
//         } else {
//             const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
//             hasSelection = selectedOptions.length > 0;
//         }

//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-skip", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else if (hasSelection) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active", "btn-submit");
//             nextButton.classList.add("btn-skip", "btn-disabled");
//         }
//     }

//     // ✅ Функция навигации между шагами
//     function navigate(direction) {
//         if (!quizData) return;

//         if (direction === -1 && currentStep === 0) return;
//         if (direction === 1 && currentStep >= quizData.steps.length - 1) return;

//         currentStep += direction;
//         loadStep();
//     }

//     // ✅ Логика "Назад" на стрелку
//     const backArrow = document.querySelector(".image-arrow-left");
//     if (backArrow) {
//         backArrow.addEventListener("click", () => {
//             if (currentStep === 0) {
//                 startPage.style.display = "flex";
//                 quizContainer.classList.add("hidden");
//                 quizHeaderWrapper.classList.add("hidden");
//                 quizContent.classList.add("hidden");
//                 document.body.style.overflow = "auto";
//                 document.body.style.height = "auto";
//             } else {
//                 navigate(-1);
//             }
//         });
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = -1; // Начинаем с -1, чтобы стартовая страница не совпадала с первым шагом
//     let userAnswers = [];
//     let quizData = null;

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const quizImageContainer = document.getElementById("quiz-image-container");
//     const quizCompletionPage = document.getElementById("quiz-completion");

//     // Создание изображения для кота
//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений (12 котов, включая стартовую страницу)
//     const preloadImages = [
//         "../assets/img/cat-firstPage.svg", // Стартовая страница (индекс 0)
//         "../assets/img/cat-step1.svg",
//         "../assets/img/cat-step2.svg",
//         "../assets/img/cat-step3.svg",
//         "../assets/img/cat-step4.svg",
//         "../assets/img/cat-step5.svg",
//         "../assets/img/cat-step6.svg",
//         "../assets/img/cat-step7.svg",
//         "../assets/img/cat-step8.svg",
//         "../assets/img/cat-step9.svg",
//         "../assets/img/cat-step10.svg",
//         "../assets/img/cat-step11.svg"
//     ];

//     catImg.onerror = () => {
//         console.error("Ошибка загрузки изображения:", catImg.src);
//         catImg.style.display = "none";
//     };

//     function updateCatImage() {
//         let imageIndex = currentStep + 1;
//         if (imageIndex >= 0 && imageIndex < preloadImages.length) {
//             const newCatSrc = preloadImages[imageIndex];
//             if (catImg.src !== newCatSrc) {
//                 catImg.style.opacity = "0";
//                 catImg.onload = () => {
//                     catImg.style.opacity = "1";
//                 };
//                 catImg.src = newCatSrc;
//                 catImg.style.display = "block";
//             }
//         }
//     }

//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";
//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then((response) => response.json())
//         .then((data) => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }
//             quizData = data;
//             userAnswers = new Array(quizData.steps.length).fill(null);

//             startButton.addEventListener("click", () => {
//                 startQuiz();
//             });

//             nextButton.addEventListener("click", () => navigate(1));
//             prevButton?.addEventListener("click", () => navigate(-1));
//         })
//         .catch((error) => {
//             console.error("Ошибка при загрузке данных:", error);
//             alert("Не удалось загрузить данные для квиза.");
//         });

//     function startQuiz() {
//         if (!quizData) {
//             console.error("Ошибка: данные квиза не загружены.");
//             alert("Данные для квиза не загружены. Пожалуйста, попробуйте позже.");
//             return;
//         }

//         startPage.style.display = "none";
//         quizContainer.classList.remove("hidden");
//         quizHeaderWrapper.classList.remove("hidden");
//         quizContent.classList.remove("hidden");

//         currentStep = 0;
//         loadStep();
//     }

//     function loadStep() {
//         if (!quizData || !quizData.steps || !quizData.steps[currentStep]) {
//             console.error("Ошибка: шаг не найден", currentStep);
//             return;
//         }

//         const stepData = quizData.steps[currentStep];
//         const quizTitle = document.getElementById("quiz-title");
//         const optionsContainer = document.getElementById("quiz-options");

//         // ✅ Обновляем кота перед рендерингом контента
//         updateCatImage();
//         optionsContainer.innerHTML = "";

//         // ✅ Обновляем заголовок
//         quizTitle.textContent = stepData.question;

//         // ✅ Рендеринг контента квиза (радиокнопки, чекбоксы, слайдер и кастомные стили)
//         stepData.options.forEach((option) => {
//             const label = document.createElement("label");
//             label.className = "quiz-option";

//             const input = document.createElement("input");
//             input.type = stepData.multiSelect ? "checkbox" : "radio";
//             input.name = "answer";
//             input.value = option.text || option;

//             if (userAnswers[currentStep]?.includes(input.value)) {
//                 input.checked = true;
//                 label.classList.add("selected");
//             }

//             label.addEventListener("click", () => {
//                 if (!stepData.multiSelect) {
//                     document.querySelectorAll('input[name="answer"]').forEach((el) => (el.checked = false));
//                     userAnswers[currentStep] = input.value;
//                 } else {
//                     input.checked = !input.checked;
//                     if (input.checked) {
//                         userAnswers[currentStep].push(input.value);
//                     } else {
//                         userAnswers[currentStep] = userAnswers[currentStep].filter((ans) => ans !== input.value);
//                     }
//                 }
//                 updateButtonStyles();
//             });

//             label.prepend(input);
//             label.appendChild(document.createTextNode(input.value));
//             optionsContainer.appendChild(label);
//         });

//         updateButtonStyles();
//         document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${quizData.steps.length}`;
//     }

//     function updateButtonStyles() {
//         let hasSelection = document.querySelectorAll('input[name="answer"]:checked').length > 0;
//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-skip", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else if (hasSelection) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active", "btn-submit");
//             nextButton.classList.add("btn-skip", "btn-disabled");
//         }
//     }

//     function navigate(direction) {
//         if (!quizData) return;
//         if (direction === -1 && currentStep === 0) return;
//         if (direction === 1 && currentStep >= quizData.steps.length - 1) return;
//         currentStep += direction;
//         loadStep();
//     }

//     // Логика "Назад" на стрелку
//     const backArrow = document.querySelector(".image-arrow-left");
//     if (backArrow) {
//         backArrow.addEventListener("click", () => {
//             if (currentStep === 0) {
//                 startPage.style.display = "flex";
//                 quizContainer.classList.add("hidden");
//                 quizHeaderWrapper.classList.add("hidden");
//                 quizContent.classList.add("hidden");
//                 document.body.style.overflow = "auto";
//                 document.body.style.height = "auto";
//             } else {
//                 navigate(-1);
//             }
//         });
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = -1; 
//     let userAnswers = [];
//     let quizData = null;

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const quizImageContainer = document.getElementById("quiz-image-container");
//     const quizCompletionPage = document.getElementById("quiz-completion");

//     // Создание изображения для кота
//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений котов
//     const preloadImages = [
//         "../assets/img/cat-firstPage.svg",
//         "../assets/img/cat-step1.svg",
//         "../assets/img/cat-step2.svg",
//         "../assets/img/cat-step3.svg",
//         "../assets/img/cat-step4.svg",
//         "../assets/img/cat-step5.svg",
//         "../assets/img/cat-step6.svg",
//         "../assets/img/cat-step7.svg",
//         "../assets/img/cat-step8.svg",
//         "../assets/img/cat-step9.svg",
//         "../assets/img/cat-step10.svg",
//         "../assets/img/cat-step11.svg"
//     ];

//     function updateCatImage() {
//         let imageIndex = currentStep + 1;
//         if (imageIndex >= 0 && imageIndex < preloadImages.length) {
//             const newCatSrc = preloadImages[imageIndex];
//             if (catImg.src !== newCatSrc) {
//                 catImg.style.opacity = "0";
//                 catImg.onload = () => {
//                     catImg.style.opacity = "1";
//                 };
//                 catImg.src = newCatSrc;
//                 catImg.style.display = "block";
//             }
//         }
//     }

//     // Загрузка данных
//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";
//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then((response) => response.json())
//         .then((data) => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }
//             quizData = data;
//             userAnswers = new Array(quizData.steps.length).fill(null);

//             startButton.addEventListener("click", startQuiz);
//             nextButton.addEventListener("click", () => navigate(1));
//             prevButton?.addEventListener("click", () => navigate(-1));
//         })
//         .catch((error) => {
//             console.error("Ошибка при загрузке данных:", error);
//             alert("Не удалось загрузить данные для квиза.");
//         });

//     function startQuiz() {
//         if (!quizData) {
//             alert("Данные для квиза не загружены.");
//             return;
//         }

//         startPage.style.display = "none";
//         quizContainer.classList.remove("hidden");
//         quizHeaderWrapper.classList.remove("hidden");
//         quizContent.classList.remove("hidden");

//         currentStep = 0;
//         loadStep();
//     }

//     function loadStep() {
//         if (!quizData || !quizData.steps || !quizData.steps[currentStep]) return;

//         const stepData = quizData.steps[currentStep];
//         const quizTitle = document.getElementById("quiz-title");
//         const optionsContainer = document.getElementById("quiz-options");

//         updateCatImage();
//         optionsContainer.innerHTML = "";

//         optionsContainer.classList.remove("step-2", "step-6", "step-7", "step-8");
//         if (currentStep === 1) optionsContainer.classList.add("step-2");
//         if (currentStep === 5) optionsContainer.classList.add("step-6");
//         if (currentStep === 6) optionsContainer.classList.add("step-7");
//         if (currentStep === 7) optionsContainer.classList.add("step-8");

//         quizTitle.textContent = stepData.question;

//         if (currentStep === 7) {
//             // ✅ Слайдер
//             const sliderWrapper = document.createElement("div");
//             sliderWrapper.classList.add("slider-wrapper");

//             const sliderLabel = document.createElement("label");
//             sliderLabel.textContent = "Ваш бюджет за одне заняття: ";
//             sliderWrapper.appendChild(sliderLabel);

//             const sliderInput = document.createElement("input");
//             sliderInput.type = "range";
//             sliderInput.min = "200";
//             sliderInput.max = "2000";
//             sliderInput.step = "100";
//             sliderInput.value = userAnswers[currentStep] || "200";

//             const valueDisplay = document.createElement("span");
//             valueDisplay.classList.add("value-display");
//             valueDisplay.textContent = `${sliderInput.value} грн`;

//             sliderWrapper.appendChild(sliderInput);
//             sliderWrapper.appendChild(valueDisplay);

//             sliderInput.addEventListener("input", () => {
//                 valueDisplay.textContent = `${sliderInput.value} грн`;
//                 userAnswers[currentStep] = parseInt(sliderInput.value, 10);
//                 updateButtonStyles();
//             });

//             optionsContainer.appendChild(sliderWrapper);
//         } else {
//             // ✅ Радиокнопки и чекбоксы
//             stepData.options.forEach((option) => {
//                 const label = document.createElement("label");
//                 label.className = "quiz-option";

//                 const input = document.createElement("input");
//                 input.type = stepData.multiSelect ? "checkbox" : "radio";
//                 input.name = "answer";
//                 input.value = option.text || option;

//                 if (userAnswers[currentStep]?.includes(input.value)) {
//                     input.checked = true;
//                     label.classList.add("selected");
//                 }

//                 label.addEventListener("click", () => {
//                     if (!stepData.multiSelect) {
//                         document.querySelectorAll('input[name="answer"]').forEach((el) => (el.checked = false));
//                         userAnswers[currentStep] = input.value;
//                     } else {
//                         input.checked = !input.checked;
//                         if (input.checked) {
//                             userAnswers[currentStep].push(input.value);
//                         } else {
//                             userAnswers[currentStep] = userAnswers[currentStep].filter((ans) => ans !== input.value);
//                         }
//                     }
//                     updateButtonStyles();
//                 });

//                 label.prepend(input);
//                 label.appendChild(document.createTextNode(input.value));
//                 optionsContainer.appendChild(label);
//             });
//         }

//         updateButtonStyles();
//         document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${quizData.steps.length}`;
//     }

//     function updateButtonStyles() {
//         let hasSelection = document.querySelectorAll('input[name="answer"]:checked').length > 0;
//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-skip", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else if (hasSelection) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active", "btn-submit");
//             nextButton.classList.add("btn-skip", "btn-disabled");
//         }
//     }

//     function navigate(direction) {
//         if (!quizData) return;
//         if (direction === -1 && currentStep === 0) return;
//         if (direction === 1 && currentStep >= quizData.steps.length - 1) return;
//         currentStep += direction;
//         loadStep();
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = -1;
//     let userAnswers = [];
//     let quizData = null;

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const quizImageContainer = document.getElementById("quiz-image-container");
//     const quizCompletionPage = document.getElementById("quiz-completion");

//     // Создание изображения для кота
//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений котов
//     const preloadImages = [
//         "../assets/img/cat-firstPage.svg",
//         "../assets/img/cat-step1.svg",
//         "../assets/img/cat-step2.svg",
//         "../assets/img/cat-step3.svg",
//         "../assets/img/cat-step4.svg",
//         "../assets/img/cat-step5.svg",
//         "../assets/img/cat-step6.svg",
//         "../assets/img/cat-step7.svg",
//         "../assets/img/cat-step8.svg",
//         "../assets/img/cat-step9.svg",
//         "../assets/img/cat-step10.svg",
//         "../assets/img/cat-step11.svg"
//     ];

//     function updateCatImage() {
//         let imageIndex = currentStep + 1;
//         if (imageIndex >= 0 && imageIndex < preloadImages.length) {
//             const newCatSrc = preloadImages[imageIndex];
//             if (catImg.src !== newCatSrc) {
//                 catImg.style.opacity = "0";
//                 catImg.onload = () => {
//                     catImg.style.opacity = "1";
//                 };
//                 catImg.src = newCatSrc;
//                 catImg.style.display = "block";
//             }
//         }
//     }

//     // Загрузка данных
//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";
//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then((response) => response.json())
//         .then((data) => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }
//             quizData = data;
//             userAnswers = new Array(quizData.steps.length).fill(null);

//             startButton.addEventListener("click", startQuiz);
//             nextButton.addEventListener("click", () => navigate(1));
//             prevButton.addEventListener("click", () => navigate(-1));
//         })
//         .catch((error) => {
//             console.error("Ошибка при загрузке данных:", error);
//             alert("Не удалось загрузить данные для квиза.");
//         });

//     function startQuiz() {
//         if (!quizData) {
//             alert("Данные для квиза не загружены.");
//             return;
//         }

//         startPage.style.display = "none";
//         quizContainer.classList.remove("hidden");
//         quizHeaderWrapper.classList.remove("hidden");
//         quizContent.classList.remove("hidden");

//         currentStep = 0;
//         loadStep();
//     }

//     function loadStep() {
//         if (!quizData || !quizData.steps || !quizData.steps[currentStep]) return;

//         const stepData = quizData.steps[currentStep];
//         const quizTitle = document.getElementById("quiz-title");
//         const optionsContainer = document.getElementById("quiz-options");

//         updateCatImage();
//         optionsContainer.innerHTML = "";

//         optionsContainer.classList.remove("step-2", "step-5", "step-6", "step-7", "step-8");
//         if (currentStep === 1) optionsContainer.classList.add("step-2");
//         if (currentStep === 4) optionsContainer.classList.add("step-5");
//         if (currentStep === 5) optionsContainer.classList.add("step-6");
//         if (currentStep === 6) optionsContainer.classList.add("step-7");
//         if (currentStep === 7) optionsContainer.classList.add("step-8");

//         quizTitle.textContent = stepData.question;

//         if (currentStep === 7) {
//             // ✅ Слайдер (бюджет)
//             const sliderWrapper = document.createElement("div");
//             sliderWrapper.classList.add("slider-wrapper");

//             const sliderLabel = document.createElement("label");
//             sliderLabel.textContent = "Ваш бюджет за одне заняття: ";
//             sliderWrapper.appendChild(sliderLabel);

//             const sliderInput = document.createElement("input");
//             sliderInput.type = "range";
//             sliderInput.min = "200";
//             sliderInput.max = "2000";
//             sliderInput.step = "100";
//             sliderInput.value = userAnswers[currentStep] || "200";

//             const valueDisplay = document.createElement("span");
//             valueDisplay.classList.add("value-display");
//             valueDisplay.textContent = `${sliderInput.value} грн`;

//             sliderWrapper.appendChild(sliderInput);
//             sliderWrapper.appendChild(valueDisplay);

//             sliderInput.addEventListener("input", () => {
//                 valueDisplay.textContent = `${sliderInput.value} грн`;
//                 userAnswers[currentStep] = parseInt(sliderInput.value, 10);
//                 updateButtonStyles();
//             });

//             optionsContainer.appendChild(sliderWrapper);
//         } else {
//             stepData.options.forEach((option) => {
//                 const label = document.createElement("label");
//                 label.className = "quiz-option";

//                 if (currentStep === 1 && option.width === "half") {
//                     label.classList.add("half-width");
//                 }

//                 const input = document.createElement("input");
//                 input.type = stepData.multiSelect ? "checkbox" : "radio";
//                 input.name = "answer";
//                 input.value = option.text || option;

//                 if (userAnswers[currentStep]?.includes(input.value)) {
//                     input.checked = true;
//                     label.classList.add("selected");
//                 }

//                 input.addEventListener("change", () => {
//                     if (!stepData.multiSelect) {
//                         document.querySelectorAll('input[name="answer"]').forEach((el) => (el.checked = false));
//                         input.checked = true;
//                         userAnswers[currentStep] = input.value;
//                     } else {
//                         if (input.checked) {
//                             userAnswers[currentStep].push(input.value);
//                         } else {
//                             userAnswers[currentStep] = userAnswers[currentStep].filter((ans) => ans !== input.value);
//                         }
//                     }
//                     updateButtonStyles();
//                 });

//                 label.prepend(input);
//                 label.appendChild(document.createTextNode(input.value));
//                 optionsContainer.appendChild(label);
//             });
//         }

//         updateButtonStyles();
//         document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${quizData.steps.length}`;
//     }

//     function updateButtonStyles() {
//         let hasSelection = document.querySelectorAll('input[name="answer"]:checked').length > 0;
//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-skip", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else if (hasSelection) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active", "btn-submit");
//             nextButton.classList.add("btn-skip", "btn-disabled");
//         }
//     }

//     function navigate(direction) {
//         if (!quizData) return;
//         if (direction === -1 && currentStep === 0) return;
//         if (direction === 1 && currentStep >= quizData.steps.length - 1) return;

//         if (direction === -1) {
//             saveAnswer();
//         }

//         currentStep += direction;
//         loadStep();
//     }
// });