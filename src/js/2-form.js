//Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
// Використовуй метод делегування для відстеження змін у формі через подію input. Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
// При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.
// Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй сповіщення з текстом «Fill please all fields». Якщо всі поля заповнені, виведи у консоль об’єкт formData з актуальними значеннями, очисти локальне сховище, об’єкт formData і поля форми.

const formData = {
    email: "",
    message: ""
}

const localStorageKey = "feedback-form-state";
const savedFormData = localStorage.getItem(localStorageKey);

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', handleInput);
feedbackForm.addEventListener('submit', handleSubmit);


if (savedFormData) {
    const parsedData = JSON.parse(savedFormData);

    formData.email = parsedData.email ?? '';
    formData.message = parsedData.message ?? '';

    feedbackForm.elements.email.value = parsedData.email ?? '';
    feedbackForm.elements.message.value = parsedData.message ?? '';
}

function handleInput() {
    const { email, message } = feedbackForm.elements;

    formData.email = email.value.trim();
    formData.message = message.value.trim();

    localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value;
    const message = form.elements.message.value;

    if (!email || !message) {
        alert('Fill please all fields');
        return
    }
    console.log('formData:', formData);

    localStorage.removeItem(localStorageKey)
    form.reset()

    formData.email = '';
    formData.message = '';

    console.log('formData:', formData);
}
