const socket = io();
let user;
let chatBox = document.querySelector(".input-text");


Swal.fire({
	title: "Bievenido/a",
	text: "Ingrese su email",
	input: "text",
	inputValidator: (value) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!value.match(regex)) {
			return `Ingresa un email valido.`;
		};
	},
	allowOutsideClick: false,
	allowEscapeKey: false,
}).then((result) => {
	user = result.value;
	socket.emit("user", { user, message: "Se ha unido al chat" });
});


socket.on("messagesDB", (data) => {
	let log = document.querySelector(".chat-message");
	let messages = "";
	data.forEach(message => {
		messages += `<p><strong>${message.user}</strong>: ${message.message}</p>`;
	});
	log.innerHTML = messages;
});


chatBox.addEventListener("keypress", (e) => {
	if (e.key === "Enter" && chatBox.value.trim().length > 0) {
		socket.emit("message", { user, message: chatBox.value });
		chatBox.value = "";
	}
});