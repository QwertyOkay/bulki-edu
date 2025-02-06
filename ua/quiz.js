// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = 0;
//     let userAnswers = [];

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
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
//         '../assets/img/cat-step2.svg',     // Шаг 2
//         '../assets/img/cat-step3.svg',     // Шаг 3
//         '../assets/img/cat-step4.svg',
//         '../assets/img/cat-step5.svg',
//         '../assets/img/cat-step6.svg',
//         '../assets/img/cat-step7.svg',
//         '../assets/img/cat-step8.svg',
//         '../assets/img/cat-step9.svg',
//         '../assets/img/cat-step10.svg',
//         '../assets/img/cat-step11.svg'
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
//         quizHeaderWrapper.classList.remove('hidden');
//         quizContent.classList.remove('hidden');
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
//             '../assets/img/cat-step2.svg', // Шаг 2
//             '../assets/img/cat-step3.svg', // Шаг 3
//             '../assets/img/cat-step4.svg',
//             '../assets/img/cat-step5.svg',
//             '../assets/img/cat-step6.svg',
//             '../assets/img/cat-step7.svg',
//             '../assets/img/cat-step8.svg',
//             '../assets/img/cat-step9.svg',
//             '../assets/img/cat-step10.svg',
//             '../assets/img/cat-step11.svg'
//         ];

//         if (currentStep < stepImages.length) {
//             catImg.src = stepImages[currentStep];
//             catImg.style.display = 'block';
//         }

//         // Обновление кнопок
//         updateButtonStyles();
//         nextButton.textContent = currentStep === data.steps.length - 1
//             ? 'Завершити'
//             : ' Продовжити';
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

// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = 0;
//     let userAnswers = [];

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const quizImageContainer = document.getElementById("quiz-image-container");

//     // Создание и настройка изображения для квиза
//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений (11 котов)
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

//     // Обработчик ошибок загрузки изображений
//     catImg.onerror = () => {
//         console.error("Ошибка загрузки изображения:", catImg.src);
//         catImg.style.display = "none";
//     };

//     // Старт квиза
//     startButton.addEventListener("click", () => {
//         startPage.style.display = "none";
//         quizContainer.classList.remove("hidden");
//         quizHeaderWrapper.classList.remove("hidden");
//         quizContent.classList.remove("hidden");
//         currentStep = 0;
//         catImg.src = "../assets/img/cat-step1.svg";
//         catImg.style.display = "block";
//         updateButtonStyles();
//     });

//     // Загрузка данных квиза
//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then((response) => response.json())
//         .then((data) => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }

//             // Инициализация квиза
//             loadStep(data);

//             // Навигация
//             nextButton.addEventListener("click", () => navigate(1, data));
//             prevButton.addEventListener("click", () => navigate(-1, data));
//         })
//         .catch(console.error);

//     function loadStep(data) {
//         if (!data.steps[currentStep]) {
//             console.error("Ошибка: шаг не найден", currentStep);
//             return;
//         }

//         // Обновление контента
//         document.getElementById("quiz-title").textContent = data.steps[currentStep].question;
//         document.querySelector(".quiz-progress").textContent = `${currentStep + 1}/${data.steps.length}`;

//         // Очистка и создание опций
//         const optionsContainer = document.getElementById("quiz-options");
//         optionsContainer.innerHTML = "";

//         data.steps[currentStep].options.forEach((option) => {
//             const label = document.createElement("label");
//             label.className = "quiz-option";

//             const input = document.createElement("input");
//             input.type = "radio";
//             input.name = "answer";
//             input.value = option;

//             if (userAnswers[currentStep] === option) input.checked = true;

//             const span = document.createElement("span");
//             span.textContent = option;

//             label.append(input, span);
//             optionsContainer.appendChild(label);

//             // Обработчик клика для опции
//             input.addEventListener("change", () => {
//                 document.querySelectorAll(".quiz-option").forEach((opt) => {
//                     opt.classList.remove("selected");
//                 });
//                 if (input.checked) {
//                     label.classList.add("selected");
//                 }
//                 updateButtonStyles();
//             });
//         });

//         // Обновление изображения
//         if (currentStep < preloadImages.length) {
//             catImg.src = preloadImages[currentStep];
//             catImg.style.display = "block";
//         }

