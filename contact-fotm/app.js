// Получаем элементы формы
const form = document.getElementById('form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
const messageInput = document.getElementById('message');
const consentInput = document.getElementById('consent');

let formData = {
  firstName: '',
  lastName: '',
  email: '',
  queryType: '',
  message: '',
  consent: false,
};

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validateName(name) {
  const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
  return nameRegex.test(name);
}

function validateInput(input, minLength = 5, maxLength = 30) {
  const value = input.value.trim();
  
  if (value.length < minLength || value.length > maxLength) {
    return false;
  }
  
  const invalidChars = /[#$%&*()_+=]/;
  if (invalidChars.test(value) && input !== emailInput) {
    return false;
  }
  
  return true;
}

function showError(input, errorMessageId) {
  const errorMessage = document.getElementById(errorMessageId);
  errorMessage.style.display = 'block';
  input.classList.add('error');
}

function hideError(input, errorMessageId) {
  const errorMessage = document.getElementById(errorMessageId);
  errorMessage.style.display = 'none';
  input.classList.remove('error');
}

function updateFormData() {
  formData.firstName = firstNameInput.value.trim();
  formData.lastName = lastNameInput.value.trim();
  formData.email = emailInput.value.trim();
  formData.queryType = Array.from(queryTypeInputs).find(input => input.checked)?.value || '';
  formData.message = messageInput.value.trim();
  formData.consent = consentInput.checked;
}

firstNameInput.addEventListener('change', () => {
  updateFormData();
  hideError(firstNameInput, 'first-name-error');
});

lastNameInput.addEventListener('change', () => {
  updateFormData();
  hideError(lastNameInput, 'last-name-error');
});

emailInput.addEventListener('change', () => {
  updateFormData();
  hideError(emailInput, 'no-email-error');
  hideError(emailInput, 'invalid-email-error');
});

queryTypeInputs.forEach(input => {
  input.addEventListener('change', () => {
    updateFormData();
    hideError(document.querySelector('.query-type'), 'query-error');
  });
});

messageInput.addEventListener('change', () => {
  updateFormData();
  hideError(messageInput, 'message-error');
});

consentInput.addEventListener('change', () => {
  updateFormData();
  hideError(consentInput, 'consent-error');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;
  
  if (!validateInput(firstNameInput) || !validateName(firstNameInput.value.trim())) {
    showError(firstNameInput, 'first-name-error');
    isValid = false;
  }

  if (!validateInput(lastNameInput) || !validateName(lastNameInput.value.trim())) {
    showError(lastNameInput, 'last-name-error');
    isValid = false;
  }

  if (!validateEmail(emailInput.value.trim())) {
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'no-email-error');
    } else {
      showError(emailInput, 'invalid-email-error');
    }
    isValid = false;
  }

  if (!formData.queryType) {
    showError(document.querySelector('.query-type'), 'query-error');
    isValid = false;
  }

  if (!validateInput(messageInput)) {
    showError(messageInput, 'message-error');
    isValid = false;
  }

  if (!formData.consent) {
    showError(consentInput, 'consent-error');
    isValid = false;
  }

  if (isValid) {
    console.log(formData);
  }
});
