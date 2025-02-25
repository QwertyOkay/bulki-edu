// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = 0;
//     let userAnswers = [];
//     let quizData = null;
//     let quizResponses = new Array(11).fill(null);

//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const quizCompletion = document.getElementById("quiz-completion"); // Для проверки, но не будем использовать для рендеринга
//     const startElements = document.querySelectorAll("#start-btn, #start-btn2, #start-btn3, #start-btn4");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const nextButton2 = document.getElementById("next-btn2");
//     const quizImageContainer = document.getElementById("quiz-image-container");
//     const legalModal = document.getElementById("legal-modal");
//     const legalBtn = document.getElementById("legal-center-btn");
//     const closeModal = document.querySelector(".close-modal");
//     const phoneInput = document.getElementById("phone-input");
//     const nameInput = document.getElementById("name-input");
//     const emailInput = document.getElementById("email-input");

//     if (!phoneInput || !nameInput || !emailInput) {
//         console.error("❌ Ошибка: Одно из полей ввода не найдено!");
//         return;
//     }

//     // Функция для получения UTM-меток и других параметров из URL
//     function getUTMParams() {
//         const urlParams = new URLSearchParams(window.location.search);
//         const params = {
//             utm_source: urlParams.get("utm_source") || "",
//             utm_medium: urlParams.get("utm_medium") || "",
//             utm_campaign: urlParams.get("utm_campaign") || "",
//             utm_term: urlParams.get("utm_term") || "",
//             utm_content: urlParams.get("utm_content") || "",
//             gclid: urlParams.get("gclid") || "",
//             wbraid: urlParams.get("wbraid") || "",
//             gbraid: urlParams.get("gbraid") || ""
//         };
//         console.log("UTM-метки и параметры из URL:", params);
//         return params;
//     }

//     // Функция для получения реферера
//     function getReferrer() {
//         return document.referrer || "";
//     }

//     function updateButtonVisibility() {
//         const isFinalStep = currentStep === 9;
//         if (currentStep === quizData?.steps.length - 1) {
//             nextButton.style.display = "none"; // Явно скрываем на финальном шаге
//         } else {
//             nextButton.style.display = isFinalStep ? "none" : "block";
//             nextButton2.style.display = isFinalStep ? "block" : "none";
//         }
//     }

//     function loadIntlTelInput(callback) {
//         if (typeof window.intlTelInput === "function") {
//             console.log("✅ intlTelInput уже загружен.");
//             callback();
//             return;
//         }
//         const script = document.createElement("script");
//         script.src = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.6/js/intlTelInput.min.js";
//         script.onload = () => {
//             console.log("✅ intlTelInput загружен с CDN.");
//             const utilsScript = document.createElement("script");
//             utilsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.6/js/utils.js";
//             utilsScript.onload = () => {
//                 console.log("✅ utils.js загружен с CDN.");
//                 callback();
//             };
//             utilsScript.onerror = (e) => console.error("❌ Ошибка загрузки utils.js:", e);
//             document.body.appendChild(utilsScript);
//         };
//         script.onerror = (e) => {
//             console.error("❌ Ошибка загрузки intlTelInput.min.js:", e);
//             const fallbackScript = document.createElement("script");
//             fallbackScript.src = "https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.6/build/js/intlTelInput.min.js";
//             fallbackScript.onload = () => {
//                 console.log("✅ intlTelInput загружен с резервного CDN.");
//                 const fallbackUtilsScript = document.createElement("script");
//                 fallbackUtilsScript.src = "https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.6/build/js/utils.js";
//                 fallbackUtilsScript.onload = () => {
//                     console.log("✅ utils.js загружен с резервного CDN.");
//                     callback();
//                 };
//                 fallbackUtilsScript.onerror = (e) => console.error("❌ Ошибка загрузки резервного utils.js:", e);
//                 document.body.appendChild(fallbackUtilsScript);
//             };
//             fallbackScript.onerror = (e) => console.error("❌ Ошибка загрузки резервного intlTelInput.min.js:", e);
//             document.body.appendChild(fallbackScript);
//         };
//         document.body.appendChild(script);
//     }

//     let iti = null;
//     function initializeIntlTelInput() {
//         if (!window.intlTelInput || iti) {
//             console.log("✅ intlTelInput уже инициализирован или не загружен.");
//             return;
//         }
//         try {
//             iti = window.intlTelInput(phoneInput, {
//                 initialCountry: "ua",
//                 separateDialCode: true,
//                 nationalMode: false,
//                 utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.6/js/utils.js",
//                 dropdownContainer: document.body
//             });
//             console.log("✅ intlTelInput успешно инициализирован:", iti);

//             phoneInput.addEventListener("input", () => {
//                 const isValid = iti.isValidNumber();
//                 const number = iti.getNumber();
//                 console.log("Телефон:", phoneInput.value, "Полный номер:", number, "Валиден:", isValid);
//                 phoneInput.classList.toggle("invalid", !isValid);
//                 validateForm();
//             });

//             phoneInput.addEventListener("countrychange", () => {
//                 console.log("Страна изменена:", iti.getSelectedCountryData());
//             });

//             const flagContainer = phoneInput.closest(".iti").querySelector(".iti__flag-container");
//             if (flagContainer) {
//                 flagContainer.addEventListener("click", (e) => {
//                     e.preventDefault();
//                     console.log("Клик по флагу");
//                     iti.openDropdown();
//                 });
//             }
//         } catch (error) {
//             console.error("❌ Ошибка инициализации intlTelInput:", error);
//         }
//     }

//     loadIntlTelInput(() => {
//         initializeIntlTelInput();
//     });

//     function validateForm() {
//         if (currentStep !== 9) return true;
//         if (!iti || typeof iti.isValidNumber !== "function") {
//             console.error("❌ intlTelInput не готов к валидации! Используем резервную валидацию.");
//             const phoneValue = phoneInput.value.trim();
//             const phoneValid = /^(\+380)?\d{9}$/.test(phoneValue);
//             const nameValid = nameInput.value.trim() !== "";
//             const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
//             console.log("Резервная валидация:", { phoneValid, nameValid, emailValid, phoneValue });
//             return phoneValid && nameValid && emailValid;
//         }
//         const phoneValid = iti.isValidNumber();
//         const nameValid = nameInput.value.trim() !== "";
//         const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
//         console.log("Валидация:", { phoneValid, nameValid, emailValid, fullNumber: iti.getNumber() });
//         return phoneValid && nameValid && emailValid;
//     }

//     nextButton2.addEventListener("click", function (event) {
//         event.preventDefault();
//         const isValid = validateForm();
//         console.log("Форма валидна:", isValid);
//         if (isValid) {
//             saveAnswer();
//             submitQuiz();
//         } else {
//             phoneInput.classList.toggle("invalid", !iti || !iti.isValidNumber());
//             nameInput.classList.toggle("invalid", nameInput.value.trim() === "");
//             emailInput.classList.toggle("invalid", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value));
//         }
//     });

//     function openModal() { legalModal.classList.remove("hidden"); }
//     function closeModalWindow() { legalModal.classList.add("hidden"); }
//     if (legalBtn) legalBtn.addEventListener("click", openModal);
//     if (closeModal) closeModal.addEventListener("click", closeModalWindow);
//     window.addEventListener("click", (event) => {
//         if (event.target === legalModal) closeModalWindow();
//     });

//     function toggleLegalCenterVisibility() {
//         legalBtn.style.display = currentStep === 9 ? "block" : "none";
//     }

//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     const preloadImages = [
//         "../assets/img/cat-firstPage.png",
//         "../assets/img/cat-step1.png",
//         "../assets/img/cat-step2.png",
//         "../assets/img/cat-step3.png",
//         "../assets/img/cat-step4.png",
//         "../assets/img/cat-step5.png",
//         "../assets/img/cat-step6.png",
//         "../assets/img/cat-step7.png",
//         "../assets/img/cat-step8.png",
//         "../assets/img/cat-step9.png",
//         "../assets/img/cat-step10.png",
//         "../assets/img/cat-step11.png"
//     ];

//     catImg.onerror = () => {
//         console.error("Ошибка загрузки изображения:", catImg.src);
//         catImg.style.display = "none";
//     };

//     function updateCatImage() {
//         const stepIndex = currentStep + 1;
//         if (stepIndex >= 0 && stepIndex < preloadImages.length) {
//             catImg.src = preloadImages[stepIndex];
//             catImg.style.display = "block";
//         } else {
//             catImg.style.display = "none";
//         }
//     }

//     startElements.forEach(element => {
//         element.addEventListener("click", () => {
//             if (!quizData) {
//                 console.error("Ошибка: данные квиза не загружены. Пожалуйста, подождите...");
//                 alert("Данные квиза еще загружаются. Подождите несколько секунд и попробуйте снова.");
//                 return;
//             }
//             startPage.style.display = "none";
//             quizContainer.classList.remove("hidden");
//             quizHeaderWrapper.classList.remove("hidden");
//             quizContent.classList.remove("hidden");
//             quizCompletion.classList.add("hidden");
//             currentStep = 0;
//             catImg.style.display = "block";
//             loadStep();
//             updateButtonStyles();
//         });
//     });

//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";
//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then(response => response.json())
//         .then(data => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }
//             quizData = data;
//             userAnswers = new Array(quizData.steps.length).fill(null);
//             console.log("✅ Данные квиза загружены:", quizData);
//             loadStep();
//             nextButton.addEventListener("click", () => navigate(1));
//             prevButton?.addEventListener("click", () => navigate(-1));
//         })
//         .catch(error => {
//             console.error("Ошибка при загрузке данных:", error);
//             alert("Не удалось загрузить данные для квиза.");
//         });

//     function loadStep() {
//         if (!quizData || !quizData.steps || !quizData.steps[currentStep]) {
//             console.error("Ошибка: шаг не найден", currentStep);
//             return;
//         }
//         const stepData = quizData.steps[currentStep];
//         const quizTitle = document.getElementById("quiz-title");
//         const optionsContainer = document.getElementById("quiz-options");
//         const step10Form = document.getElementById("step10-form");
//         const quizCompletion = document.getElementById("quiz-completion");

