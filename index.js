const documentationBtn = document.getElementById("documentationBtn");

const documentation = document.getElementById("create-pass-docs");

const emailInput = document.getElementById("email-input");

const passInput = document.getElementById("pass-input");

const emailError = document.getElementById("email-error");

const passError = document.getElementById("pass-error");

const receiverEmail = document.getElementById("receiver-email");

const mailTopic = document.getElementById("mail-topic");

const aiResponse = document.getElementById("ai-response");

const socket = io("http://localhost:3000");

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

  if (emailInput.value.match(emailRex) && passInput.value.length >= 8) {
    valid = true;
  }

  if (!emailInput.value.match(emailRex)) {
    emailError.innerText = "Invalid email address*";
    const timeOut = setTimeout(() => {
      emailError.innerText = "";
      clearTimeout(timeOut);
    }, 3 * 1000);
  }

  if (passInput.value.length < 8) {
    let errorMessage = "";
    errorMessage = "Password is too Short*";
    passError.innerText = errorMessage;
    const timeOut = setTimeout(() => {
      passError.innerText = "";
      clearTimeout(timeOut);
    }, 3 * 1000);
  }

  return valid;
}

async function onFormSubmit(e) {
  e.preventDefault();

  const valid = formValidation();

  const data = {
    email: emailInput.value,
    password: passInput.value,
  };

  if (valid === true) {
    const request = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const response = await request.json();

    if (response.success === true) {
      window.location.href = "/llm.html";
    } else if (response.error) {
      alert(response.error);
    }
  }
}

async function handleSendRequest(receiverEmail, mailTopic) {
  try {
    aiResponse.innerText = "Sending Request to the server 📤..";
    const request = await fetch("http://localhost:3000/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sendTo: receiverEmail,
        topic: mailTopic,
      }),
    });

    const response = await request.json();

    aiResponse.innerText =
      "Request accepted successfully ✅. \n Waiting for the response...🫸";

    console.log("response", response);

    if (response.success === true) {
      socket.on("ai-response", (msg) => {
        aiResponse.innerText = msg;
        console.log(msg);
      });
    }
  } catch (error) {
    console.log(`Something went wrong ${error}`);
    alert("Something went wrong try again!! 🚀");
  }
}

async function handleValidationAndSendRequest(e) {
  e.preventDefault();

  if (receiverEmail.value.length === 0 || mailTopic.value.length === 0) {
    alert("Fill all the fields");
    return;
  }

  if (!receiverEmail.value.match(emailRex)) {
    alert("Entered email is Invalid 💥.");
    return;
  }

  if (mailTopic.value.length < 6) {
    alert("Topic should be 6 or more then 6 letters long 🦥.");
    return;
  }

  await handleSendRequest(receiverEmail.value, mailTopic.value);
}
