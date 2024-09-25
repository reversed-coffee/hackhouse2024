// this website is basically the definition of "cybersecurity gone wrong"

// This is a demo, so I'm not going to use SSL here. You can fork it and add SSL if you want to
// use it for some random reason. In my demonstration, this system is sending and receiving data
// through a reverse proxy that is using SSL. Decent for my setup, maybe not for yours.

// that seriousness aside, this was for a cybersecurity presentation. well...i don't care about
// cybersecurity right now. (i do, but not for this demo, also this is behind a reverse proxy)

// also why would i want a site like this to be secured? it's basically a reverse honeypot. 

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
// man i love giving myself more problems by trying to solve them.
const addrCache = new Set();

// Gonna make a session ID map too to tokenize session IDs. They're a little too long
// and they just make a bunch of random crap in the console. i dont want the audience
// to be like 'what does this random word mean' so i'm going to make it a little more
// human-readable.
const sidMap = new Map();

// im not gonna even bother explaining this. i actually forgot what this does.
// nvm i remember now. just read the code its verbatim to its explanation, silly goose.
const authorizedCns: Set<Socket> = new Set();

io.on("connection", (socket) => {
    // wanna run outside of a reverse proxy? cool i think this will make it work
    // no i didnt test it. this is just a fallback in case this header doesnt exist!
    // also that means people can spoof a header to make it look like it came from
    // a reverse proxy and now i can make myself look like i came from 0xdeadbeef (convert that to octets itll make sense)
    // you kow what ill convert it for you: 0xdeadbeef in ip form (octets) -> de.ad.be.ef -> 222.173.190.239, which at this
    // moment either doesnt have anything on the other end of it or it has icmp turned off because all i did was ping it
    // actually i looked it up in a geolocation database and its some random IP address in china? cool i guess...
    // off on a tangent as always! anyways heres some more terible code that i wrote 

    const ipAddr = socket.handshake.headers["x-forwarded-for"] ?? socket.handshake.address;
    const hasConnected = false;//addrCache.has(ipAddr);
    
    // great code right?
    let pseudoSid = sidMap.get(socket.id);
    if (!pseudoSid) {
        pseudoSid = Math.floor(Math.random() * 1000);
        sidMap.set(socket.id, pseudoSid); // set random pseudosid 0-999
    }

    if (!hasConnected) {
        addrCache.add(ipAddr);
        sendLog(`[${pseudoSid}] IP address: ${ipAddr}`);

        // writing this was painful. actually no it wasnt im just dont want to fix it
        const ua = new UAParser(socket.handshake.headers["user-agent"]);
        sendLog(`[${pseudoSid}] Browser: ${ua.getBrowser().name ?? "unknown"} ${ua.getBrowser().version ?? "(unknown version)"}`);
        sendLog(`[${pseudoSid}] OS: ${ua.getOS().name} ${ua.getOS().version ?? "unknown"}`);
        sendLog(`[${pseudoSid}] Device: ${ua.getDevice().vendor ?? "(unknown vendor)"} ${ua.getDevice().model ?? "(unknown model)"}`);
    }

    socket.on("admin", (data) => {
        // I'm not going to bother with a proper authentication system
        if (data.password !== adminPw) { // never do this thats a red cybersec flag
            // well...idc if anyone hacks this its not like they're gonna
            // get much. anyone who puts their true credentials in here is
            // a fool. come on the site is faker than a 3 dollar bill.
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

    // oh now i remember what those weird messages were. sq stands for security question i shouldve known that
    socket.on("sq", (data) => {
        sendLog(`[${pseudoSid}] Security Question: "${data.question}", answered "${data.answer}"`);
    });

    // got that memory leak prevention mentality. you start with developing drivers for windows, the next
    // thing you know you're writing a web server in nodejs that's actually so smart that you don't even
    // need to explicitly clear stuff. well in this scenario im pretty sure you need to do this but i think
    // a weak set/map would work just fine as well. cant be bothered; if you're reading this how about you fix it
    socket.on("disconnect", () => {
        if (!hasConnected)
            sendLog(`[${pseudoSid}] Disconnected.`);
        sidMap.delete(socket.id);
    });
});

// Start the server.
server.listen(80, () => console.log("Server is running on port 80."));

// if you wanna see some actual good code then head over to my little github org called
// Substrant. i actually try to write dev-friendly code there. this is just a joke. i don't
// write code THIS terrible.