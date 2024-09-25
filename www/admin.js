import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

// you know, writing this from a windows VDI with some latency and having to redeploy docker containers
// on proxmox every time i wanted to test anything on my phone has been an absolutely terrible
// experience and i wish i would have opted for a cleaner solution...

const socketProto = window.location.protocol === "https:" ? "wss" : "ws";
const socket = io(`${socketProto}://${window.location.hostname}`, { path: "/report/" });

// authenticate
const password = localStorage.getItem("pw") ?? prompt("give me the password");

const waitAuth = new Promise((resolve) => {
    // not gonna timeout just check inspect element to see if your reverse proxy is broken
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

// i dont even know how i came up with this code pattern but its somehow foolproof
// yet very ugly and i hate it

// security: 0,
// but wait, risk: 0
// so i guess it's a win-win right?
localStorage.setItem("pw", password);

// oh this is great, a one liner! man what a great achievement i have made
// this stuff should be put in the history books
function writeLog(data) {
    document.body.innerHTML += `<p>${data}</p>`;
}

// on log
socket.on("log", (data) => {
    writeLog(data);
});