//         quizTitle.style.display = "block";
//         optionsContainer.innerHTML = ""; // Очищаем контент перед рендером
//         optionsContainer.classList.remove("step-2", "step-6", "step-7", "step-8", "step-9", "step-10");

//         quizContainer.classList.remove("hidden"); // Убеждаемся, что контейнер квиза виден
//         quizContainer.style.display = "block";
//         quizHeaderWrapper.classList.remove("hidden");
//         quizHeaderWrapper.style.display = "flex";
//         quizCompletion.classList.add("hidden"); // Скрываем финальную статичную страницу
//         quizCompletion.style.display = "none";

//         if (currentStep === quizData.steps.length - 1) { // Финальный шаг (11-й, индекс 10)
//             optionsContainer.classList.remove("hidden"); // Удаляем класс hidden для отображения
//             optionsContainer.classList.add("step-completion");
//             optionsContainer.style.display = "flex"; // Устанавливаем display: flex для финального контента
//             quizTitle.style.display = "none";
//             document.querySelector(".quiz-progress").style.display = "none";
//             document.querySelector(".image-arrow-left").style.display = "none";
//             nextButton.style.display = "none"; // Явно скрываем кнопку next-btn на финальной странице
//             nextButton.classList.remove("btn-active", "btn-skip", "btn-disabled"); // Удаляем все классы, чтобы избежать конфликтов
//             if (prevButton) prevButton.style.display = "none";

//             if (stepData.completion) {
//                 if (stepData.completion.image) {
//                     const image = document.createElement("img");
//                     image.src = stepData.completion.image;
//                     image.alt = "Completion";
//                     image.classList.add("completion-image");
//                     optionsContainer.appendChild(image);
//                 }
//                 if (stepData.completion.title) {
//                     const title = document.createElement("h2");
//                     title.textContent = stepData.completion.title;
//                     title.classList.add("completion-title");
//                     optionsContainer.appendChild(title);
//                 }
//                 if (stepData.completion.message) {
//                     const message = document.createElement("p");
//                     message.textContent = stepData.completion.message;
//                     message.classList.add("completion-message");
//                     optionsContainer.appendChild(message);
//                 }
//                 if (stepData.completion.subtext) {
//                     const subtext = document.createElement("p");
//                     subtext.textContent = stepData.completion.subtext;
//                     subtext.classList.add("completion-subtext");
//                     optionsContainer.appendChild(subtext);
//                 }
//             }
//             step10Form.classList.remove("visible");
//             step10Form.classList.add("hidden");
//             step10Form.style.display = "none";
//             if (legalBtn) legalBtn.style.display = "none";
//         } else {
//             document.querySelector(".quiz-progress").style.display = "block";
//             document.querySelector(".image-arrow-left").style.display = "block";
//             nextButton.style.display = "block"; // Показываем кнопку на всех остальных шагах

//             if (currentStep === 9) {
//                 optionsContainer.classList.add("hidden");
//                 optionsContainer.style.display = "none";
//                 step10Form.classList.remove("hidden");
//                 step10Form.classList.add("visible");
//                 step10Form.style.display = "block";
//                 const existingDescription = step10Form.querySelector(".quiz-description-step10");
//                 if (existingDescription) {
//                     existingDescription.remove();
//                 }
//                 if (stepData.description) {
//                     const description = document.createElement("div");
//                     description.className = "quiz-description-step10";
//                     description.innerHTML = stepData.description;
//                     step10Form.insertBefore(description, step10Form.firstChild);
//                 }
//             } else {
//                 step10Form.classList.remove("visible");
//                 step10Form.classList.add("hidden");
//                 step10Form.style.display = "none";
//                 optionsContainer.classList.remove("hidden");
//                 optionsContainer.style.display = "flex";
//                 if (stepData.description) {
//                     const description = document.createElement("div");
//                     description.className = "quiz-description";
//                     if (currentStep === 8) description.classList.add("quiz-description-step9");
//                     description.textContent = stepData.description;
//                     optionsContainer.appendChild(description);
//                 }
//             }

//             if (currentStep === 1) {
//                 optionsContainer.classList.add("step-2");
//                 stepData.options.forEach(option => {
//                     const label = document.createElement("label");
//                     label.className = "quiz-option";
//                     let optionText = typeof option === "string" ? option : option.text;
//                     label.classList.add(typeof option === "string" || option.width === "full" ? "full-width" : "half-width");

//                     const input = document.createElement("input");
//                     input.type = stepData.multiSelect ? "checkbox" : "radio";
//                     input.name = "answer";
//                     input.value = optionText;
//                     if (userAnswers[currentStep]?.includes(optionText)) {
//                         input.checked = true;
//                         label.classList.add("selected");
//                     }
//                     const span = document.createElement("span");
//                     span.textContent = optionText;
//                     label.append(input, span);
//                     optionsContainer.appendChild(label);

//                     label.addEventListener("click", () => {
//                         if (stepData.multiSelect) {
//                             input.checked = !input.checked;
//                             label.classList.toggle("selected", input.checked);
//                             updateSelectedAnswers();
//                         } else {
//                             document.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
//                             input.checked = true;
//                             label.classList.add("selected");
//                             userAnswers[currentStep] = input.value;
//                         }
//                         updateButtonStyles();
//                     });
//                 });
//             } else if (currentStep === 5) {
//                 optionsContainer.classList.add("step-6");
//                 const daysGroup = document.createElement("div");
//                 daysGroup.classList.add("quiz-group", "quiz-days");
//                 stepData.options.days.forEach(day => {
//                     const label = document.createElement("label");
//                     label.className = "quiz-option half-width";
//                     const input = document.createElement("input");
//                     input.type = "checkbox";
//                     input.name = "answer-day";
//                     input.value = day;
//                     const span = document.createElement("span");
//                     span.textContent = day;
//                     label.append(input, span);
//                     daysGroup.appendChild(label);
//                     if (userAnswers[currentStep]?.days?.includes(day)) {
//                         input.checked = true;
//                         label.classList.add("selected");
//                     }
//                     label.addEventListener("click", () => {
//                         input.checked = !input.checked;
//                         label.classList.toggle("selected", input.checked);
//                         updateSelectedAnswers();
//                         updateButtonStyles();
//                     });
//                 });
//                 optionsContainer.appendChild(daysGroup);

//                 const timeGroup = document.createElement("div");
//                 timeGroup.classList.add("quiz-group", "quiz-times");
//                 stepData.options.times.forEach(time => {
//                     const label = document.createElement("label");
//                     label.className = "quiz-option full-width";
//                     const input = document.createElement("input");
//                     input.type = "checkbox";
//                     input.name = "answer-time";
//                     input.value = time.text;
//                     const icon = document.createElement("span");
//                     icon.className = "quiz-icon";
//                     icon.textContent = time.icon;
//                     const span = document.createElement("span");
//                     span.textContent = time.text;
//                     label.append(input, icon, span);
//                     timeGroup.appendChild(label);
//                     if (userAnswers[currentStep]?.times?.includes(time.text)) {
//                         input.checked = true;
//                         label.classList.add("selected");
//                     }
//                     label.addEventListener("click", () => {
//                         input.checked = !input.checked;
//                         label.classList.toggle("selected", input.checked);
//                         updateSelectedAnswers();
//                         updateButtonStyles();
//                     });
//                 });
//                 optionsContainer.appendChild(timeGroup);
//             } else if (currentStep === 7) {
//                 optionsContainer.classList.add("step-8");
//                 const sliderWrapper = document.createElement("div");
//                 sliderWrapper.classList.add("slider-wrapper");
//                 const sliderLabel = document.createElement("label");
//                 sliderLabel.textContent = "Ваш бюджет за одне заняття: ";
//                 sliderWrapper.appendChild(sliderLabel);
//                 const sliderInput = document.createElement("input");
//                 sliderInput.type = "range";
//                 sliderInput.min = "298";
//                 sliderInput.max = "398";
//                 sliderInput.step = "2";
//                 sliderInput.value = userAnswers[currentStep] || "300";
//                 const valueDisplay = document.createElement("span");
//                 valueDisplay.classList.add("value-display");
//                 valueDisplay.textContent = `${sliderInput.value} грн`;
//                 sliderWrapper.appendChild(sliderInput);
//                 sliderWrapper.appendChild(valueDisplay);
//                 sliderInput.addEventListener("input", () => {
//                     valueDisplay.textContent = `${sliderInput.value} грн`;
//                     userAnswers[currentStep] = parseInt(sliderInput.value, 10);
//                     updateButtonStyles();
//                 });
//                 optionsContainer.appendChild(sliderWrapper);
//             } else if (Array.isArray(stepData.options)) {
//                 stepData.options.forEach(option => {
//                     const label = document.createElement("label");
//                     label.className = "quiz-option";
//                     let optionText = typeof option === "string" ? option : option.text;
//                     label.classList.add(typeof option === "string" || option.width === "full" ? "full-width" : "half-width");

//                     const input = document.createElement("input");
//                     input.type = stepData.multiSelect ? "checkbox" : "radio";
//                     input.name = "answer";
//                     input.value = optionText;
//                     if (userAnswers[currentStep]?.includes(optionText) || userAnswers[currentStep] === optionText) {
//                         input.checked = true;
//                         label.classList.add("selected");
//                     }
//                     const span = document.createElement("span");
//                     span.textContent = optionText;
//                     label.append(input, span);
//                     optionsContainer.appendChild(label);

//                     label.addEventListener("click", () => {
//                         if (stepData.multiSelect) {
//                             input.checked = !input.checked;
//                             label.classList.toggle("selected", input.checked);
//                             updateSelectedAnswers();
//                         } else {
//                             document.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
//                             input.checked = true;
//                             label.classList.add("selected");
//                             userAnswers[currentStep] = input.value;
//                         }
//                         updateButtonStyles();
//                     });
//                 });
//             }

//             updateCatImage();
//             quizTitle.textContent = stepData.question;
//             if (currentStep < quizData.steps.length - 1) {
//                 document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${quizData.steps.length - 1}`;
//             }
//             toggleLegalCenterVisibility();
//         }
//         updateButtonStyles(); // Вызываем обновление стилей кнопки после каждого шага
//         updateButtonVisibility();
//     }

