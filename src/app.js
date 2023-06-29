import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);


const httpServer = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = new Server(httpServer);

const messages = [] //Almaceno los mensajes en este arreglo.
io.on('connection', socket =>{
    console.log("Nuevo cliente conectado")
    io.emit("messageLogs", messages)

    socket.on('message',data => {//nota como escucha al evento con el mismo nombre que el emit del cliente: "messages".
        messages.push(data)//Guardo el objeto en la "base".
        io.emit("messageLogs", messages)//Reenvio instantáneamente los logs actualizados.
    })

})