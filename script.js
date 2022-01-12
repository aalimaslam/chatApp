const socket = io(`https://aalimchats.herokuapp.com:3000`,{ transports : ['websocket'] });
const message = document.getElementById("message");
const container = document.getElementById("message-container")
const form  = document.getElementById("form");

const names = prompt("Enter Your Name", "Unknown");
appendMessage("You Joined!");
socket.emit("names" , names)

form.addEventListener("submit", e=>{
    e.preventDefault();
    let messageValue = message.value;
    appendMessage(`You : ${messageValue}`);
    socket.emit("send-messages",messageValue);
    message.value = ''

})
const locationHost = location.host;
//Handle When You Join The Chat
socket.on('chat-message', data=>{
    appendMessage(`${data.name} : ${data.message}`)
})
socket.on('user-connected', name=>{
    appendMessage(`${name} Connected!`)
})
socket.on('user-disconnected', name=>{
    appendMessage(`${name} Disconnected!`)
})


function appendMessage(message){
    const messageElem = document.createElement("div");
    messageElem.innerText = message;
    container.append(messageElem);
}