//     function navigate(direction) {
//         if (direction === 1 && currentStep === 9 && !validateForm()) return;
//         if (!quizData) return;
//         if (direction === -1 && currentStep === 0) return;
//         if (direction === 1 && currentStep >= quizData.steps.length - 1) return;

//         if (direction === 1) saveAnswer();
//         currentStep += direction;
//         loadStep();
//     }

//     function updateButtonStyles() {
//         let hasSelection = false;
//         if (currentStep === 9) {
//             const name = nameInput.value.trim();
//             const phone = phoneInput.value.trim();
//             hasSelection = name !== "" && phone !== "";
//         } else if (currentStep === 5) {
//             const selectedDays = document.querySelectorAll('input[name="answer-day"]:checked').length > 0;
//             const selectedTimes = document.querySelectorAll('input[name="answer-time"]:checked').length > 0;
//             hasSelection = selectedDays || selectedTimes;
//         } else if (currentStep === 7) {
//             const sliderInput = document.querySelector('input[type="range"]');
//             hasSelection = sliderInput && parseInt(sliderInput.value, 10) !== 298;
//         } else if (currentStep === quizData?.steps.length - 1) { // Финальный шаг (нет выбора, кнопка скрыта)
//             hasSelection = false; // Убедимся, что на финальном шаге кнопка не активна
//         } else {
//             const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
//             hasSelection = selectedOptions.length > 0;
//         }

//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-skip", "btn-disabled");
//             nextButton.classList.add(hasSelection ? "btn-active" : "btn-disabled");
//         } else if (hasSelection) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active");
//             nextButton.classList.add("btn-skip", "btn-disabled");
//         }

//         // Убедимся, что на финальном шаге кнопка скрыта
//         if (currentStep === quizData?.steps.length - 1) {
//             nextButton.style.display = "none";
//             nextButton.classList.remove("btn-active", "btn-skip", "btn-disabled");
//         }
//     }

//     function updateSelectedAnswers() {
//         if (currentStep === 5) {
//             const selectedDays = Array.from(document.querySelectorAll('input[name="answer-day"]:checked')).map(el => el.value);
//             const selectedTimes = Array.from(document.querySelectorAll('input[name="answer-time"]:checked')).map(el => el.value);
//             userAnswers[currentStep] = { days: selectedDays, times: selectedTimes };
//         } else if (currentStep === 7) {
//             const sliderInput = document.querySelector('input[type="range"]');
//             userAnswers[currentStep] = sliderInput ? parseInt(sliderInput.value, 10) : null;
//         } else if (quizData.steps[currentStep].multiSelect) {
//             const selected = document.querySelectorAll('input[name="answer"]:checked');
//             userAnswers[currentStep] = Array.from(selected).map(el => el.value);
//         } else {
//             const selected = document.querySelector('input[name="answer"]:checked');
//             userAnswers[currentStep] = selected ? selected.value : null;
//         }
//     }

//     function saveAnswer() {
//         if (currentStep === 9) {
//             const formData = {
//                 name: nameInput.value.trim(),
//                 phone: iti && iti.isValidNumber() ? iti.getNumber() : phoneInput.value.trim(),
//                 email: emailInput.value.trim()
//             };
//             quizResponses[currentStep] = formData;
//             window.quizResponses = formData;
//             console.log("💾 Данные формы сохранены (подробно):", JSON.stringify(formData, null, 2));
//         } else {
//             updateSelectedAnswers();
//             quizResponses[currentStep] = userAnswers[currentStep];
//             console.log("💾 Данные шага сохранены:", currentStep, quizResponses[currentStep]);
//         }
//     }

//     async function submitQuiz() {
//         try {
//             saveAnswer();
//             const utmParams = getUTMParams(); // Получаем UTM-метки и параметры
//             const referrer = getReferrer(); // Получаем реферер
//             const dataToSend = {
//                 Timestamp: new Date().toISOString(),
//                 ...quizResponses.reduce((acc, val, idx) => ({ ...acc, [`Step${idx + 1}`]: val || "" }), {}),
//                 name: window.quizResponses?.name || "",
//                 phone: window.quizResponses?.phone || "",
//                 email: window.quizResponses?.email || "",
//                 ...utmParams, // Добавляем UTM-метки
//                 referrer: referrer, // Добавляем реферер
//                 gclid: utmParams.gclid || "", // Убедимся, что gclid передаётся
//                 wbraid: utmParams.wbraid || "", // Убедимся, что wbraid передаётся
//                 gbraid: utmParams.gbraid || "" // Убедимся, что gbraid передаётся
//             };
//             console.log("📤 Данные для отправки (подробно):", JSON.stringify(dataToSend, null, 2));

//             const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNRvIKbGRm4Dk3aiee72ioHXX6yKLu-p4O8y8qahDmD6CShAskU9Rzf4LY7qoWCrTj/exec";
//             const response = await fetch(SCRIPT_URL, {
//                 method: "POST",
//                 mode: "no-cors",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(dataToSend)
//             });
//             console.log("✅ Данные отправлены (mode: no-cors, статус не доступен):", response);
//             navigate(1); // Переход на финальную страницу
//         } catch (error) {
//             console.error("❌ Ошибка при отправке (подробно):", error);
//         }
//     }

//     const backArrow = document.querySelector(".image-arrow-left");
//     if (backArrow) {
//         backArrow.addEventListener("click", () => {
//             if (currentStep === 0) {
//                 startPage.style.display = "flex";
//                 quizContainer.classList.add("hidden");
//                 quizHeaderWrapper.classList.add("hidden");
//                 quizContent.classList.add("hidden");
//                 quizCompletion.classList.add("hidden");
//                 document.body.style.overflow = "auto";
//                 document.body.style.height = "auto";
//             } else {
//                 navigate(-1);
//             }
//         });
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     let currentStep = 0;
//     let userAnswers = [];
//     let quizData = null;
//     let quizResponses = new Array(11).fill(null);

//     const startPage = document.getElementById("start-page");
//     const quizContainer = document.getElementById("quiz-container");
//     const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
//     const quizContent = document.getElementById("quiz-content");
//     const quizCompletion = document.getElementById("quiz-completion"); // Для проверки, но не будем использовать для рендеринга
//     const startElements = document.querySelectorAll("#start-btn, #start-btn2, #start-btn3, #start-btn4");
//     const nextButton = document.getElementById("next-btn");
//     const prevButton = document.getElementById("prev-btn");
//     const nextButton2 = document.getElementById("next-btn2");
//     const quizImageContainer = document.getElementById("quiz-image-container");
//     const legalModal = document.getElementById("legal-modal");
//     const legalBtn = document.getElementById("legal-center-btn");
//     const closeModal = document.querySelector(".close-modal");
//     const phoneInput = document.getElementById("phone-input");
//     const nameInput = document.getElementById("name-input");
//     const emailInput = document.getElementById("email-input");

//     if (!phoneInput || !nameInput || !emailInput) {
//         console.error("❌ Ошибка: Одно из полей ввода не найдено!");
//         return;
//     }

//     // Функция для получения UTM-меток и других параметров из URL
//     function getUTMParams() {
//         const urlParams = new URLSearchParams(window.location.search);
//         const params = {
//             utm_source: urlParams.get("utm_source") || "",
//             utm_medium: urlParams.get("utm_medium") || "",
//             utm_campaign: urlParams.get("utm_campaign") || "",
//             utm_term: urlParams.get("utm_term") || "",
//             utm_content: urlParams.get("utm_content") || "",
//             gclid: urlParams.get("gclid") || "",
//             wbraid: urlParams.get("wbraid") || "",
//             gbraid: urlParams.get("gbraid") || ""
//         };
//         console.log("UTM-метки и параметры из URL:", params);
//         return params;
//     }

//     // Функция для получения реферера
//     function getReferrer() {
//         return document.referrer || "";
//     }

//     function updateButtonVisibility() {
//         const isFinalStep = currentStep === 9;
//         if (currentStep === quizData?.steps.length - 1) {
//             nextButton.style.display = "none"; // Явно скрываем на финальном шаге
//         } else {
//             nextButton.style.display = isFinalStep ? "none" : "block";
//             nextButton2.style.display = isFinalStep ? "block" : "none";
//         }
//     }

//     function loadIntlTelInput(callback) {
//         if (typeof window.intlTelInput === "function") {
//             console.log("✅ intlTelInput уже загружен.");
//             callback();
//             return;
//         }
//         const script = document.createElement("script");
//         script.src = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.6/js/intlTelInput.min.js";
//         script.onload = () => {
//             console.log("✅ intlTelInput загружен с CDN.");
//             const utilsScript = document.createElement("script");
//             utilsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.6/js/utils.js";
//             utilsScript.onload = () => {
//                 console.log("✅ utils.js загружен с CDN.");
//                 callback();
//             };
//             utilsScript.onerror = (e) => console.error("❌ Ошибка загрузки utils.js:", e);
//             document.body.appendChild(utilsScript);
//         };
//         script.onerror = (e) => {
//             console.error("❌ Ошибка загрузки intlTelInput.min.js:", e);
//             const fallbackScript = document.createElement("script");
//             fallbackScript.src = "https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.6/build/js/intlTelInput.min.js";
//             fallbackScript.onload = () => {
//                 console.log("✅ intlTelInput загружен с резервного CDN.");
//                 const fallbackUtilsScript = document.createElement("script");
//                 fallbackUtilsScript.src = "https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.6/build/js/utils.js";
//                 fallbackUtilsScript.onload = () => {
//                     console.log("✅ utils.js загружен с резервного CDN.");
//                     callback();
//                 };
//                 fallbackUtilsScript.onerror = (e) => console.error("❌ Ошибка загрузки резервного utils.js:", e);
//                 document.body.appendChild(fallbackUtilsScript);
//             };
//             fallbackScript.onerror = (e) => console.error("❌ Ошибка загрузки резервного intlTelInput.min.js:", e);
//             document.body.appendChild(fallbackScript);
//         };
//         document.body.appendChild(script);
//     }

