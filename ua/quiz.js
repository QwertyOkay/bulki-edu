// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = 0;
//     let userAnswers = [];

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const quizImageContainer = document.getElementById("quiz-image-container");

//     // Создание и настройка изображения для квиза
//     const catImg = new Image();
//     catImg.classList.add('quiz-cat');
//     catImg.alt = 'Quiz Cat';
//     catImg.style.display = 'none'; // Сначала скрываем
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений
//     const preloadImages = [
//         '../assets/img/cat-firstPage.svg', // Изображение для стартовой страницы
//         '../assets/img/cat-step1.svg',     // Шаг 1
//         '../assets/img/cat-ua-step2.png',  // Шаг 2
//         '../assets/img/cat-ua-step3.png',  // Шаг 3
//         '../assets/img/cat-ua-step4.png'   // Шаг 4
//     ].forEach(src => new Image().src = src);

//     // Обработчик ошибок загрузки изображений
//     catImg.onerror = () => {
//         console.error('Error loading image:', catImg.src);
//         catImg.style.display = 'none';
//     };

//     // Старт квиза
//     startButton.addEventListener('click', () => {
//         startPage.style.display = 'none';
//         quizContainer.classList.remove('hidden');
//         currentStep = 0;
//         catImg.src = '../assets/img/cat-step1.svg'; // Изображение для первого шага
//         catImg.style.display = 'block';
//     });

//     // Загрузка данных квиза
//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then(response => response.json())
//         .then(data => {
//             if (!data?.steps) throw new Error('Invalid quiz data');

//             // Инициализация квиза
//             loadStep(data);

//             // Навигация
//             nextButton.addEventListener('click', () => navigate(1, data));
//             prevButton.addEventListener('click', () => navigate(-1, data));
//         })
//         .catch(console.error);

//     function loadStep(data) {
//         // Обновление контента
//         document.getElementById("quiz-title").textContent = data.steps[currentStep].question;
//         document.querySelector(".quiz-progress").textContent = `${currentStep + 1}/${data.steps.length}`;

//         // Очистка и создание опций
//         const optionsContainer = document.getElementById("quiz-options");
//         optionsContainer.innerHTML = '';

//         data.steps[currentStep].options.forEach(option => {
//             const label = document.createElement('label');
//             label.className = 'quiz-option';

//             const input = document.createElement('input');
//             input.type = 'radio';
//             input.name = 'answer';
//             input.value = option;

//             if (userAnswers[currentStep] === option) input.checked = true;

//             const span = document.createElement('span');
//             span.textContent = option;

//             label.append(input, span);
//             optionsContainer.appendChild(label);

//             // Обработчик клика для опции
//             input.addEventListener('change', () => {
//                 // Удаляем классы у всех опций
//                 document.querySelectorAll('.quiz-option').forEach(opt => {
//                     opt.classList.remove('selected');
//                 });
//                 // Добавляем класс для выбранной опции
//                 if (input.checked) {
//                     label.classList.add('selected');
//                 }
//                 // Обновляем стили кнопки
//                 updateButtonStyles();
//             });
//         });

//         // Обновление изображения
//         const stepImages = [
//             '../assets/img/cat-step1.svg',   // Шаг 1
//             '../assets/img/cat-ua-step2.png', // Шаг 2
//             '../assets/img/cat-ua-step3.png', // Шаг 3
//             '../assets/img/cat-ua-step4.png'  // Шаг 4
//         ];

//         if (currentStep < stepImages.length) {
//             catImg.src = stepImages[currentStep];
//             catImg.style.display = 'block';
//         }

//         // Обновление кнопок
//         updateButtonStyles();
//         nextButton.textContent = currentStep === data.steps.length - 1
//             ? 'Завершити'
//             : 'Далі';
//         prevButton.style.display = currentStep > 0 ? 'block' : 'none';
//     }

//     function navigate(direction, data) {
//         if (direction === 1 && !document.querySelector('input[name="answer"]:checked')) {
//             return; // Не переходим дальше, если ответ не выбран
//         }

//         saveAnswer();
//         currentStep += direction;

//         if (currentStep >= data.steps.length) {
//             submitResults();
//         } else {
//             loadStep(data);
//         }
//     }

