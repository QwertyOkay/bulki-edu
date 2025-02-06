document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    let userAnswers = [];

    // Элементы
    const startPage = document.getElementById("start-page");
    const quizContainer = document.getElementById("quiz-container");
    const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
    const quizContent = document.getElementById("quiz-content");
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
        '../assets/img/cat-step2.svg',     // Шаг 2
        '../assets/img/cat-step3.svg',     // Шаг 3
        '../assets/img/cat-step4.svg',
        '../assets/img/cat-step5.svg',
        '../assets/img/cat-step6.svg',
        '../assets/img/cat-step7.svg',
        '../assets/img/cat-step8.svg',
        '../assets/img/cat-step9.svg',
        '../assets/img/cat-step10.svg'
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
        quizHeaderWrapper.classList.remove('hidden');
        quizContent.classList.remove('hidden');
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
            '../assets/img/cat-step2.svg', // Шаг 2
            '../assets/img/cat-step3.svg', // Шаг 3
            '../assets/img/cat-step4.svg',
            '../assets/img/cat-step5.svg',
            '../assets/img/cat-step6.svg',
            '../assets/img/cat-step7.svg',
            '../assets/img/cat-step8.svg',
            '../assets/img/cat-step9.svg',
            '../assets/img/cat-step10.svg',
        ];

        if (currentStep < stepImages.length) {
            catImg.src = stepImages[currentStep];
            catImg.style.display = 'block';
        }

        // Обновление кнопок
        updateButtonStyles();
        nextButton.textContent = currentStep === data.steps.length - 1
            ? 'Завершити'
            : ' Продовжити';
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