//     let iti = null;
//     function initializeIntlTelInput() {
//         if (!window.intlTelInput || iti) {
//             console.log("✅ intlTelInput уже инициализирован или не загружен.");
//             return;
//         }
//         try {
//             iti = window.intlTelInput(phoneInput, {
//                 initialCountry: "ua",
//                 separateDialCode: true,
//                 nationalMode: false,
//                 utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.6/js/utils.js",
//                 dropdownContainer: document.body
//             });
//             console.log("✅ intlTelInput успешно инициализирован:", iti);

//             // Убираем автоматическое добавление класса invalid при вводе
//             phoneInput.addEventListener("input", () => {
//                 const isValid = iti.isValidNumber();
//                 const number = iti.getNumber();
//                 console.log("Телефон:", phoneInput.value, "Полный номер:", number, "Валиден:", isValid);
//                 // Не добавляем класс invalid автоматически, только проверяем валидацию
//                 validateForm();
//             });

//             phoneInput.addEventListener("countrychange", () => {
//                 console.log("Страна изменена:", iti.getSelectedCountryData());
//                 validateForm(); // Проверяем валидацию при смене страны
//             });

//             const flagContainer = phoneInput.closest(".iti").querySelector(".iti__flag-container");
//             if (flagContainer) {
//                 flagContainer.addEventListener("click", (e) => {
//                     e.preventDefault();
//                     console.log("Клик по флагу");
//                     iti.openDropdown();
//                 });
//             }
//         } catch (error) {
//             console.error("❌ Ошибка инициализации intlTelInput:", error);
//         }
//     }

//     loadIntlTelInput(() => {
//         initializeIntlTelInput();
//     });

//     function validateForm() {
//         if (currentStep !== 9) return true;
//         if (!iti || typeof iti.isValidNumber !== "function") {
//             console.error("❌ intlTelInput не готов к валидации! Используем резервную валидацию.");
//             const phoneValue = phoneInput.value.trim();
//             const phoneValid = /^(\+380)?\d{9}$/.test(phoneValue);
//             const nameValid = nameInput.value.trim() !== "";
//             const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
//             console.log("Резервная валидация:", { phoneValid, nameValid, emailValid, phoneValue });
//             return phoneValid && nameValid && emailValid;
//         }
//         const phoneValid = iti.isValidNumber();
//         const nameValid = nameInput.value.trim() !== "";
//         const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
//         console.log("Валидация:", { phoneValid, nameValid, emailValid, fullNumber: iti.getNumber() });
//         return phoneValid && nameValid && emailValid;
//     }

//     function clearInvalidStyles() {
//         // Убираем класс invalid с всех инпутов при загрузке шага
//         phoneInput.classList.remove("invalid");
//         nameInput.classList.remove("invalid");
//         emailInput.classList.remove("invalid");
//     }

//     nextButton2.addEventListener("click", function (event) {
//         event.preventDefault();
//         const isValid = validateForm();
//         console.log("Форма валидна:", isValid);
//         if (isValid) {
//             saveAnswer();
//             submitQuiz();
//         } else {
//             // Добавляем класс invalid только если данные некорректны или пустые
//             phoneInput.classList.toggle("invalid", !iti || !iti.isValidNumber());
//             nameInput.classList.toggle("invalid", nameInput.value.trim() === "");
//             emailInput.classList.toggle("invalid", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value));
//         }
//     });

//     function openModal() { legalModal.classList.remove("hidden"); }
//     function closeModalWindow() { legalModal.classList.add("hidden"); }
//     if (legalBtn) legalBtn.addEventListener("click", openModal);
//     if (closeModal) closeModal.addEventListener("click", closeModalWindow);
//     window.addEventListener("click", (event) => {
//         if (event.target === legalModal) closeModalWindow();
//     });

//     function toggleLegalCenterVisibility() {
//         legalBtn.style.display = currentStep === 9 ? "block" : "none";
//     }

//     const catImg = new Image();
//     catImg.classList.add("quiz-cat");
//     catImg.alt = "Quiz Cat";
//     catImg.style.display = "none";
//     quizImageContainer.appendChild(catImg);

//     const preloadImages = [
//         "../assets/img/cat-firstPage.png",
//         "../assets/img/cat-step1.png",
//         "../assets/img/cat-step2.png",
//         "../assets/img/cat-step3.png",
//         "../assets/img/cat-step4.png",
//         "../assets/img/cat-step5.png",
//         "../assets/img/cat-step6.png",
//         "../assets/img/cat-step7.png",
//         "../assets/img/cat-step8.png",
//         "../assets/img/cat-step9.png",
//         "../assets/img/cat-step10.png",
//         "../assets/img/cat-step11.png"
//     ];

//     catImg.onerror = () => {
//         console.error("Ошибка загрузки изображения:", catImg.src);
//         catImg.style.display = "none";
//     };

//     function updateCatImage() {
//         const stepIndex = currentStep + 1;
//         if (stepIndex >= 0 && stepIndex < preloadImages.length) {
//             catImg.src = preloadImages[stepIndex];
//             catImg.style.display = "block";
//         } else {
//             catImg.style.display = "none";
//         }
//     }

//     startElements.forEach(element => {
//         element.addEventListener("click", () => {
//             if (!quizData) {
//                 console.error("Ошибка: данные квиза не загружены. Пожалуйста, подождите...");
//                 alert("Данные квиза еще загружаются. Подождите несколько секунд и попробуйте снова.");
//                 return;
//             }
//             startPage.style.display = "none";
//             quizContainer.classList.remove("hidden");
//             quizHeaderWrapper.classList.remove("hidden");
//             quizContent.classList.remove("hidden");
//             quizCompletion.classList.add("hidden");
//             currentStep = 0;
//             catImg.style.display = "block";
//             loadStep();
//             updateButtonStyles();
//         });
//     });

//     const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";
//     fetch(`../${langFolder}/locales/quiz.json`)
//         .then(response => response.json())
//         .then(data => {
//             if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
//                 throw new Error("Ошибка: некорректные данные квиза");
//             }
//             quizData = data;
//             userAnswers = new Array(quizData.steps.length).fill(null);
//             console.log("✅ Данные квиза загружены:", quizData);
//             loadStep();
//             nextButton.addEventListener("click", () => navigate(1));
//             prevButton?.addEventListener("click", () => navigate(-1));
//         })
//         .catch(error => {
//             console.error("Ошибка при загрузке данных:", error);
//             alert("Не удалось загрузить данные для квиза.");
//         });

//     function loadStep() {
//         if (!quizData || !quizData.steps || !quizData.steps[currentStep]) {
//             console.error("Ошибка: шаг не найден", currentStep);
//             return;
//         }
//         const stepData = quizData.steps[currentStep];
//         const quizTitle = document.getElementById("quiz-title");
//         const optionsContainer = document.getElementById("quiz-options");
//         const step10Form = document.getElementById("step10-form");
//         const quizCompletion = document.getElementById("quiz-completion");

//         quizTitle.style.display = "block";
//         optionsContainer.innerHTML = ""; // Очищаем контент перед рендером
//         optionsContainer.classList.remove("step-2", "step-6", "step-7", "step-8", "step-9", "step-10");

//         quizContainer.classList.remove("hidden"); // Убеждаемся, что контейнер квиза виден
//         quizContainer.style.display = "block";
//         quizHeaderWrapper.classList.remove("hidden");
//         quizHeaderWrapper.style.display = "flex";
//         quizCompletion.classList.add("hidden"); // Скрываем финальную статичную страницу
//         quizCompletion.style.display = "none";

//         if (currentStep === quizData.steps.length - 1) { // Финальный шаг (11-й, индекс 10)
//             optionsContainer.classList.remove("hidden"); // Удаляем класс hidden для отображения
//             optionsContainer.classList.add("step-completion");
//             optionsContainer.style.display = "flex"; // Устанавливаем display: flex для финального контента
//             quizTitle.style.display = "none";
//             document.querySelector(".quiz-progress").style.display = "none";
//             document.querySelector(".image-arrow-left").style.display = "none";
//             nextButton.style.display = "none"; // Явно скрываем кнопку next-btn на финальной странице
//             nextButton.classList.remove("btn-active", "btn-skip", "btn-disabled"); // Удаляем все классы, чтобы избежать конфликтов
//             if (prevButton) prevButton.style.display = "none";

//             if (stepData.completion) {
//                 if (stepData.completion.image) {
//                     const image = document.createElement("img");
//                     image.src = stepData.completion.image;
//                     image.alt = "Completion";
//                     image.classList.add("completion-image");
//                     optionsContainer.appendChild(image);
//                 }
//                 if (stepData.completion.title) {
//                     const title = document.createElement("h2");
//                     title.textContent = stepData.completion.title;
//                     title.classList.add("completion-title");
//                     optionsContainer.appendChild(title);
//                 }
//                 if (stepData.completion.message) {
//                     const message = document.createElement("p");
//                     message.textContent = stepData.completion.message;
//                     message.classList.add("completion-message");
//                     optionsContainer.appendChild(message);
//                 }
//                 if (stepData.completion.subtext) {
//                     const subtext = document.createElement("p");
//                     subtext.textContent = stepData.completion.subtext;
//                     subtext.classList.add("completion-subtext");
//                     optionsContainer.appendChild(subtext);
//                 }
//             }
//             step10Form.classList.remove("visible");
//             step10Form.classList.add("hidden");
//             step10Form.style.display = "none";
//             if (legalBtn) legalBtn.style.display = "none";
//         } else {
//             document.querySelector(".quiz-progress").style.display = "block";
//             document.querySelector(".image-arrow-left").style.display = "block";
//             nextButton.style.display = "block"; // Показываем кнопку на всех остальных шагах