//     function updateButtonStyles() {
//         const selectedOption = document.querySelector('input[name="answer"]:checked');
//         if (selectedOption) {
//             nextButton.classList.remove('btn-disabled');
//             nextButton.classList.add('btn-active');
//         } else {
//             nextButton.classList.remove('btn-active');
//             nextButton.classList.add('btn-disabled');
//         }
//     }

//     function saveAnswer() {
//         const selected = document.querySelector('input[name="answer"]:checked');
//         if (selected) userAnswers[currentStep] = selected.value;
//     }

//     function submitResults() {
//         console.log('User answers:', userAnswers);
//         // Ваша логика отправки данных
//         alert('Дякуємо за участь! Результати відправлено.');
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    let userAnswers = [];

    // Элементы
    const startPage = document.getElementById("start-page");
    const quizContainer = document.getElementById("quiz-container");
    const startButton = document.getElementById("start-btn");
    const nextButton = document.getElementById("next-btn");
    const prevButton = document.getElementById("prev-btn");
    const quizImageContainer = document.getElementById("quiz-image-container");
    const quizOptionsContainer = document.getElementById("quiz-options");
    const quizTitle = document.getElementById("quiz-title");
    const quizProgress = document.querySelector(".quiz-progress");

    // Создание и подмена изображения кота
    const catImg = new Image();
    catImg.classList.add("quiz-cat");
    quizImageContainer.appendChild(catImg);

    const stepImages = [
        "../assets/img/cat-step1.svg",
        "../assets/img/cat-ua-step2.png",
        "../assets/img/cat-ua-step3.png",
        "../assets/img/cat-ua-step4.png"
    ];

    // Функция загрузки данных квиза
    function loadQuiz() {
        const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

        fetch(`../${langFolder}/locales/quiz.json`)
            .then(response => response.json())
            .then(data => {
                if (!data?.steps) throw new Error("Invalid quiz data");
                renderStep(data);
                nextButton.addEventListener("click", () => navigate(1, data));
                prevButton.addEventListener("click", () => navigate(-1, data));
            })
            .catch(console.error);
    }

    // Функция рендеринга текущего шага
    function renderStep(data) {
        quizTitle.textContent = data.steps[currentStep].question;
        quizProgress.textContent = `${currentStep + 1}/${data.steps.length}`;
        quizOptionsContainer.innerHTML = "";

        data.steps[currentStep].options.forEach(option => {
            const label = document.createElement("label");
            label.className = "quiz-option";

            const input = document.createElement("input");
            input.type = "radio";
            input.name = "answer";
            input.value = option;

            if (userAnswers[currentStep] === option) {
                input.checked = true;
                label.classList.add("selected"); // Добавляем класс активного выбора
            }

            const span = document.createElement("span");
            span.textContent = option;

            const customRadio = document.createElement("div");
            customRadio.className = "custom-radio";

            label.append(input, span, customRadio);
            quizOptionsContainer.appendChild(label);

            // Обработчик выбора опции
            input.addEventListener("change", () => {
                document.querySelectorAll(".quiz-option").forEach(opt => {
                    opt.classList.remove("selected");
                });
                label.classList.add("selected");
                updateButtonState();
            });
        });

        // Устанавливаем картинку для текущего шага
        catImg.src = stepImages[currentStep] || stepImages[0];
        updateButtonState();
    }

    // Функция перехода между шагами
    function navigate(direction, data) {
        if (direction === 1 && !document.querySelector('input[name="answer"]:checked')) return;

        saveAnswer();
        currentStep += direction;

        if (currentStep >= data.steps.length) {
            submitResults();
        } else {
            renderStep(data);
        }
    }

    // **Обновление состояния кнопки "Продовжити"**
    function updateButtonState() {
        if (document.querySelector('input[name="answer"]:checked')) {
            nextButton.classList.remove("btn-disabled");
            nextButton.classList.add("btn-active");
        } else {
            nextButton.classList.remove("btn-active");
            nextButton.classList.add("btn-disabled");
        }
    }

    // Функция сохранения ответа
    function saveAnswer() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (selected) userAnswers[currentStep] = selected.value;
    }

    // Функция отправки результатов
    function submitResults() {
        console.log("User answers:", userAnswers);
        alert("Дякуємо за участь! Результати відправлено.");
    }

    // Запуск квиза
    startButton.addEventListener("click", () => {
        startPage.style.display = "none";
        quizContainer.classList.remove("hidden");
        currentStep = 0;
        loadQuiz();
    });

    // Запуск загрузки квиза
    loadQuiz();
});