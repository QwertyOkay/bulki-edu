// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = 0;
//     let userAnswers = [];

//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const imageContainer = document.querySelector(".image-container");

//     // ✅ Создаем объект кота один раз
//     let catImg = document.createElement("img");
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.src = "../assets/img/cat-firstPage.svg"; // Начальное изображение

//     if (imageContainer) {
//         imageContainer.appendChild(catImg); // Добавляем кота в DOM
//     }

//     if (startButton) {
//         startButton.addEventListener("click", function () {
//             if (startPage && quizContainer) {
//                 startPage.style.display = "none";
//                 quizContainer.style.display = "block";
//             }
//         });
//     }

//     if (!nextButton || !prevButton) {
//         console.error("Quiz buttons not found.");
//         return;
//     }

//     // Определяем язык
//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then(response => response.json())
//         .then(data => {
//             if (!data || !data.steps) {
//                 console.error("Quiz JSON is missing or invalid");
//                 return;
//             }
//             loadStep(data);

//             nextButton.addEventListener("click", () => {
//                 saveAnswer();
//                 if (currentStep < data.steps.length - 1) {
//                     currentStep++;
//                     loadStep(data);
//                 } else {
//                     submitResults(userAnswers);
//                 }
//             });

//             prevButton.addEventListener("click", () => {
//                 if (currentStep > 0) {
//                     currentStep--;
//                     loadStep(data);
//                 }
//             });
//         })
//         .catch(error => console.error("Error loading quiz JSON:", error));

//     function loadStep(data) {
//         const quizTitle = document.getElementById("quiz-title");
//         const quizProgress = document.querySelector(".quiz-progress");
//         const quizOptions = document.getElementById("quiz-options");

//         if (!quizTitle || !quizProgress || !quizOptions) {
//             console.error("Quiz elements are missing!");
//             return;
//         }

//         quizTitle.textContent = data.steps[currentStep].question;
//         quizProgress.textContent = `${currentStep + 1} / ${data.steps.length}`;

//         quizOptions.innerHTML = "";

//         // ✅ НЕ очищаем imageContainer, просто обновляем src!
//         const stepImages = [
//             "../assets/img/cat-firstPage.svg",
//             "../assets/img/cat-step1.svg",
//             "../assets/img/cat-ua-step3.png",
//             "../assets/img/cat-ua-step4.png"
//         ];

//         if (currentStep < stepImages.length) {
//             catImg.src = stepImages[currentStep];
//         }

//         if (data.steps[currentStep].options) {
//             data.steps[currentStep].options.forEach(option => {
//                 const label = document.createElement("label");
//                 label.classList.add("quiz-option");

//                 const input = document.createElement("input");
//                 input.type = "radio";
//                 input.name = "answer";
//                 input.value = option;

//                 if (userAnswers[currentStep] === option) {
//                     input.checked = true;
//                 }

//                 const span = document.createElement("span");
//                 span.textContent = option;

//                 label.appendChild(input);
//                 label.appendChild(span);
//                 quizOptions.appendChild(label);
//             });
//         }

//         updateButtonStyles();

//         document.querySelectorAll("input[name='answer']").forEach(input => {
//             input.addEventListener("change", updateButtonStyles);
//         });

//         nextButton.textContent = (currentStep === data.steps.length - 1) ? data.buttons.submit : data.buttons.next;
//         prevButton.style.display = currentStep > 0 ? "inline-block" : "none";
//     }

//     function updateButtonStyles() {
//         const selectedOption = document.querySelector("input[name='answer']:checked");

//         if (selectedOption) {
//             nextButton.classList.remove("btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.classList.remove("btn-active");
//             nextButton.classList.add("btn-disabled");
//         }
//     }

//     function saveAnswer() {
//         const selectedOption = document.querySelector("input[name='answer']:checked");
//         const inputFields = document.querySelectorAll("input[type='text']");

//         if (selectedOption) {
//             userAnswers[currentStep] = selectedOption.value;
//         } else if (inputFields.length > 0) {
//             userAnswers[currentStep] = Array.from(inputFields).map(input => input.value);
//         }
//     }

//     function submitResults(answers) {
//         fetch("https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec", {
//             method: "POST",
//             mode: "no-cors",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ answers: answers })
//         })
//         .then(() => alert("Дані відправлено!"))
//         .catch(error => console.error("Помилка при відправленні:", error));
//     }
// });

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

//     // Создание и настройка изображения
//     const catImg = new Image();
//     catImg.classList.add('quiz-cat');
//     catImg.alt = 'Quiz Cat';
//     catImg.style.display = 'block'; // Всегда показываем изображение
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений
//     const preloadImages = [
//         '../assets/img/cat-firstPage.svg', // Изображение для стартовой страницы
//         '../assets/img/cat-ua-step1.png',  // Шаг 1
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
//         });

//         // Обновление изображения
//         const stepImages = [
//             '../assets/img/cat-firstPage.svg', // Шаг 1
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
//         if (direction === 1 && !document.querySelector('input[name="answer"]:checked')) return;

