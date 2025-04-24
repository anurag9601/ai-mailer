const receiverEmail = document.getElementById("receiver-email") as HTMLInputElement;

const mailTopic = document.getElementById("mail-topic") as HTMLInputElement;

const emailRex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

async function handleSendRequest(receiverEmail: string, mailTopic: string) {
    try {
        const request = await fetch("http://localhost:3000/api/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sendTo: receiverEmail,
                topic: mailTopic
            })
        });

        const response = await request.json();

        console.log("respose", response);

    } catch (error) {
        console.log(`Something went wrong ${error}`);
        alert("Something went wrong try again!! 🚀");
    }
}

async function handleValidationAndSendRequest(e: FormDataEvent) {
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