//             if (currentStep === 9) {
//                 optionsContainer.classList.add("hidden");
//                 optionsContainer.style.display = "none";
//                 step10Form.classList.remove("hidden");
//                 step10Form.classList.add("visible");
//                 step10Form.style.display = "block";
//                 const existingDescription = step10Form.querySelector(".quiz-description-step10");
//                 if (existingDescription) {
//                     existingDescription.remove();
//                 }
//                 if (stepData.description) {
//                     const description = document.createElement("div");
//                     description.className = "quiz-description-step10";
//                     description.innerHTML = stepData.description;
//                     step10Form.insertBefore(description, step10Form.firstChild);
//                 }
//                 // Сбрасываем класс invalid при загрузке шага 10
//                 clearInvalidStyles();
//             } else {
//                 step10Form.classList.remove("visible");
//                 step10Form.classList.add("hidden");
//                 step10Form.style.display = "none";
//                 optionsContainer.classList.remove("hidden");
//                 optionsContainer.style.display = "flex";
//                 if (stepData.description) {
//                     const description = document.createElement("div");
//                     description.className = "quiz-description";
//                     if (currentStep === 8) description.classList.add("quiz-description-step9");
//                     description.textContent = stepData.description;
//                     optionsContainer.appendChild(description);
//                 }
//             }

//             if (currentStep === 1) {
//                 optionsContainer.classList.add("step-2");
//                 stepData.options.forEach(option => {
//                     const label = document.createElement("label");
//                     label.className = "quiz-option";
//                     let optionText = typeof option === "string" ? option : option.text;
//                     label.classList.add(typeof option === "string" || option.width === "full" ? "full-width" : "half-width");

//                     const input = document.createElement("input");
//                     input.type = stepData.multiSelect ? "checkbox" : "radio";
//                     input.name = "answer";
//                     input.value = optionText;
//                     if (userAnswers[currentStep]?.includes(optionText)) {
//                         input.checked = true;
//                         label.classList.add("selected");
//                     }
//                     const span = document.createElement("span");
//                     span.textContent = optionText;
//                     label.append(input, span);
//                     optionsContainer.appendChild(label);

//                     label.addEventListener("click", () => {
//                         if (stepData.multiSelect) {
//                             input.checked = !input.checked;
//                             label.classList.toggle("selected", input.checked);
//                             updateSelectedAnswers();
//                         } else {
//                             document.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
//                             input.checked = true;
//                             label.classList.add("selected");
//                             userAnswers[currentStep] = input.value;
//                         }
//                         updateButtonStyles();
//                     });
//                 });
//             } else if (currentStep === 5) {
//                 optionsContainer.classList.add("step-6");
//                 const daysGroup = document.createElement("div");
//                 daysGroup.classList.add("quiz-group", "quiz-days");
//                 stepData.options.days.forEach(day => {
//                     const label = document.createElement("label");
//                     label.className = "quiz-option half-width";
//                     const input = document.createElement("input");
//                     input.type = "checkbox";
//                     input.name = "answer-day";
//                     input.value = day;
//                     const span = document.createElement("span");
//                     span.textContent = day;
//                     label.append(input, span);
//                     daysGroup.appendChild(label);
//                     if (userAnswers[currentStep]?.days?.includes(day)) {
//                         input.checked = true;
//                         label.classList.add("selected");
//                     }
//                     label.addEventListener("click", () => {
//                         input.checked = !input.checked;
//                         label.classList.toggle("selected", input.checked);
//                         updateSelectedAnswers();
//                         updateButtonStyles();
//                     });
//                 });
//                 optionsContainer.appendChild(daysGroup);

//                 const timeGroup = document.createElement("div");
//                 timeGroup.classList.add("quiz-group", "quiz-times");
//                 stepData.options.times.forEach(time => {
//                     const label = document.createElement("label");
//                     label.className = "quiz-option full-width";
//                     const input = document.createElement("input");
//                     input.type = "checkbox";
//                     input.name = "answer-time";
//                     input.value = time.text;
//                     const icon = document.createElement("span");
//                     icon.className = "quiz-icon";
//                     icon.textContent = time.icon;
//                     const span = document.createElement("span");
//                     span.textContent = time.text;
//                     label.append(input, icon, span);
//                     timeGroup.appendChild(label);
//                     if (userAnswers[currentStep]?.times?.includes(time.text)) {
//                         input.checked = true;
//                         label.classList.add("selected");
//                     }
//                     label.addEventListener("click", () => {
//                         input.checked = !input.checked;
//                         label.classList.toggle("selected", input.checked);
//                         updateSelectedAnswers();
//                         updateButtonStyles();
//                     });
//                 });
//                 optionsContainer.appendChild(timeGroup);
//             } else if (currentStep === 7) {
//                 optionsContainer.classList.add("step-8");
//                 const sliderWrapper = document.createElement("div");
//                 sliderWrapper.classList.add("slider-wrapper");
//                 const sliderLabel = document.createElement("label");
//                 sliderLabel.textContent = "Ваш бюджет за одне заняття: ";
//                 sliderWrapper.appendChild(sliderLabel);
//                 const sliderInput = document.createElement("input");
//                 sliderInput.type = "range";
//                 sliderInput.min = "298";
//                 sliderInput.max = "398";
//                 sliderInput.step = "2";
//                 sliderInput.value = userAnswers[currentStep] || "300";
//                 const valueDisplay = document.createElement("span");
//                 valueDisplay.classList.add("value-display");
//                 valueDisplay.textContent = `${sliderInput.value} грн`;
//                 sliderWrapper.appendChild(sliderInput);
//                 sliderWrapper.appendChild(valueDisplay);
//                 sliderInput.addEventListener("input", () => {
//                     valueDisplay.textContent = `${sliderInput.value} грн`;
//                     userAnswers[currentStep] = parseInt(sliderInput.value, 10);
//                     updateButtonStyles();
//                 });
//                 optionsContainer.appendChild(sliderWrapper);
//             } else if (Array.isArray(stepData.options)) {
//                 stepData.options.forEach(option => {
//                     const label = document.createElement("label");
//                     label.className = "quiz-option";
//                     let optionText = typeof option === "string" ? option : option.text;
//                     label.classList.add(typeof option === "string" || option.width === "full" ? "full-width" : "half-width");

//                     const input = document.createElement("input");
//                     input.type = stepData.multiSelect ? "checkbox" : "radio";
//                     input.name = "answer";
//                     input.value = optionText;
//                     if (userAnswers[currentStep]?.includes(optionText) || userAnswers[currentStep] === optionText) {
//                         input.checked = true;
//                         label.classList.add("selected");
//                     }
//                     const span = document.createElement("span");
//                     span.textContent = optionText;
//                     label.append(input, span);
//                     optionsContainer.appendChild(label);

//                     label.addEventListener("click", () => {
//                         if (stepData.multiSelect) {
//                             input.checked = !input.checked;
//                             label.classList.toggle("selected", input.checked);
//                             updateSelectedAnswers();
//                         } else {
//                             document.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
//                             input.checked = true;
//                             label.classList.add("selected");
//                             userAnswers[currentStep] = input.value;
//                         }
//                         updateButtonStyles();
//                     });
//                 });
//             }

//             updateCatImage();
//             quizTitle.textContent = stepData.question;
//             if (currentStep < quizData.steps.length - 1) {
//                 document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${quizData.steps.length - 1}`;
//             }
//             toggleLegalCenterVisibility();
//         }
//         updateButtonStyles(); // Вызываем обновление стилей кнопки после каждого шага
//         updateButtonVisibility();
//     }

//     function navigate(direction) {
//         if (direction === 1 && currentStep === 9 && !validateForm()) return;
//         if (!quizData) return;
//         if (direction === -1 && currentStep === 0) return;
//         if (direction === 1 && currentStep >= quizData.steps.length - 1) return;

//         if (direction === 1) saveAnswer();
//         currentStep += direction;
//         loadStep();
//     }

//     function updateButtonStyles() {
//         let hasSelection = false;
//         if (currentStep === 9) {
//             const name = nameInput.value.trim();
//             const phone = phoneInput.value.trim();
//             hasSelection = name !== "" && phone !== "";
//         } else if (currentStep === 5) {
//             const selectedDays = document.querySelectorAll('input[name="answer-day"]:checked').length > 0;
//             const selectedTimes = document.querySelectorAll('input[name="answer-time"]:checked').length > 0;
//             hasSelection = selectedDays || selectedTimes;
//         } else if (currentStep === 7) {
//             const sliderInput = document.querySelector('input[type="range"]');
//             hasSelection = sliderInput && parseInt(sliderInput.value, 10) !== 298;
//         } else if (currentStep === quizData?.steps.length - 1) { // Финальный шаг (нет выбора, кнопка скрыта)
//             hasSelection = false; // Убедимся, что на финальном шаге кнопка не активна
//         } else {
//             const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
//             hasSelection = selectedOptions.length > 0;
//         }

//         if (currentStep === 9) {
//             nextButton.textContent = "Відправити";
//             nextButton.classList.remove("btn-skip", "btn-disabled");
//             nextButton.classList.add(hasSelection ? "btn-active" : "btn-disabled");
//         } else if (hasSelection) {
//             nextButton.textContent = "Продовжити";
//             nextButton.classList.remove("btn-skip", "btn-disabled");
//             nextButton.classList.add("btn-active");
//         } else {
//             nextButton.textContent = "Пропустити питання";
//             nextButton.classList.remove("btn-active");
//             nextButton.classList.add("btn-skip", "btn-disabled");
//         }

//         // Убедимся, что на финальном шаге кнопка скрыта
//         if (currentStep === quizData?.steps.length - 1) {
//             nextButton.style.display = "none";
//             nextButton.classList.remove("btn-active", "btn-skip", "btn-disabled");
//         }
//     }

//     function updateSelectedAnswers() {
//         if (currentStep === 5) {
//             const selectedDays = Array.from(document.querySelectorAll('input[name="answer-day"]:checked')).map(el => el.value);
//             const selectedTimes = Array.from(document.querySelectorAll('input[name="answer-time"]:checked')).map(el => el.value);
//             userAnswers[currentStep] = { days: selectedDays, times: selectedTimes };
//         } else if (currentStep === 7) {
//             const sliderInput = document.querySelector('input[type="range"]');
//             userAnswers[currentStep] = sliderInput ? parseInt(sliderInput.value, 10) : null;
//         } else if (quizData.steps[currentStep].multiSelect) {
//             const selected = document.querySelectorAll('input[name="answer"]:checked');
//             userAnswers[currentStep] = Array.from(selected).map(el => el.value);
//         } else {
//             const selected = document.querySelector('input[name="answer"]:checked');
//             userAnswers[currentStep] = selected ? selected.value : null;
//         }
//     }

