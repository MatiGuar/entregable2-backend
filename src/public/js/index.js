const socket = io();
let user 
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title:"¡Hola! <br>Esto es un chat hecho con Websocket.<br> Ingresá tu nombre para continuar.",
    input: "text",
    text: "Nombre de usuario",
    inputValidator: (value) => {
        return !value && '¡Para continuar necesitas ingresar un nombre de usuario!'
    },
    allowOutsideClick: false,
}).then((result) => {
    user = result.value
})

chatBox.addEventListener('keyup', (event) => {
    if(event.key === "Enter"){//el mensaje se enviará cuando el usuario apriete "enter" en la caja de chat.
        if(chatBox.value.trim().length>0){//corrobora que el msj no esté vacío o sólo contenga espacios.
            socket.emit("message",{user, message:chatBox.value})//emitimos nuestro primer evento.
            chatBox.value=""//vacia la caja luego de enviar el mensaje.
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs')
    let messages = ""
    data.forEach((message) => {
        messages = messages+`<strong>${message.user}</strong>: ${message.message} <br>`
    })
    log.innerHTML = messages
})