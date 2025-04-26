const receiverEmail = document.getElementById("receiver-email");

const mailTopic = document.getElementById("mail-topic");

const aiResponseContainer = document.getElementById("ai-response-container");

const aiResponse = document.getElementById("ai-response");

const aiResponseSendTo = document.getElementById("ai-response-sendTo");

const aiResponseSubject = document.getElementById("ai-response-subject");

const aiResponseEmail = document.getElementById("ai-response-email");

const aiSuggestion = document.getElementById("email-improvement");

const processStatus = document.getElementById("status");

const socket = io("http://localhost:3000");

const emailRex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

let AIEmailResponse = `{
  "sendTo": "anuragmishrap13@gmail.com",
  "subject": "Leave Application - Unable to come to office due to fever",
  "sendMail": "Dear Boss,\\n\\nI am writing to inform you that I am unable to come to the office today due to a fever. I woke up this morning feeling unwell and don't think I will be able to perform my duties effectively.\\n\\nI will monitor my symptoms and keep you updated on my condition. I will also check my email periodically for any urgent matters.\\n\\nThank you for your understanding.\\n\\nSincerely,\\nYour Name",
  "improvement": "Consider specifying how long you expect to be out of the office, if known, and if you have completed any urgent tasks before your leave."
}`;

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

const isUserAuthorized = getCookie("_Auth");

if (isUserAuthorized === null) {
  window.location.href = "/index.html";
}

async function handleSendRequest(receiverEmail, mailTopic) {
  try {
    const request = await fetch("http://localhost:3000/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sendTo: receiverEmail,
        topic: mailTopic,
      }),
    });

    const response = await request.json();

    aiResponseContainer.style.display = "flex";

    processStatus.innerText =
      "Request accepted successfully ✅. \n Waiting for the response...🫸";

    if (response.success === true) {
      socket.on("ai-response", (msg) => {
        AIEmailResponse = msg;

        processStatus.innerText = "";

        let realJSON = JSON.parse(AIEmailResponse);

        aiResponse.style.display = "block";

        aiSuggestion.style.display = "block";

        aiResponseSendTo.innerText = realJSON.sendTo;

        aiResponseSubject.innerText = realJSON.subject;

        aiResponseEmail.innerText = realJSON.sendMail;

        aiSuggestion.innerText = `Prompt improvement: \n${realJSON.improvement}`;
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
  ("");
  if (mailTopic.value.length < 6) {
    alert("Topic should be 6 or more then 6 letters long 🦥.");
    return;
  }

  await handleSendRequest(receiverEmail.value, mailTopic.value);
}

function handleCloseAIResponseWindow() {
  aiResponseContainer.style.display = "none";
  aiResponse.style.display = "none";
  aiSuggestion.style.display = "none";
}
