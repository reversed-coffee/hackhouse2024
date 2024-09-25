# hackhouse2024

This repository is a parody phishing website that was created for a presentation at the 2024 Hack House event at Tulsa
Technology Center. The presentation is done in person, where me and my team discusses typosquatting attacks and how they 
can be used to steal user data. This repository contains website code and container deployment files to run the website for
the presentation.

## What is typosquatting?

Typosquatting can simply be defined as a malicious action in which an attacker modifies a domain name (like google.com)
with one or more different characters to redirect users to a malicious website. This is a common attack vector used by
phishers to steal user data.

## Why should I care?

It may not seem like a big deal, but typosquatting attacks are a very real threat. Not even for phishing either, but
this could very well be used to do reconnaissance on a target. If you're a business owner, you should be aware of this
attack vector and take steps to prevent it. Sensitve data could be at risk, and it's important to take steps to prevent
this.

## Well, what can I do?

There are a few steps you can take to prevent typosquatting attacks. Here are a few:
- Verify — If you type a link in the search bar, make sure that there is not a typo in it. Using a search engine may be
safer (but watch out for sponsored links and SEO poisoning).
- Bookmark — If you find yourself visiting a certain website often, create a bookmark so you can save time and know
that you’re visiting the correct website.
- Filter — If you come across a link from an untrusted source or an odd link from a trusted source via instnat messaging
or email, ignore the link and report the occurrence if applicable.

For companies and organizations, here are some additional steps you can take:
- Register — Typosquatting takes advantage of mistypes in domain names. Companies can register domains that may be common
targets for typosquatting, such as ‘chqse.com’ for Chase banking.
- Screen — Monitor fraudulent domain registrations using typosquatting finder tools. Block potential typosquatted domains
on your organization’s DNS server.
- Understand — Look into the ACPA (’Anticybersquatting Consumer Protection Act’) and get familiar with how to protect
your domains with it.

## What is the purpose of this repository?

This project is used for demonstrating typosquatting attacks. The code isn't great, but instead of fixing it I instead
took the chance to show bad coding practices and point out insecurities. **The code does not reflect my actual coding
practices in a professional environment, but instead is used for educational purposes.** The website itself sort of
mocks a "rushed" website, which is seen in both unprofessional and malicious websites.

The website here is a great example of what **NOT** to do when developing a secure website. The website itself
features various flaws that are pointed out, additionally with terrible code practices. This is essentially a
joke, but its great to point out flaws and terrible coding practices. The terrible code is just a secondary and
self-teaching opportunity for the audience.

The actual presentation itself is focused on typosquatting attacks, and how they can be used to steal user data. This
repository is an entire ready-to-go phishing parody website that can be used to demonstrate how a typosquatting attack
works - with some modifications, because the code is abhorrent. Maybe I can change that in the future.

The only portion with bad code is the website itself, not the other files. For example, the implementation of the
reverse proxy and Docker follow decent practices. Due to the nature of data being unencrypted between the reverse
proxy and the client, the only way to make this secure is by either modifying it to use SSL or set it up with SDN to
air-gap the container and doing a reverse proxy chain, where the client reverse proxy should be encrypting all
outgoing information. For the presentation, this website was deployed securely by chaining reverse proxies in order
to get SSL to function properly. Additionally, the server runs under two layers of containerization: Docker under
unprivileged LXC.

## Disclaimer

For the people who actually chose to dig into the technical parts of the website, I hope you enjoy the terrible code
practices and various insecurities that I humorously pointed out. Remember, this was all executed in a **controlled
environment** and posed **no threat** to any users.

But, that's the great part about it. It teaches some best practices in programming, and how to avoid common pitfalls
when developing a website. Also, this adds to the authenticity of a true phishing attack, where security flaws are
often seen in websites intending to attack their users due to a lack of professionalism.

This repository is for educational purposes only, and should not be used for malicious intent. I don't know why you
would want to use this for malicious intent, because this source is beyond terrible. But, consider this a warning. Be
ethical and use this resource responsibly.

## How to run

After modifying the code to actually make it work with your own two domains, you can run this website with Docker. Here's
how to do it:

1. Get Docker
2. Run `docker-compose up`
3. Visit `localhost:80`

Pretty simple. An NGINX proxy is used to serve the two domains. Just port forward it or chain it with another reverse
proxy and you'll be all set after setting DNS records to point to your server.

## How to use

Websockets are used to get a live log of user input. To access the live log, visit `/admin.html` on the **rogue** domain.
This will give you a live log of user input, which can be used to steal user data. I don't actually save the data, so
what's live will show up and then disappear when you refresh the page. It's just enough to do a demonstration.

## License

This repository is licensed under the GNU General Public License v3.0. This means that you can use, modify, and
distribute this repository as long as you provide the source code and any modifications under the same license.