//         // Обновление кнопок
//         updateButtonStyles();
//         prevButton.style.display = currentStep > 0 ? "block" : "none";
//     }

//     function navigate(direction, data) {
//         if (direction === 1 && !document.querySelector('input[name="answer"]:checked') && currentStep < 9) {
//             return;
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

//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-active", "btn-skip");
//             nextButton.classList.add("btn-submit");
//         } else if (selectedOption) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active", "btn-submit");
//             nextButton.classList.add("btn-skip");
//         }
//     }

//     function saveAnswer() {
//         const selected = document.querySelector('input[name="answer"]:checked');
//         userAnswers[currentStep] = selected ? selected.value : null;
//     }

//     function submitResults() {
//         console.log("User answers:", userAnswers);
//         alert("Дякуємо за участь! Результати відправлено.");
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = 0;
//     let userAnswers = [];

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const quizImageContainer = document.getElementById("quiz-image-container");

//     // Создание и настройка изображения для квиза
//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений (11 котов)
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

//     // Обработчик ошибок загрузки изображений
//     catImg.onerror = () => {
//         console.error("Ошибка загрузки изображения:", catImg.src);
//         catImg.style.display = "none";
//     };

//     // Старт квиза
//     startButton.addEventListener("click", () => {
//         startPage.style.display = "none";
//         quizContainer.classList.remove("hidden");
//         quizHeaderWrapper.classList.remove("hidden");
//         quizContent.classList.remove("hidden");
//         currentStep = 0;
//         catImg.src = "../assets/img/cat-step1.svg";
//         catImg.style.display = "block";
//         updateButtonStyles(); // Фикс кнопки при старте
//     });

//     // Загрузка данных квиза
//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then((response) => response.json())
//         .then((data) => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }

//             // Инициализация квиза
//             loadStep(data);

//             // Навигация
//             nextButton.addEventListener("click", () => navigate(1, data));
//             prevButton.addEventListener("click", () => navigate(-1, data));
//         })
//         .catch(console.error);

//     function loadStep(data) {
//         if (!data.steps[currentStep]) {
//             console.error("Ошибка: шаг не найден", currentStep);
//             return;
//         }

//         // Обновление контента
//         document.getElementById("quiz-title").textContent = data.steps[currentStep].question;
//         document.querySelector(".quiz-progress").textContent = `${currentStep + 1}/${data.steps.length}`;

//         // Очистка и создание опций
//         const optionsContainer = document.getElementById("quiz-options");
//         optionsContainer.innerHTML = "";

//         if (data.steps[currentStep].options) {
//             data.steps[currentStep].options.forEach((option) => {
//                 const label = document.createElement("label");
//                 label.className = "quiz-option";

//                 const input = document.createElement("input");
//                 input.type = "radio";
//                 input.name = "answer";
//                 input.value = option;

//                 if (userAnswers[currentStep] === option) input.checked = true;

//                 const span = document.createElement("span");
//                 span.textContent = option;

//                 label.append(input, span);
//                 optionsContainer.appendChild(label);

//                 // Обработчик клика для опции
//                 input.addEventListener("change", () => {
//                     document.querySelectorAll(".quiz-option").forEach((opt) => {
//                         opt.classList.remove("selected");
//                     });
//                     if (input.checked) {
//                         label.classList.add("selected");
//                     }
//                     updateButtonStyles();
//                 });
//             });
//         }

//         // Обновление изображения
//         if (currentStep < preloadImages.length) {
//             catImg.src = preloadImages[currentStep];
//             catImg.style.display = "block";
//         }

//         // Обновление кнопок
//         updateButtonStyles();
//         prevButton.style.display = currentStep > 0 ? "block" : "none";
//     }

//     function navigate(direction, data) {
//         if (direction === 1 && !document.querySelector('input[name="answer"]:checked') && currentStep < 9) {
//             return;
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

//         // Обновление текста и стилей кнопки в зависимости от шага
//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-active", "btn-skip");
//             nextButton.classList.add("btn-submit");
//         } else if (selectedOption) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip", "btn-submit");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active", "btn-submit");
//             nextButton.classList.add("btn-skip");
//         }
//     }

//     function saveAnswer() {
//         const selected = document.querySelector('input[name="answer"]:checked');
//         userAnswers[currentStep] = selected ? selected.value : null;
//     }