//     function saveAnswer() {
//         if (currentStep === 9) {
//             const formData = {
//                 name: nameInput.value.trim(),
//                 phone: iti && iti.isValidNumber() ? iti.getNumber() : phoneInput.value.trim(),
//                 email: emailInput.value.trim()
//             };
//             quizResponses[currentStep] = formData;
//             window.quizResponses = formData;
//             console.log("💾 Данные формы сохранены (подробно):", JSON.stringify(formData, null, 2));
//         } else {
//             updateSelectedAnswers();
//             quizResponses[currentStep] = userAnswers[currentStep];
//             console.log("💾 Данные шага сохранены:", currentStep, quizResponses[currentStep]);
//         }
//     }

//     async function submitQuiz() {
//         try {
//             saveAnswer();
//             const utmParams = getUTMParams(); // Получаем UTM-метки и параметры
//             const referrer = getReferrer(); // Получаем реферер
//             const dataToSend = {
//                 Timestamp: new Date().toISOString(),
//                 ...quizResponses.reduce((acc, val, idx) => ({ ...acc, [`Step${idx + 1}`]: val || "" }), {}),
//                 name: window.quizResponses?.name || "",
//                 phone: window.quizResponses?.phone || "",
//                 email: window.quizResponses?.email || "",
//                 ...utmParams, // Добавляем UTM-метки
//                 referrer: referrer, // Добавляем реферер
//                 gclid: utmParams.gclid || "", // Убедимся, что gclid передаётся
//                 wbraid: utmParams.wbraid || "", // Убедимся, что wbraid передаётся
//                 gbraid: utmParams.gbraid || "" // Убедимся, что gbraid передаётся
//             };
//             console.log("📤 Данные для отправки (подробно):", JSON.stringify(dataToSend, null, 2));

//             const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNRvIKbGRm4Dk3aiee72ioHXX6yKLu-p4O8y8qahDmD6CShAskU9Rzf4LY7qoWCrTj/exec";
//             const response = await fetch(SCRIPT_URL, {
//                 method: "POST",
//                 mode: "no-cors",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(dataToSend)
//             });
//             console.log("✅ Данные отправлены (mode: no-cors, статус не доступен):", response);
//             navigate(1); // Переход на финальную страницу
//         } catch (error) {
//             console.error("❌ Ошибка при отправке (подробно):", error);
//         }
//     }

