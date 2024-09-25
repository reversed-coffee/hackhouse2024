// man i actually feel so bad for repeating document.getElementById on the same ID without
// doing any caching or anything. reading this code is like squeezing lemon juice into my eyes

// Weird hack but what this does is prvents CSS transitions from running on page load
// gotta love these random hacks that save me from writing more code
setTimeout(() => document.body.classList.remove("HACK-prevent-page-load-css-transitioning"), 10);

// Dash Bank is a fake bank for demonstration purposes, so we might as well have some fun with it!
// idk what the chances are of getting the same thing here, but if you're reading this how about you calculate it and
// make a pull request with the answer lol

// this is terribly inefficient. let's make 20 random calls that are all synchronous and block the main thread, then only use
// one of them. I'm a freaking genius. Best code you've ever seen. /s
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

// as you can tell, the code gets a little more sane here
const sel = Math.floor(Math.random() * slogans.length);
document.getElementById("slogan").innerText = `"${slogans[sel]}"`;

// ...and then it gets worse again
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
    // the fact im deliberately choosing to not cache here and just laugh at my own code is
    // instead of fixing it is a testament to my sleep-deprived state
    document.getElementById("security-questions").classList.remove("hidden");
    document.getElementById("security-questions").classList.add("fade-opaque");

    // hide the login form
    document.getElementById("login-form").classList.add("hidden");

    // well hey, all the 'real' phishing sites also were coded TERRIBLY, so i guess this makes it
    // somewhat authentic and more realistic phishing attempt? lol
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
    await new Promise((resolve) => setTimeout(() => resolve(), 1000)); // never understood why js didnt come with a sleep function
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
        window.postMessage({ type: "sq-fin" }, "*"); // i was gonna comment to explain this but i forgot what it does lol

        // wait 5 seconds before redirecting to the real site, or just refreshing if we're already on the real site
        await new Promise((resolve) => setTimeout(() => resolve(), 5000));

        // redirect to dashbank.us the real site on both cases because lazy
        window.location.href = window.location.protocol + "//dashbank.us";
    }

    // reenable the submit button
    document.getElementById("submit-question").disabled = false;
    document.getElementById("submit-question").textContent = "Submit";
});