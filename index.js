const documentationBtn = document.getElementById("documentationBtn");

const documentation = document.getElementById("create-pass-docs");

const emailInput = document.getElementById("email-input");

const passInput = document.getElementById("pass-input");

const emailError = document.getElementById("email-error");

const passError = document.getElementById("pass-error");

documentationBtn.addEventListener("click", () => {
  documentation.scrollIntoView({ behavior: "smooth" });
});

const emailRex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

function formValidation() {
  let valid = false;

  if (emailInput.value.length == 0 && passInput.value.length == 0) {
    emailError.innerText = "Fill the field*";
    passError.innerText = "Fill the field*";
    const timeOut = setTimeout(() => {
      emailError.innerText = "";
      passError.innerText = "";
      clearTimeout(timeOut);
    }, 3 * 1000);
    return valid;
  }

  if (emailInput.value.match(emailRex) && passInput.value.length === 8) {
    valid = true;
  }

  if (!emailInput.value.match(emailRex)) {
    emailError.innerText = "Invalid email address*";
    const timeOut = setTimeout(() => {
      emailError.innerText = "";
      clearTimeout(timeOut);
    }, 3 * 1000);
  }

  if (passInput.value.length !== 8) {
    let errorMessage = "";

    if (passInput.value.length > 8) {
      errorMessage = "Password is too long*";
    } else if (passInput.value.length < 8) {
      errorMessage = "Password is too Short*";
    }
    passError.innerText = errorMessage;
    const timeOut = setTimeout(() => {
      passError.innerText = "";
      clearTimeout(timeOut);
    }, 3 * 1000);
  }

  return valid;
}

function onFormSubmit(e) {
  e.preventDefault();

  const valid = formValidation();

  if (valid) {
  }
}