//     const backArrow = document.querySelector(".image-arrow-left");
//     if (backArrow) {
//         backArrow.addEventListener("click", () => {
//             if (currentStep === 0) {
//                 startPage.style.display = "flex";
//                 quizContainer.classList.add("hidden");
//                 quizHeaderWrapper.classList.add("hidden");
//                 quizContent.classList.add("hidden");
//                 quizCompletion.classList.add("hidden");
//                 document.body.style.overflow = "auto";
//                 document.body.style.height = "auto";
//             } else {
//                 navigate(-1);
//             }
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    let userAnswers = [];
    let quizData = null;
    let quizResponses = new Array(11).fill(null);

    const startPage = document.getElementById("start-page");
    const quizContainer = document.getElementById("quiz-container");
    const quizHeaderWrapper = document.getElementById("quiz-header_wrapper");
    const quizContent = document.getElementById("quiz-content");
    const quizCompletion = document.getElementById("quiz-completion"); // Для проверки, но не будем использовать для рендеринга
    const startElements = document.querySelectorAll("#start-btn, #start-btn2, #start-btn3, #start-btn4");
    const nextButton = document.getElementById("next-btn");
    const prevButton = document.getElementById("prev-btn");
    const nextButton2 = document.getElementById("next-btn2");
    const quizImageContainer = document.getElementById("quiz-image-container");
    const legalModal = document.getElementById("legal-modal");
    const legalBtn = document.getElementById("legal-center-btn");
    const closeModal = document.querySelector(".close-modal");
    const phoneInput = document.getElementById("phone-input");
    const nameInput = document.getElementById("name-input");
    const emailInput = document.getElementById("email-input");

    if (!phoneInput || !nameInput || !emailInput) {
        console.error("❌ Ошибка: Одно из полей ввода не найдено!");
        return;
    }

    // Функция для получения UTM-меток и других параметров из URL
    function getUTMParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {
            utm_source: urlParams.get("utm_source") || "",
            utm_medium: urlParams.get("utm_medium") || "",
            utm_campaign: urlParams.get("utm_campaign") || "",
            utm_term: urlParams.get("utm_term") || "",
            utm_content: urlParams.get("utm_content") || "",
            gclid: urlParams.get("gclid") || "",
            wbraid: urlParams.get("wbraid") || "",
            gbraid: urlParams.get("gbraid") || ""
        };
        console.log("UTM-метки и параметры из URL:", params);
        return params;
    }

    // Функция для получения реферера
    function getReferrer() {
        return document.referrer || "";
    }

    function updateButtonVisibility() {
        const isFinalStep = currentStep === 9;
        if (currentStep === quizData?.steps.length - 1) {
            nextButton.style.display = "none"; // Явно скрываем на финальном шаге
        } else {
            nextButton.style.display = isFinalStep ? "none" : "block";
            nextButton2.style.display = isFinalStep ? "block" : "none";
        }
    }

    function loadIntlTelInput(callback) {
        if (typeof window.intlTelInput === "function") {
            console.log("✅ intlTelInput уже загружен.");
            callback();
            return;
        }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.6/js/intlTelInput.min.js";
        script.onload = () => {
            console.log("✅ intlTelInput загружен с CDN.");
            const utilsScript = document.createElement("script");
            utilsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.6/js/utils.js";
            utilsScript.onload = () => {
                console.log("✅ utils.js загружен с CDN.");
                callback();
            };
            utilsScript.onerror = (e) => console.error("❌ Ошибка загрузки utils.js:", e);
            document.body.appendChild(utilsScript);
        };
        script.onerror = (e) => {
            console.error("❌ Ошибка загрузки intlTelInput.min.js:", e);
            const fallbackScript = document.createElement("script");
            fallbackScript.src = "https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.6/build/js/intlTelInput.min.js";
            fallbackScript.onload = () => {
                console.log("✅ intlTelInput загружен с резервного CDN.");
                const fallbackUtilsScript = document.createElement("script");
                fallbackUtilsScript.src = "https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.6/build/js/utils.js";
                fallbackUtilsScript.onload = () => {
                    console.log("✅ utils.js загружен с резервного CDN.");
                    callback();
                };
                fallbackUtilsScript.onerror = (e) => console.error("❌ Ошибка загрузки резервного utils.js:", e);
                document.body.appendChild(fallbackUtilsScript);
            };
            fallbackScript.onerror = (e) => console.error("❌ Ошибка загрузки резервного intlTelInput.min.js:", e);
            document.body.appendChild(fallbackScript);
        };
        document.body.appendChild(script);
    }

    let iti = null;
    function initializeIntlTelInput() {
        if (!window.intlTelInput || iti) {
            console.log("✅ intlTelInput уже инициализирован или не загружен.");
            return;
        }
        try {
            iti = window.intlTelInput(phoneInput, {
                initialCountry: "ua",
                separateDialCode: true,
                nationalMode: false,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/24.3.6/js/utils.js",
                dropdownContainer: document.body
            });
            console.log("✅ intlTelInput успешно инициализирован:", iti);

            // Динамическая валидация и стилизация инпутов телефона
            phoneInput.addEventListener("input", () => {
                const isValid = iti.isValidNumber();
                const number = iti.getNumber();
                console.log("Телефон:", phoneInput.value, "Полный номер:", number, "Валиден:", isValid);
                
                // Убираем все стили, чтобы начать с чистого состояния
                phoneInput.classList.remove("invalid", "valid");
                
                // Если данные валидны, добавляем класс valid (зелёная обводка)
                if (isValid) {
                    phoneInput.classList.add("valid");
                } 
                // Если данные невалидны, добавляем класс invalid (красная обводка)
                else {
                    phoneInput.classList.add("invalid");
                }
                validateForm();
            });

            phoneInput.addEventListener("countrychange", () => {
                console.log("Страна изменена:", iti.getSelectedCountryData());
                // Проверяем валидацию при смене страны
                const isValid = iti.isValidNumber();
                phoneInput.classList.remove("invalid", "valid");
                if (isValid) {
                    phoneInput.classList.add("valid");
                } else {
                    phoneInput.classList.add("invalid");
                }
                validateForm();
            });

            const flagContainer = phoneInput.closest(".iti").querySelector(".iti__flag-container");
            if (flagContainer) {
                flagContainer.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log("Клик по флагу");
                    iti.openDropdown();
                });
            }
        } catch (error) {
            console.error("❌ Ошибка инициализации intlTelInput:", error);
        }
    }

    loadIntlTelInput(() => {
        initializeIntlTelInput();
    });

    function validateForm() {
        if (currentStep !== 9) return true;
        if (!iti || typeof iti.isValidNumber !== "function") {
            console.error("❌ intlTelInput не готов к валидации! Используем резервную валидацию.");
            const phoneValue = phoneInput.value.trim();
            const phoneValid = /^(\+380)?\d{9}$/.test(phoneValue);
            const nameValid = nameInput.value.trim() !== "";
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
            console.log("Резервная валидация:", { phoneValid, nameValid, emailValid, phoneValue });
            return phoneValid && nameValid && emailValid;
        }
        const phoneValid = iti.isValidNumber();
        const nameValid = nameInput.value.trim() !== "";
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        console.log("Валидация:", { phoneValid, nameValid, emailValid, fullNumber: iti.getNumber() });
        return phoneValid && nameValid && emailValid;
    }

    function clearInvalidStyles() {
        // Убираем классы invalid и valid с всех инпутов при загрузке шага
        phoneInput.classList.remove("invalid", "valid");
        nameInput.classList.remove("invalid");
        emailInput.classList.remove("invalid");
    }

    // Динамическая стилизация для nameInput и emailInput
    function setupDynamicStyling() {
        if (currentStep === 9) {
            // Для nameInput: подсвечиваем красным, если пусто, зелёным, если заполнено
            nameInput.addEventListener("input", () => {
                nameInput.classList.remove("invalid", "valid");
                if (nameInput.value.trim() === "") {
                    nameInput.classList.add("invalid");
                } else {
                    nameInput.classList.add("valid");
                }
            });

            // Для emailInput: подсвечиваем красным, если некорректный, зелёным, если корректный
            emailInput.addEventListener("input", () => {
                emailInput.classList.remove("invalid", "valid");
                const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
                if (!emailValid) {
                    emailInput.classList.add("invalid");
                } else {
                    emailInput.classList.add("valid");
                }
            });
        }
    }

    nextButton2.addEventListener("click", function (event) {
        event.preventDefault();
        const isValid = validateForm();
        console.log("Форма валидна:", isValid);
        if (isValid) {
            saveAnswer();
            submitQuiz();
        } else {
            // Добавляем класс invalid только если данные некорректны или пустые
            phoneInput.classList.remove("valid"); // Убираем valid перед добавлением invalid
            phoneInput.classList.toggle("invalid", !iti || !iti.isValidNumber());
            nameInput.classList.remove("valid"); // Убираем valid перед добавлением invalid
            nameInput.classList.toggle("invalid", nameInput.value.trim() === "");
            emailInput.classList.remove("valid"); // Убираем valid перед добавлением invalid
            emailInput.classList.toggle("invalid", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value));
        }
    });

    function openModal() { legalModal.classList.remove("hidden"); }
    function closeModalWindow() { legalModal.classList.add("hidden"); }
    if (legalBtn) legalBtn.addEventListener("click", openModal);
    if (closeModal) closeModal.addEventListener("click", closeModalWindow);
    window.addEventListener("click", (event) => {
        if (event.target === legalModal) closeModalWindow();
    });

    function toggleLegalCenterVisibility() {
        legalBtn.style.display = currentStep === 9 ? "block" : "none";
    }

    const catImg = new Image();
    catImg.classList.add("quiz-cat");
    catImg.alt = "Quiz Cat";
    catImg.style.display = "none";
    quizImageContainer.appendChild(catImg);

    const preloadImages = [
        "../assets/img/cat-firstPage.png",
        "../assets/img/cat-step1.png",
        "../assets/img/cat-step2.png",
        "../assets/img/cat-step3.png",
        "../assets/img/cat-step4.png",
        "../assets/img/cat-step5.png",
        "../assets/img/cat-step6.png",
        "../assets/img/cat-step7.png",
        "../assets/img/cat-step8.png",
        "../assets/img/cat-step9.png",
        "../assets/img/cat-step10.png",
        "../assets/img/cat-step11.png"
    ];

    catImg.onerror = () => {
        console.error("Ошибка загрузки изображения:", catImg.src);
        catImg.style.display = "none";
    };

    function updateCatImage() {
        const stepIndex = currentStep + 1;
        if (stepIndex >= 0 && stepIndex < preloadImages.length) {
            catImg.src = preloadImages[stepIndex];
            catImg.style.display = "block";
        } else {
            catImg.style.display = "none";
        }
    }

    startElements.forEach(element => {
        element.addEventListener("click", () => {
            if (!quizData) {
                console.error("Ошибка: данные квиза не загружены. Пожалуйста, подождите...");
                alert("Данные квиза еще загружаются. Подождите несколько секунд и попробуйте снова.");
                return;
            }
            startPage.style.display = "none";
            quizContainer.classList.remove("hidden");
            quizHeaderWrapper.classList.remove("hidden");
            quizContent.classList.remove("hidden");
            quizCompletion.classList.add("hidden");
            currentStep = 0;
            catImg.style.display = "block";
            loadStep();
            updateButtonStyles();
        });
    });

    const langFolder = window.location.pathname.includes("/pl") ? "pl" : "ua";
    fetch(`../${langFolder}/locales/quiz.json`)
        .then(response => response.json())
        .then(data => {
            if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
                throw new Error("Ошибка: некорректные данные квиза");
            }
            quizData = data;
            userAnswers = new Array(quizData.steps.length).fill(null);
            console.log("✅ Данные квиза загружены:", quizData);
            loadStep();
            nextButton.addEventListener("click", () => navigate(1));
            prevButton?.addEventListener("click", () => navigate(-1));
        })
        .catch(error => {
            console.error("Ошибка при загрузке данных:", error);
            alert("Не удалось загрузить данные для квиза.");
        });

    function loadStep() {
        if (!quizData || !quizData.steps || !quizData.steps[currentStep]) {
            console.error("Ошибка: шаг не найден", currentStep);
            return;
        }
        const stepData = quizData.steps[currentStep];
        const quizTitle = document.getElementById("quiz-title");
        const optionsContainer = document.getElementById("quiz-options");
        const step10Form = document.getElementById("step10-form");
        const quizCompletion = document.getElementById("quiz-completion");

        quizTitle.style.display = "block";
        optionsContainer.innerHTML = ""; // Очищаем контент перед рендером
        optionsContainer.classList.remove("step-2", "step-6", "step-7", "step-8", "step-9", "step-10");

        quizContainer.classList.remove("hidden"); // Убеждаемся, что контейнер квиза виден
        quizContainer.style.display = "block";
        quizHeaderWrapper.classList.remove("hidden");
        quizHeaderWrapper.style.display = "flex";
        quizCompletion.classList.add("hidden"); // Скрываем финальную статичную страницу
        quizCompletion.style.display = "none";

        if (currentStep === quizData.steps.length - 1) { // Финальный шаг (11-й, индекс 10)
            optionsContainer.classList.remove("hidden"); // Удаляем класс hidden для отображения
            optionsContainer.classList.add("step-completion");
            optionsContainer.style.display = "flex"; // Устанавливаем display: flex для финального контента
            quizTitle.style.display = "none";
            document.querySelector(".quiz-progress").style.display = "none";
            document.querySelector(".image-arrow-left").style.display = "none";
            nextButton.style.display = "none"; // Явно скрываем кнопку next-btn на финальной странице
            nextButton.classList.remove("btn-active", "btn-skip", "btn-disabled"); // Удаляем все классы, чтобы избежать конфликтов
            if (prevButton) prevButton.style.display = "none";

            if (stepData.completion) {
                if (stepData.completion.image) {
                    const image = document.createElement("img");
                    image.src = stepData.completion.image;
                    image.alt = "Completion";
                    image.classList.add("completion-image");
                    optionsContainer.appendChild(image);
                }
                if (stepData.completion.title) {
                    const title = document.createElement("h2");
                    title.textContent = stepData.completion.title;
                    title.classList.add("completion-title");
                    optionsContainer.appendChild(title);
                }
                if (stepData.completion.message) {
                    const message = document.createElement("p");
                    message.textContent = stepData.completion.message;
                    message.classList.add("completion-message");
                    optionsContainer.appendChild(message);
                }
                if (stepData.completion.subtext) {
                    const subtext = document.createElement("p");
                    subtext.textContent = stepData.completion.subtext;
                    subtext.classList.add("completion-subtext");
                    optionsContainer.appendChild(subtext);
                }
            }
            step10Form.classList.remove("visible");
            step10Form.classList.add("hidden");
            step10Form.style.display = "none";
            if (legalBtn) legalBtn.style.display = "none";
        } else {
            document.querySelector(".quiz-progress").style.display = "block";
            document.querySelector(".image-arrow-left").style.display = "block";
            nextButton.style.display = "block"; // Показываем кнопку на всех остальных шагах

            if (currentStep === 9) {
                optionsContainer.classList.add("hidden");
                optionsContainer.style.display = "none";
                step10Form.classList.remove("hidden");
                step10Form.classList.add("visible");
                step10Form.style.display = "block";
                const existingDescription = step10Form.querySelector(".quiz-description-step10");
                if (existingDescription) {
                    existingDescription.remove();
                }
                if (stepData.description) {
                    const description = document.createElement("div");
                    description.className = "quiz-description-step10";
                    description.innerHTML = stepData.description;
                    step10Form.insertBefore(description, step10Form.firstChild);
                }
                // Сбрасываем классы invalid и valid при загрузке шага 10
                clearInvalidStyles();
                // Настраиваем динамическую стилизацию для инпутов
                setupDynamicStyling();
            } else {
                step10Form.classList.remove("visible");
                step10Form.classList.add("hidden");
                step10Form.style.display = "none";
                optionsContainer.classList.remove("hidden");
                optionsContainer.style.display = "flex";
                if (stepData.description) {
                    const description = document.createElement("div");
                    description.className = "quiz-description";
                    if (currentStep === 8) description.classList.add("quiz-description-step9");
                    description.textContent = stepData.description;
                    optionsContainer.appendChild(description);
                }
            }

            if (currentStep === 1) {
                optionsContainer.classList.add("step-2");
                stepData.options.forEach(option => {
                    const label = document.createElement("label");
                    label.className = "quiz-option";
                    let optionText = typeof option === "string" ? option : option.text;
                    label.classList.add(typeof option === "string" || option.width === "full" ? "full-width" : "half-width");

                    const input = document.createElement("input");
                    input.type = stepData.multiSelect ? "checkbox" : "radio";
                    input.name = "answer";
                    input.value = optionText;
                    if (userAnswers[currentStep]?.includes(optionText)) {
                        input.checked = true;
                        label.classList.add("selected");
                    }
                    const span = document.createElement("span");
                    span.textContent = optionText;
                    label.append(input, span);
                    optionsContainer.appendChild(label);

                    label.addEventListener("click", () => {
                        if (stepData.multiSelect) {
                            input.checked = !input.checked;
                            label.classList.toggle("selected", input.checked);
                            updateSelectedAnswers();
                        } else {
                            document.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
                            input.checked = true;
                            label.classList.add("selected");
                            userAnswers[currentStep] = input.value;
                        }
                        updateButtonStyles();
                    });
                });
            } else if (currentStep === 5) {
                optionsContainer.classList.add("step-6");
                const daysGroup = document.createElement("div");
                daysGroup.classList.add("quiz-group", "quiz-days");
                stepData.options.days.forEach(day => {
                    const label = document.createElement("label");
                    label.className = "quiz-option half-width";
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    input.name = "answer-day";
                    input.value = day;
                    const span = document.createElement("span");
                    span.textContent = day;
                    label.append(input, span);
                    daysGroup.appendChild(label);
                    if (userAnswers[currentStep]?.days?.includes(day)) {
                        input.checked = true;
                        label.classList.add("selected");
                    }
                    label.addEventListener("click", () => {
                        input.checked = !input.checked;
                        label.classList.toggle("selected", input.checked);
                        updateSelectedAnswers();
                        updateButtonStyles();
                    });
                });
                optionsContainer.appendChild(daysGroup);

                const timeGroup = document.createElement("div");
                timeGroup.classList.add("quiz-group", "quiz-times");
                stepData.options.times.forEach(time => {
                    const label = document.createElement("label");
                    label.className = "quiz-option full-width";
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    input.name = "answer-time";
                    input.value = time.text;
                    const icon = document.createElement("span");
                    icon.className = "quiz-icon";
                    icon.textContent = time.icon;
                    const span = document.createElement("span");
                    span.textContent = time.text;
                    label.append(input, icon, span);
                    timeGroup.appendChild(label);
                    if (userAnswers[currentStep]?.times?.includes(time.text)) {
                        input.checked = true;
                        label.classList.add("selected");
                    }
                    label.addEventListener("click", () => {
                        input.checked = !input.checked;
                        label.classList.toggle("selected", input.checked);
                        updateSelectedAnswers();
                        updateButtonStyles();
                    });
                });
                optionsContainer.appendChild(timeGroup);
            } else if (currentStep === 7) {
                optionsContainer.classList.add("step-8");
                const sliderWrapper = document.createElement("div");
                sliderWrapper.classList.add("slider-wrapper");
                const sliderLabel = document.createElement("label");
                sliderLabel.textContent = "Ваш бюджет за одне заняття: ";
                sliderWrapper.appendChild(sliderLabel);
                const sliderInput = document.createElement("input");
                sliderInput.type = "range";
                sliderInput.min = "298";
                sliderInput.max = "398";
                sliderInput.step = "2";
                sliderInput.value = userAnswers[currentStep] || "300";
                const valueDisplay = document.createElement("span");
                valueDisplay.classList.add("value-display");
                valueDisplay.textContent = `${sliderInput.value} грн`;
                sliderWrapper.appendChild(sliderInput);
                sliderWrapper.appendChild(valueDisplay);
                sliderInput.addEventListener("input", () => {
                    valueDisplay.textContent = `${sliderInput.value} грн`;
                    userAnswers[currentStep] = parseInt(sliderInput.value, 10);
                    updateButtonStyles();
                });
                optionsContainer.appendChild(sliderWrapper);
            } else if (Array.isArray(stepData.options)) {
                stepData.options.forEach(option => {
                    const label = document.createElement("label");
                    label.className = "quiz-option";
                    let optionText = typeof option === "string" ? option : option.text;
                    label.classList.add(typeof option === "string" || option.width === "full" ? "full-width" : "half-width");

                    const input = document.createElement("input");
                    input.type = stepData.multiSelect ? "checkbox" : "radio";
                    input.name = "answer";
                    input.value = optionText;
                    if (userAnswers[currentStep]?.includes(optionText) || userAnswers[currentStep] === optionText) {
                        input.checked = true;
                        label.classList.add("selected");
                    }
                    const span = document.createElement("span");
                    span.textContent = optionText;
                    label.append(input, span);
                    optionsContainer.appendChild(label);

                    label.addEventListener("click", () => {
                        if (stepData.multiSelect) {
                            input.checked = !input.checked;
                            label.classList.toggle("selected", input.checked);
                            updateSelectedAnswers();
                        } else {
                            document.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
                            input.checked = true;
                            label.classList.add("selected");
                            userAnswers[currentStep] = input.value;
                        }
                        updateButtonStyles();
                    });
                });
            }

            updateCatImage();
            quizTitle.textContent = stepData.question;
            if (currentStep < quizData.steps.length - 1) {
                document.querySelector(".quiz-progress").textContent = `${currentStep + 1} / ${quizData.steps.length - 1}`;
            }
            toggleLegalCenterVisibility();
        }
        updateButtonStyles(); // Вызываем обновление стилей кнопки после каждого шага
        updateButtonVisibility();
    }

    function navigate(direction) {
        if (direction === 1 && currentStep === 9 && !validateForm()) return;
        if (!quizData) return;
        if (direction === -1 && currentStep === 0) return;
        if (direction === 1 && currentStep >= quizData.steps.length - 1) return;

        if (direction === 1) saveAnswer();
        currentStep += direction;
        loadStep();
    }

    function updateButtonStyles() {
        let hasSelection = false;
        if (currentStep === 9) {
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            hasSelection = name !== "" && phone !== "";
        } else if (currentStep === 5) {
            const selectedDays = document.querySelectorAll('input[name="answer-day"]:checked').length > 0;
            const selectedTimes = document.querySelectorAll('input[name="answer-time"]:checked').length > 0;
            hasSelection = selectedDays || selectedTimes;
        } else if (currentStep === 7) {
            const sliderInput = document.querySelector('input[type="range"]');
            hasSelection = sliderInput && parseInt(sliderInput.value, 10) !== 298;
        } else if (currentStep === quizData?.steps.length - 1) { // Финальный шаг (нет выбора, кнопка скрыта)
            hasSelection = false; // Убедимся, что на финальном шаге кнопка не активна
        } else {
            const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
            hasSelection = selectedOptions.length > 0;
        }

        if (currentStep === 9) {
            nextButton.textContent = "Відправити";
            nextButton.classList.remove("btn-skip", "btn-disabled");
            nextButton.classList.add(hasSelection ? "btn-active" : "btn-disabled");
        } else if (hasSelection) {
            nextButton.textContent = "Продовжити";
            nextButton.classList.remove("btn-skip", "btn-disabled");
            nextButton.classList.add("btn-active");
        } else {
            nextButton.textContent = "Пропустити питання";
            nextButton.classList.remove("btn-active");
            nextButton.classList.add("btn-skip", "btn-disabled");
        }

        // Убедимся, что на финальном шаге кнопка скрыта
        if (currentStep === quizData?.steps.length - 1) {
            nextButton.style.display = "none";
            nextButton.classList.remove("btn-active", "btn-skip", "btn-disabled");
        }
    }

    function updateSelectedAnswers() {
        if (currentStep === 5) {
            const selectedDays = Array.from(document.querySelectorAll('input[name="answer-day"]:checked')).map(el => el.value);
            const selectedTimes = Array.from(document.querySelectorAll('input[name="answer-time"]:checked')).map(el => el.value);
            userAnswers[currentStep] = { days: selectedDays, times: selectedTimes };
        } else if (currentStep === 7) {
            const sliderInput = document.querySelector('input[type="range"]');
            userAnswers[currentStep] = sliderInput ? parseInt(sliderInput.value, 10) : null;
        } else if (quizData.steps[currentStep].multiSelect) {
            const selected = document.querySelectorAll('input[name="answer"]:checked');
            userAnswers[currentStep] = Array.from(selected).map(el => el.value);
        } else {
            const selected = document.querySelector('input[name="answer"]:checked');
            userAnswers[currentStep] = selected ? selected.value : null;
        }
    }

    function saveAnswer() {
        if (currentStep === 9) {
            const formData = {
                name: nameInput.value.trim(),
                phone: iti && iti.isValidNumber() ? iti.getNumber() : phoneInput.value.trim(),
                email: emailInput.value.trim()
            };
            quizResponses[currentStep] = formData;
            window.quizResponses = formData;
            console.log("💾 Данные формы сохранены (подробно):", JSON.stringify(formData, null, 2));
        } else {
            updateSelectedAnswers();
            quizResponses[currentStep] = userAnswers[currentStep];
            console.log("💾 Данные шага сохранены:", currentStep, quizResponses[currentStep]);
        }
    }

    async function submitQuiz() {
        try {
            saveAnswer();
            const utmParams = getUTMParams(); // Получаем UTM-метки и параметры
            const referrer = getReferrer(); // Получаем реферер
            const dataToSend = {
                Timestamp: new Date().toISOString(),
                ...quizResponses.reduce((acc, val, idx) => ({ ...acc, [`Step${idx + 1}`]: val || "" }), {}),
                name: window.quizResponses?.name || "",
                phone: window.quizResponses?.phone || "",
                email: window.quizResponses?.email || "",
                ...utmParams, // Добавляем UTM-метки
                referrer: referrer, // Добавляем реферер
                gclid: utmParams.gclid || "", // Убедимся, что gclid передаётся
                wbraid: utmParams.wbraid || "", // Убедимся, что wbraid передаётся
                gbraid: utmParams.gbraid || "" // Убедимся, что gbraid передаётся
            };
            console.log("📤 Данные для отправки (подробно):", JSON.stringify(dataToSend, null, 2));

            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNRvIKbGRm4Dk3aiee72ioHXX6yKLu-p4O8y8qahDmD6CShAskU9Rzf4LY7qoWCrTj/exec";
            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            });
            console.log("✅ Данные отправлены (mode: no-cors, статус не доступен):", response);
            navigate(1); // Переход на финальную страницу
        } catch (error) {
            console.error("❌ Ошибка при отправке (подробно):", error);
        }
    }

    const backArrow = document.querySelector(".image-arrow-left");
    if (backArrow) {
        backArrow.addEventListener("click", () => {
            if (currentStep === 0) {
                startPage.style.display = "flex";
                quizContainer.classList.add("hidden");
                quizHeaderWrapper.classList.add("hidden");
                quizContent.classList.add("hidden");
                quizCompletion.classList.add("hidden");
                document.body.style.overflow = "auto";
                document.body.style.height = "auto";
            } else {
                navigate(-1);
            }
        });
    }
});