//         saveAnswer();
//         currentStep += direction;

//         if (currentStep >= data.steps.length) {
//             submitResults();
//         } else {
//             loadStep(data);
//         }
//     }

//     function updateButtonStyles() {
//         const isChecked = !!document.querySelector('input[name="answer"]:checked');
//         nextButton.classList.toggle('btn-active', isChecked);
//         nextButton.classList.toggle('btn-disabled', !isChecked);
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
//         if (direction === 1 && !document.querySelector('input[name="answer"]:checked')) return;

//         saveAnswer();
//         currentStep += direction;

//         if (currentStep >= data.steps.length) {
//             submitResults();
//         } else {
//             loadStep(data);
//         }
//     }

//     function updateButtonStyles() {
//         const isChecked = !!document.querySelector('input[name="answer"]:checked');
//         nextButton.classList.toggle('btn-active', isChecked);
//         nextButton.classList.toggle('btn-disabled', !isChecked);
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

    // Создание и настройка изображения для квиза
    const catImg = new Image();
    catImg.classList.add('quiz-cat');
    catImg.alt = 'Quiz Cat';
    catImg.style.display = 'none'; // Сначала скрываем
    quizImageContainer.appendChild(catImg);

    // Прелоад изображений
    const preloadImages = [
        '../assets/img/cat-firstPage.svg', // Изображение для стартовой страницы
        '../assets/img/cat-step1.svg',     // Шаг 1
        '../assets/img/cat-ua-step2.png',  // Шаг 2
        '../assets/img/cat-ua-step3.png',  // Шаг 3
        '../assets/img/cat-ua-step4.png'   // Шаг 4
    ].forEach(src => new Image().src = src);

    // Обработчик ошибок загрузки изображений
    catImg.onerror = () => {
        console.error('Error loading image:', catImg.src);
        catImg.style.display = 'none';
    };

    // Старт квиза
    startButton.addEventListener('click', () => {
        startPage.style.display = 'none';
        quizContainer.classList.remove('hidden');
        currentStep = 0;
        catImg.src = '../assets/img/cat-step1.svg'; // Изображение для первого шага
        catImg.style.display = 'block';
    });

    // Загрузка данных квиза
    const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

    fetch(`../${langFolder}/locales/quiz.json`)
        .then(response => response.json())
        .then(data => {
            if (!data?.steps) throw new Error('Invalid quiz data');

            // Инициализация квиза
            loadStep(data);

            // Навигация
            nextButton.addEventListener('click', () => navigate(1, data));
            prevButton.addEventListener('click', () => navigate(-1, data));
        })
        .catch(console.error);

    function loadStep(data) {
        // Обновление контента
        document.getElementById("quiz-title").textContent = data.steps[currentStep].question;
        document.querySelector(".quiz-progress").textContent = `${currentStep + 1}/${data.steps.length}`;

        // Очистка и создание опций
        const optionsContainer = document.getElementById("quiz-options");
        optionsContainer.innerHTML = '';

        data.steps[currentStep].options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'quiz-option';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = option;

            if (userAnswers[currentStep] === option) input.checked = true;

            const span = document.createElement('span');
            span.textContent = option;

            label.append(input, span);
            optionsContainer.appendChild(label);

            // Обработчик клика для опции
            input.addEventListener('change', () => {
                // Удаляем классы у всех опций
                document.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                // Добавляем класс для выбранной опции
                if (input.checked) {
                    label.classList.add('selected');
                }
                // Обновляем стили кнопки
                updateButtonStyles();
            });
        });

        // Обновление изображения
        const stepImages = [
            '../assets/img/cat-step1.svg',   // Шаг 1
            '../assets/img/cat-ua-step2.png', // Шаг 2
            '../assets/img/cat-ua-step3.png', // Шаг 3
            '../assets/img/cat-ua-step4.png'  // Шаг 4
        ];

        if (currentStep < stepImages.length) {
            catImg.src = stepImages[currentStep];
            catImg.style.display = 'block';
        }

        // Обновление кнопок
        updateButtonStyles();
        nextButton.textContent = currentStep === data.steps.length - 1
            ? 'Завершити'
            : 'Далі';
        prevButton.style.display = currentStep > 0 ? 'block' : 'none';
    }

    function navigate(direction, data) {
        if (direction === 1 && !document.querySelector('input[name="answer"]:checked')) {
            return; // Не переходим дальше, если ответ не выбран
        }

        saveAnswer();
        currentStep += direction;

        if (currentStep >= data.steps.length) {
            submitResults();
        } else {
            loadStep(data);
        }
    }

    function updateButtonStyles() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
            nextButton.classList.remove('btn-disabled');
            nextButton.classList.add('btn-active');
        } else {
            nextButton.classList.remove('btn-active');
            nextButton.classList.add('btn-disabled');
        }
    }

    function saveAnswer() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (selected) userAnswers[currentStep] = selected.value;
    }

    function submitResults() {
        console.log('User answers:', userAnswers);
        // Ваша логика отправки данных
        alert('Дякуємо за участь! Результати відправлено.');
    }
});