//     function submitResults() {
//         console.log("User answers:", userAnswers);
//         alert("Дякуємо за участь! Результати відправлено.");
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = 0;
//     let userAnswers = [];

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const quizImageContainer = document.getElementById("quiz-image-container");
//     const quizCompletionPage = document.getElementById("quiz-completion"); // Добавлено для 11-го шага

//     // Создание и настройка изображения для квиза
//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений (11 котов)
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

//     // Обработчик ошибок загрузки изображений
//     catImg.onerror = () => {
//         console.error("Ошибка загрузки изображения:", catImg.src);
//         catImg.style.display = "none";
//     };

//     // Старт квиза
//     startButton.addEventListener("click", () => {
//         startPage.style.display = "none";
//         quizContainer.classList.remove("hidden");
//         quizHeaderWrapper.classList.remove("hidden");
//         quizContent.classList.remove("hidden");
//         currentStep = 0;
//         catImg.src = "../assets/img/cat-step1.svg";
//         catImg.style.display = "block";
//         updateButtonStyles(); // Фикс кнопки при старте
//     });

//     // Загрузка данных квиза
//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then((response) => response.json())
//         .then((data) => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }

//             // Инициализация квиза
//             loadStep(data);

//             // Навигация
//             nextButton.addEventListener("click", () => navigate(1, data));
//             prevButton.addEventListener("click", () => navigate(-1, data));
//         })
//         .catch(console.error);

//     function loadStep(data) {
//         if (!data.steps[currentStep]) {
//             console.error("Ошибка: шаг не найден", currentStep);
//             return;
//         }

//         // Обновление контента
//         document.getElementById("quiz-title").textContent = data.steps[currentStep].question;
//         document.querySelector(".quiz-progress").textContent = `${currentStep + 1}/${data.steps.length}`;

//         // Очистка и создание опций
//         const optionsContainer = document.getElementById("quiz-options");
//         optionsContainer.innerHTML = "";

//         if (data.steps[currentStep].options) {
//             data.steps[currentStep].options.forEach((option) => {
//                 const label = document.createElement("label");
//                 label.className = "quiz-option";

//                 const input = document.createElement("input");
//                 input.type = "radio";
//                 input.name = "answer";
//                 input.value = option;

//                 if (userAnswers[currentStep] === option) input.checked = true;

//                 const span = document.createElement("span");
//                 span.textContent = option;

//                 label.append(input, span);
//                 optionsContainer.appendChild(label);

//                 // Обработчик клика для опции
//                 input.addEventListener("change", () => {
//                     document.querySelectorAll(".quiz-option").forEach((opt) => {
//                         opt.classList.remove("selected");
//                     });
//                     if (input.checked) {
//                         label.classList.add("selected");
//                     }
//                     updateButtonStyles();
//                 });
//             });
//         }

//         // Обновление изображения
//         if (currentStep < preloadImages.length) {
//             catImg.src = preloadImages[currentStep];
//             catImg.style.display = "block";
//         }

//         // Обновление кнопок
//         updateButtonStyles();
//         prevButton.style.display = currentStep > 0 ? "block" : "none";
//     }

//     function navigate(direction, data) {
//         if (direction === 1 && !document.querySelector('input[name="answer"]:checked') && currentStep < 9) {
//             return;
//         }

//         saveAnswer();
//         currentStep += direction;

//         if (currentStep >= data.steps.length) {
//             showCompletionPage(); // Переход на 11 шаг
//         } else {
//             loadStep(data);
//         }
//     }

//     function updateButtonStyles() {
//         const selectedOption = document.querySelector('input[name="answer"]:checked');

//         // Обновление текста и стилей кнопки в зависимости от шага
//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-active", "btn-skip", "btn-disabled");
//             nextButton.classList.add("btn-submit");
//         } else if (selectedOption) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active", "btn-submit");
//             nextButton.classList.add("btn-disabled", "btn-skip");
//         }
//     }

//     function saveAnswer() {
//         const selected = document.querySelector('input[name="answer"]:checked');
//         userAnswers[currentStep] = selected ? selected.value : null;
//     }

