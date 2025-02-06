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

const prevButton = document.getElementById("prev-btn");
if (prevButton) prevButton.remove();

// Добавляем логику "Назад" на стрелку
const backArrow = document.querySelector(".image-arrow-left");

if (backArrow) {
    backArrow.addEventListener("click", () => {
        if (currentStep === 0) {
            // Возвращаемся на стартовую страницу
            startPage.style.display = "flex";
            quizContainer.classList.add("hidden");
            quizHeaderWrapper.classList.add("hidden");
            quizContent.classList.add("hidden");

            // 🛠 СБРАСЫВАЕМ ВСЕ ПРОБЛЕМНЫЕ СТИЛИ ДЛЯ МОБИЛЬНОЙ ВЕРСИИ
            document.body.style.overflow = "auto";  // Разрешаем прокрутку
            document.body.style.height = "auto";  // Сбрасываем возможное фиксирование высоты

            if (startContainer) startContainer.style.height = "100dvh"; // Возвращаем нормальную высоту
            if (catBg) catBg.style.height = "auto"; // Убираем возможное залипание высоты
            if (imageContainer) {
                imageContainer.style.position = "relative"; // Сбрасываем фиксированное позиционирование
                imageContainer.style.bottom = "auto";
                imageContainer.style.top = "auto";
            }
            if (catImage) {
                catImage.style.transform = "none"; // Убираем смещение
                catImage.style.bottom = "0";
            }
        } else {
            // Если это не первый шаг, просто идём на предыдущий
            navigate(-1);
        }
    });
}
    
});