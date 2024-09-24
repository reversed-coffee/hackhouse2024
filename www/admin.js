import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const socket = io(`ws://${window.location.hostname}`, { path: "/report/" });

// authenticate
const password = localStorage.getItem("pw") ?? prompt("give me the password");

const waitAuth = new Promise((resolve) => {
    socket.on("adminauth", (val) => {
        if (!val.success) {
            writeLog("admin authentication failed");
            localStorage.removeItem("pw");
            return;
        }
        writeLog("admin authenticated");
        resolve();
    });
});

// fixed race condition
socket.emit("admin", { password });
await waitAuth;

localStorage.setItem("pw", password);

function writeLog(data) {
    document.body.innerHTML += `<p>${data}</p>`;
}

// on log
socket.on("log", (data) => {
    writeLog(data);
});