//     function showCompletionPage() {
//         quizContainer.classList.add("hidden");
//         quizHeaderWrapper.classList.add("hidden");
//         quizCompletionPage.classList.remove("hidden"); // Отображаем страницу завершения
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = 0;
//     let userAnswers = [];

//     // Элементы
//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const startButton = document.getElementById("start-btn");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const quizImageContainer = document.getElementById("quiz-image-container");
//     const quizCompletionPage = document.getElementById("quiz-completion"); // Для 11-го шага

//     // Создание изображения для квиза
//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     // Прелоад изображений (11 котов)
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

//     // Обработчик ошибок загрузки изображений
//     catImg.onerror = () => {
//         console.error("Ошибка загрузки изображения:", catImg.src);
//         catImg.style.display = "none";
//     };

//     // Старт квиза
//     startButton.addEventListener("click", () => {
//         startPage.style.display = "none";
//         quizContainer.classList.remove("hidden");
//         quizHeaderWrapper.classList.remove("hidden");
//         quizContent.classList.remove("hidden");
//         currentStep = 0;
//         catImg.src = "../assets/img/cat-step1.svg";
//         catImg.style.display = "block";
//         updateButtonStyles(); // Устанавливаем правильный стиль кнопки
//     });

//     // Загрузка данных квиза
//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";

//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then((response) => response.json())
//         .then((data) => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }

//             // Инициализация квиза
//             loadStep(data);

//             // Навигация
//             nextButton.addEventListener("click", () => navigate(1, data));
//             prevButton.addEventListener("click", () => navigate(-1, data));
//         })
//         .catch(console.error);

//     function loadStep(data) {
//         if (!data.steps[currentStep]) {
//             console.error("Ошибка: шаг не найден", currentStep);
//             return;
//         }

//         // Обновление контента
//         document.getElementById("quiz-title").textContent = data.steps[currentStep].question;
//         document.querySelector(".quiz-progress").textContent = `${currentStep + 1}/${data.steps.length}`;

//         // Очистка и создание опций
//         const optionsContainer = document.getElementById("quiz-options");
//         optionsContainer.innerHTML = "";

//         if (data.steps[currentStep].options) {
//             data.steps[currentStep].options.forEach((option) => {
//                 const label = document.createElement("label");
//                 label.className = "quiz-option";

//                 const input = document.createElement("input");
//                 input.type = "radio";
//                 input.name = "answer";
//                 input.value = option;

//                 if (userAnswers[currentStep] === option) input.checked = true;

//                 const span = document.createElement("span");
//                 span.textContent = option;

//                 label.append(input, span);
//                 optionsContainer.appendChild(label);

//                 // Обработчик клика для опции
//                 input.addEventListener("change", () => {
//                     document.querySelectorAll(".quiz-option").forEach((opt) => {
//                         opt.classList.remove("selected");
//                     });
//                     if (input.checked) {
//                         label.classList.add("selected");
//                     }
//                     updateButtonStyles();
//                 });
//             });
//         }

//         // Обновление изображения
//         if (currentStep < preloadImages.length) {
//             catImg.src = preloadImages[currentStep];
//             catImg.style.display = "block";
//         }

//         // Обновление кнопок
//         updateButtonStyles();
//         prevButton.style.display = currentStep > 0 ? "block" : "none";
//     }

//     function navigate(direction, data) {
//         if (direction === 1 && !document.querySelector('input[name="answer"]:checked') && currentStep < 9) {
//             // Если кнопка "Пропустити питання", всё равно идём дальше
//             if (nextButton.classList.contains("btn-skip")) {
//                 saveSkippedAnswer();
//                 currentStep += direction;
//                 loadStep(data);
//                 return;
//             }
//             return;
//         }

//         saveAnswer();
//         currentStep += direction;

//         if (currentStep >= data.steps.length) {
//             showCompletionPage(); // Переход на 11 шаг
//         } else {
//             loadStep(data);
//         }
//     }

//     function updateButtonStyles() {
//         const selectedOption = document.querySelector('input[name="answer"]:checked');

//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-active", "btn-skip", "btn-disabled");
//             nextButton.classList.add("btn-submit");
//         } else if (selectedOption) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
//             nextButton.classList.add("btn-active");
//             nextButton.onclick = () => navigate(1, data);
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active", "btn-submit");
//             nextButton.classList.add("btn-skip", "btn-disabled");
//             nextButton.onclick = () => {
//                 saveSkippedAnswer();
//                 navigate(1, data);
//             };
//         }
//     }

