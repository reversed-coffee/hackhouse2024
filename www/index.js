// Weird hack but what this does is prvents CSS transitions from running on page load
setTimeout(() => document.body.classList.remove("HACK-prevent-page-load-css-transitioning"), 10);

// Dash Bank is a fake bank for demonstration purposes, so we might as well have some fun with it!
const slogans = [
    `Pfft..who needs FDIC? We have ${["IOUs", "cryptocurrency", "useless bonds", "bad stocks"][Math.floor(Math.random() * 4)]}!`,
    `Developed on a ${["potato", "toaster", "smart fridge", "graphing calculator"][Math.floor(Math.random() * 4)]}!`,
    `Think we're legit? You're ${["gullible", "wrong", "misinformed", "delusional"][Math.floor(Math.random() * 4)]}!`,
    `Average transaction time is ${Math.floor(Math.random() * 81) + 120} years!`,
    `Now with negative APY and ${["hidden fees", "profit loss", "crypto backing"][Math.floor(Math.random() * 3)]}!`,
    `Don't expect your ${["money", "savings", "retirement", "inheritance"][Math.floor(Math.random() * 4)]} back!`,
    `Banking for the ${["filthy rich", "dirt poor"][Math.floor(Math.random() * 2)]}.`,
    `We're not a bank, we're a ${["scam", "hoax", "swindle", "ruse"][Math.floor(Math.random() * 4)]}!`,
];

const sel = Math.floor(Math.random() * slogans.length);
document.getElementById("slogan").innerText = `"${slogans[sel]}"`;

// When submit button is pressed, lock out all fields and unhide the security questions
document.getElementById("login").addEventListener("click", async () => {
    // post message
    window.postMessage({ type: "login" }, "*");
    
    // Lock out all fields
    document.getElementById("username").disabled = true;
    document.getElementById("password").disabled = true;
    document.getElementById("login").disabled = true;

    document.getElementById("login").textContent = "loading...";
    await new Promise((resolve) => setTimeout(() => resolve(), Math.floor(Math.random() * 1000) + 1000));

    // fade the login form
    document.getElementById("login-form").classList.add("fade-transparent");
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));

    // Unhide the security questions by fading
    document.getElementById("security-questions").classList.remove("hidden");
    document.getElementById("security-questions").classList.add("fade-opaque");

    // hide the login form
    document.getElementById("login-form").classList.add("hidden");
});

let curQn = 1;
document.getElementById("submit-question").addEventListener("click", async () => {
    document.getElementById("submit-question").disabled = true;
    document.getElementById("submit-question").textContent = "loading...";

    const question = document.getElementById(`security-question-${curQn}`);
    
    // you can tell i just got super lazy and didn't want to write much
    // who cares its just a demo lol its not like it's production code for a company
    window.postMessage({ type: "sq", id: curQn }, "*");
    
    // fade out the current question
    question.classList.add("fade-transparent");
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    question.classList.add("hidden");

    const nextQn = document.getElementById(`security-question-${curQn + 1}`);
    if (nextQn) {
        // fade in the next question
        nextQn.classList.remove("hidden");
        nextQn.classList.add("fade-opaque");
        curQn++;
    }
    else {
        // fade out the security questions
        document.getElementById("security-questions").classList.add("fade-transparent");
        await new Promise((resolve) => setTimeout(() => resolve(), 1000));
        document.getElementById("security-questions").classList.add("hidden");

        // fade the login form back in
        document.getElementById("login-form").classList.remove("hidden");
        document.getElementById("login-form").classList.remove("fade-transparent");
        document.getElementById("login-form").classList.add("fade-opaque");

        // clearly this is a fake site so imma just say invalid haha
        document.getElementById("login").textContent = "Invalid login";

        await new Promise((resolve) => setTimeout(() => resolve(), 1000));
        window.postMessage({ type: "sq-fin" }, "*");
    }

    // reenable the submit button
    document.getElementById("submit-question").disabled = false;
    document.getElementById("submit-question").textContent = "Submit";
});