//     function saveAnswer() {
//         const selected = document.querySelector('input[name="answer"]:checked');
//         userAnswers[currentStep] = selected ? selected.value : null;
//     }

//     function saveSkippedAnswer() {
//         userAnswers[currentStep] = null; // Записываем null как пропущенный ответ
//     }

//     function showCompletionPage() {
//         quizContainer.classList.add("hidden");
//         quizHeaderWrapper.classList.add("hidden");
//         quizCompletionPage.classList.remove("hidden"); // Отображаем страницу завершения
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    let userAnswers = [];
    let quizData = null; // Сохраняем загруженные данные

    // Элементы
    const startPage = document.getElementById("start-page");
    const quizContainer = document.getElementById("quiz-container");
    const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
    const quizContent = document.getElementById("quiz-content");
    const startButton = document.getElementById("start-btn");
    const nextButton = document.getElementById("next-btn");
    const prevButton = document.getElementById("prev-btn");
    const quizImageContainer = document.getElementById("quiz-image-container");
    const quizCompletionPage = document.getElementById("quiz-completion"); // Страница завершения квиза

    // Создание изображения
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

            quizData = data; // Сохраняем данные квиза
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

        if (quizData.steps[currentStep].options) {
            quizData.steps[currentStep].options.forEach((option) => {
                const label = document.createElement("label");
                label.className = "quiz-option";

                const input = document.createElement("input");
                input.type = "radio";
                input.name = "answer";
                input.value = option;

                if (userAnswers[currentStep] === option) input.checked = true;

                const span = document.createElement("span");
                span.textContent = option;

                label.append(input, span);
                optionsContainer.appendChild(label);

                input.addEventListener("change", () => {
                    document.querySelectorAll(".quiz-option").forEach((opt) => {
                        opt.classList.remove("selected");
                    });
                    if (input.checked) {
                        label.classList.add("selected");
                    }
                    updateButtonStyles();
                });
            });
        }

        if (currentStep < preloadImages.length) {
            catImg.src = preloadImages[currentStep];
            catImg.style.display = "block";
        }

        updateButtonStyles();
        prevButton.style.display = currentStep > 0 ? "block" : "none";
    }

    function navigate(direction) {
        if (!quizData) return;

        if (direction === 1 && !document.querySelector('input[name="answer"]:checked') && currentStep < 9) {
            saveSkippedAnswer();
        } else {
            saveAnswer();
        }

        currentStep += direction;

        if (currentStep >= quizData.steps.length) {
            showCompletionPage();
        } else {
            loadStep();
        }
    }

    // function updateButtonStyles() {
    //     const selectedOption = document.querySelector('input[name="answer"]:checked');

    //     if (currentStep === 9) {
    //         nextButton.textContent = "Відправити";
    //         nextButton.classList.remove("btn-active", "btn-skip", "btn-disabled");
    //         nextButton.classList.add("btn-submit");
    //     } else if (selectedOption) {
    //         nextButton.textContent = "Продовжити";
    //         nextButton.classList.remove("btn-skip", "btn-submit", "btn-disabled");
    //         nextButton.classList.add("btn-active");
    //     } else {
    //         nextButton.textContent = "Пропустити питання";
    //         nextButton.classList.remove("btn-active", "btn-submit");
    //         nextButton.classList.add("btn-skip", "btn-disabled");
    //     }
    // }

    function updateButtonStyles() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (currentStep === 9) {
        nextButton.textContent = "Відправити";
        nextButton.classList.remove("btn-skip", "btn-disabled");
        nextButton.classList.add("btn-active"); // Теперь "Відправити" стилизуется как "Продовжити"
    } else if (selectedOption) {
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
        const selected = document.querySelector('input[name="answer"]:checked');
        userAnswers[currentStep] = selected ? selected.value : null;
    }

    function saveSkippedAnswer() {
        userAnswers[currentStep] = null;
    }

    function showCompletionPage() {
        quizContainer.classList.add("hidden");
        quizHeaderWrapper.classList.add("hidden");
        quizCompletionPage.classList.remove("hidden");
    }
});