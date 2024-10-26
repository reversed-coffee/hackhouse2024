# hackhouse2024

A demonstration of typosquatting attacks and their prevention.

As the concerns of cybersecurity increase during Cybersecurity Awareness Month, the Cybersecurity/Forensics class
at Tulsa Technology Center showcases everyday cybersecurity threats and how to prevent them. Several booths were
set up and presented to the general audience, industry partners, and campus students. This repository contains
supplemental information for one of the presentations featured at the event: typosquatting.

My team and I presented a demonstration on typosquatting attacks and how they can be used to steal information. If 
you were unable to attend the event or would like to learn more about typosquatting attacks, check out
[What is Typosquatting?](#what-is-typosquatting). If you would like to learn about the technical aspects of the
demonstration, check out the Technical Details section, starting with the [Attack Flow](#attack-flow).

## Table of Contents

- Presentation
    - [What is Typosquatting?](#what-is-typosquatting)
    - [Interactive Demonstration](#interactive-demonstration)
    - [Prevention](#prevention)
    - [Common Misconceptions](#common-misconceptions)

- Technical Details
    - [Attack Flow](#attack-flow)
    - [Data Collection](#data-collection)
    - [Repository Contents](#repository-contents)
    - [Deployment](#deployment)
    - [Disclaimer](#disclaimer)

## What is Typosquatting?

Typosquatting is a form of cybersquatting where an attacker registers a website that looks similar to a legitimate
website. The attacker hopes that users will mistype the URL of the legitimate website and visit the typosquatted website
instead, or the attacker will try to trick users into overlooking the differences between the legitimate website and the
typosquatted website. The attacker can then use the typosquatted website to do many things, but a common use is to steal
information from users.

For example, an attacker may register "chqse.com" to impersonate "chase.com". If a user mistypes the URL of "chase.com"
and visits "chqse.com", the attacker could show you a fake login page, earn profits off of advertisements, redirect you
to a malicious website, or steal your information. The attacker can also use the typosquatted website to track your
location, device information, and more.

Another example would be "goggle.com" impersonating "google.com". If a user mistypes the URL of "google.com" and visits
"goggle.com", the attacker could show you a fake search engine, maybe show a fake Google login page, or try to earn
profits off of impersonating Google. There are multiple ways that an attacker can use typosquatting to their advantage.

## Interactive Demonstration

The audience was asked to visit a typosquatted bank website shown on the presentation screen. The audience was then
asked to view the presentation screen to see what data was collected by just simply visiting the website. This
consisted of the following:

- The IP address of the connecting device
- The operating system (and sometimes, model name/number) of the connecting device

The audience was then asked to enter a fake username and password into the website. The individuals presenting warned
to not enter any real credentials or sensitive information into the website. As they continued to interact with the
website, the following data was collected and displayed on the presentation screen:

- The username and password entered into the website
- Answers to the security questions asked on the website

The presentation then went on to explain how the data was collected and how the attack was executed. The individuals
presenting explained how the "padlock" icon in the URL bar can be misleading and how to safely verify the legitimacy of
a website, as a padlock indicates the ownership of a website, not the trustworthiness of it. After the demonstration,
the presenting individuals explained ways to prevent typosquatting attacks as an individual and as a company.

## Prevention

- **As an individual**

    - **Do not click on links you are unsure of.**\
        If you are unsure of a link, do not click on it. If you are 90% sure that the link is legitimate, you should still
        avoid it at all costs, because you want to be 100% sure that the link is legitimate. Use common sense when clicking
        on links. Some red flags include urgent messages, unsolicited emails, and messages from unknown senders.

    - **Verify the URL.**\
        Always verify the URL of the website you are visiting. Typosquatting often attempts to catch users that misspell a
        website's name. If you are not sure, use a bookmark or type the URL manually. Triple-check the URL before entering
        any sensitive information into the website.

    - **Use multi-factor authentication.**\
        Multi-factor authentication (MFA or 2FA) can prevent an attacker from accessing your account, even if they have your
        username and password. **We highly discourage using your phone number for MFA**, as if you fell victim to a
        typoquatting attack, an attacker can use your personal information to social engineer your phone provider into
        giving them access to your phone number.

        Here are our recommended methods for MFA:
        - U2F or FIDO (Yubikeys and other hardware security keys)
        - TOTP (Aegis, Google Authenticator, Authy, etc.)
        - WebAuthn or Passkeys (Windows Hello or biometric authentication)

        These 2FA methods are extremely secure and often require physical access to your device to bypass.

    - **Use unique passwords.**\
        If you fell for a typosquatting attack and entered your credentials, the attacker may have access to your username
        and password. If you use the same password for multiple websites, the attacker can use the credentials to access
        other websites. Using unique passwords for each website will prevent an attacker from accessing other websites.

    - **Utilize bookmarks.**\
        Bookmarks can help you access websites quickly and prevent you from mistyping the URL. For example, if you
        frequently visit "chase.com", you can bookmark the website and access it quickly without having to type the URL.
        This completely eliminates the risk of falling for a typosquatting attack when visiting the website.

    - **Use a password manager.**\
        Password managers can generate and store unique passwords for each website. If you ended up on a typosquatted website,
        the password manager would not autofill your credentials. This can prevent you from accidentally entering your
        credentials, but it is not foolproof. You can still manually enter your credentials into the website.

- **As a company**

    - **Train employees on typosquatting attacks.**\
        The two biggest threat vectors for targeted typosquatting attacks are employees and their devices. Train  your
        employees on how to identify typosquatting attacks and how to prevent them. This can prevent employees from
        falling for typosquatting attacks and leaking sensitive information.

    - **Mandate MFA for all employees.**\
        Multi-factor authentication can prevent an attacker from accessing an employee's account, even if they have the
        employee's username and password. Mandate **secure** MFA methods for all employees. We highly discourage using
        SMS or phone calls for MFA due to SIM swapping attacks.

    - **Be proactive, not reactive.**\
        Do not wait for a typosquatting attack to happen before taking action. Start registering common domains that
        may be targets for typosquatting. This can prevent attackers from registering the domains and using them in an
        attack. For example, if your company is "Chase Bank", you should register domains like "chqse.com" and
        "chasebank.com", as these are going to be your biggest targets for typosquatting.

    - **Monitor for typosquatted domains.**\
        There are many free and paid services that can monitor for typosquatted domains. These services can alert you
        when a typosquatted domain is registered that is similar to your domain. This can help you take action against
        the domain before it is used in an attack.

    - **Utilize the ACPA.**\
        The Anticybersquatting Consumer Protection Act is a federal law that protects companies from typosquatting
        attacks. If a domain is registered that is similar to your domain and is used to impersonate your company or
        trademarks, you can take legal action against the domain owner. This can help you take down the domain and
        prevent further attacks.

## Common Misconceptions

1. **I see a green padlock and HTTPS. That must mean the site is secure.**

    This is probably the largest misconception that people have. The attack being done is not an attack on
    confidentiality. **It is an attack on integrity.** The padlock icon indicates that the website is owned by the individual
    or organization that it claims to be owned by. **It does not indicate that the website is trustworthy.** For example, I
    might be able to register 'chqse.com' for Chase Bank and get a padlock icon because I own 'chqse.com', but 'chqse.com'
    is not owned by Chase Bank, 'chase.com' is. The padlock icon also means that data is being encrypted between you and
    the website, but **it does not mean that the website is not malicious.**

    **Resolution:** *The padlock icon in the URL bar (or HTTPS) does not mean that the website is trustworthy.*

1. **VPNs are necessary for online safety**

    This is generally incorrect but not strictly false. **VPNs often build up a false sense of security.** Many VPN
    providers claim that they protect all of your data from being collected by malicious actors, but this is not true.
    These are very vague statements that are not backed up by any evidence. **As long as you have a green padlock in the
    URL bar, your data is already being encrypted between you and the website.** Once the data is encrypted, no one can
    read it except for the website owner. However, **with typosquatting, the website owner is actually the attacker, so
    they can read the data even if the data is encrypted.**

    **Resolution:** *VPNs can offer some protection, but they are not strictly necessary for online safety.*

1. **My browser warns me when I visit malicious websites, so this attack would not work.**

    If this statement was true, the presentation that was given would not have made logical sense. While the browser can
    warn when you visit a malicious website, it does not always catch typosquatted websites. This is because browsers
    block websites from a list of *known* malicious websites. If the website is not on the list, the browser will not
    warn you. **Fresh instances of typosquatted websites that are found in the wild are not likely to be blocked**, as seen
    with our demonstration.

    **Resolution:** *Browsers do not always warn you when you visit typosquatted websites.*

1. **A VPN will prevent an attacker from tracking me if I were to visit this website.**

    While a VPN can help obfuscate your IP address and encrypt any data that is unencrypted between you and the VPN
    server, **it does not protect you from all attacks**. For example, if you are using a VPN and visit a malicious website
    they may see that you're in a different location than you actually are, but **they can still collect the same data
    from the browser that they would if you were not using a VPN** (which can also be used to identify you). Remember,
    any website can see your IP address.

    An IP address is public information that anyone can see, and **it is not a big deal if someone knows your IP address.**
    Many people rumor that IP addresses can track your exact location or that hey can be used to find your home address,
    but this is not true, unless a law enforcement agency has a warrant to get that information from your ISP. The most
    that an attacker can do with your IP address is find what city or region you are located in. **This cannot identify
    you, but it can refine the attacker's targeting.** An attacker could also attempt to attack your network, but most
    residential networks are protected by a firewall that blocks incoming connections.

    **Resolution:** *VPNs can mask your IP address, but your browser leaks enough information to identify your device
    without the need for an IP address.*

1. **Since I use a password manager, I should be safe from this attack.**

    Most cybersecurity professionals recommend using a password manager to generate and store unique passwords for each
    website. **While this is a good practice, it does not protect you from typosquatting attacks.** Password managers do not
    typically check for typosquatting attacks. They will not autofill your credentials on a typosquatted website, but
    that does not stop you from thinking the password manager is buggy and manually entering your credentials.

    **Resolution:** *Password managers are a good practice, but human error can still lead to credential theft.*

1. **Since VPNs encrypt my data, attackers cannot read the data that I send to websites.**

    A VPN can encrypt your information between you and the VPN server, but **it does not encrypt the information between
    the VPN server and the website you are visiting**. This means that if you visit a malicious website, the owner can
    still read the information that you send to them. This would be a requirement for any website to function properly,
    as the website needs to be able to read the information that you send to it.

    **VPNs can protect you in scenarios where you are accessing insecure websites that do not offer SSL/TLS encryption**
    (HTTPS; no padlock), but most websites today offer HTTPS, and **websites that do not support the HTTPS protocol are
    generally flagged as insecure by modern browsers.** If they are not, you can install an extension like HTTPS
    Everywhere to force HTTPS on all websites. However, even with HTTPS, typosquatting would still work because the
    attacker is the owner of the website.

    **Resolution:** *VPNs can encrypt your data, but they do not protect you from typosquatting attacks because the owner
    of the website is the attacker. To ensure that your data is encrypted, use an extension like HTTPS Everywhere to force
    HTTPS on all websites. Using HTTPS will not protect you from typosquatting.*

## Attack Flow

When a user connects to the typosquatted website, their device immediately connects to a websocket server. A websocket
is essentially a channel between the client and server that allows for real-time communication. As a client connects,
the server immediately recognizes the client's IP address, operating system, and sometimes the model name/number of the
device, just from the "User-Agent" header that is sent with the websocket handshake.

As the page progresses, the user is asked to enter a username and password. As the user enters the information, the
code on the client will send the information to the server in real-time. The server will then log the information and
display it on the presentation screen. As there is further interaction with the website, the server will log the answers
to the security questions that have been asked.

## Data Collection

For the demonstration, we kept data collection to a minimum. But, in a real-world scenario, much more information can be
collected. The next following sections will explain some of the information that can be collected and how it can be
used.

Even from the IP address alone, we already have a general idea of the user's location - typically down to the city or
region they are located in. This can be further refined by using the browser's geolocation API to get the user's exact
location. This applies especially for mobile devices, as they have GPS capabilities. Using the geolocation API will
typically prompt the user for permission to access their location, but many users may not think twice before allowing
the website to access their exact location.

If an attacker can get the user's location (especially if it is precise), they can use it to refine their targeting.
For example, if the user is located in a specific city, the attacker may try to use social engineering tactics to
convince the user that they are from a local business or organization. This can make the user more likely to trust the
attacker and give them the information they are inquiring about.

The operating system and device model can be used to determine the user's device. If an attacker has this information,
they may be able to exploit (software or hardware) vulnerabilities that are specific to the user's device. This applies
especially if the attacker gets access to the version of the operating system that the user is running or the version
of the browser that the device is running. An attacker can use this information to potentially escalate their privileges
on the system and gain access to more sensitive information, such as images and documents stored on the device.

A scary thing to note is that the attacker can even access a victim's webcam and microphone! This can be done by using
common web APIs that are built into modern browsers. While these also often prompt the user for permission to access
the webcam and microphone, you'd be surprised how many users will allow access without considering the consequences.

This is just the start of what an attacker can do with the information they collect on a browser. Attackers can collect
information such as the user's screen resolution, active network interfaces (like Wi-Fi and Ethernet connections),
clipboard data (which may hold sensitive information), and more. Furthermore, the attacker can combine this information
to create a unique 'fingerprint' that identifies the user, which can identify the user across multiple websites - even
if they use a VPN!

## Repository Contents

This repository primarily contains the source code for a parody phishing website that was used in the presentation. It
can be used to deploy (most) of what was used to demonstrate the attack. We decided to mock a bank website, as they
can be a target for typosquatting attacks. The fake trademark of this website is "Dash Bank", which is a parody of
"Chase Bank". The domains used for the demonstration were "dashbank.us" (legitimate) and "dashbajk.us" (typosquatted).

Individuals interested in learning the internals of the attack can view the following:
- The code for the frontend of the parody bank website, including extra frontend resources
  for the typosquatted frontend ([www](/www))
- Websocket code for the typosquatted website ([rogue](/rogue))
- Docker Compose files used to deploy the websites
- NGINX configuration files used to serve static content and proxy the websocket server

## Deployment

To deploy the parody phishing website, you will need to have Docker and Docker Compose installed on your system. You can
install them using the information provided from [Docker](https://docs.docker.com/get-started/get-docker/). If you are
deploying this on a headless server, you can simply install Docker Engine from the [official guide](https://docs.docker.com/engine/install/).

Docker was used to make deployment easier and more consistent across different systems. Docker Compose was used to
simplify multi-container deployments. The use of Docker Compose also demonstrates how to deploy containers, which is
a great learning opportunity for people who are learning how to administer servers.

To deploy the parody phishing website, you can follow the steps below:

1. Clone the repository to your system:

    ```bash
    git clone https://github.com/reversed-coffee/hackhouse2024 && cd hackhouse2024
    ```

2. Spin up the Docker containers using Docker Compose:

    ```bash
    docker-compose up -d
    ```

Yes, it's that simple! Your service will be accessible from port 80. However, you will need to modify the server's code,
the client's code, and the NGINX configuration to use your own domain names. This is something I will not cover because
it's a bit more advanced and encourages others to deploy a real typosquatting attack, which is not the goal of this
educational repository.

Additionally, there is no HTTPS support in this repository, and I also did this intentionally. I did a reverse proxy
chain on my own server to serve the parody phishing website over HTTPS to simplify my current setup, but I also left
this out of the repository to further discourage others from deploying a real typosquatting attack. Keeping HTTPS out of
the source also allows for simpler configurations which can be used to teach others how to use NGINX without getting
into more complex configurations.

## Disclaimer

This repository is distributed as-is and is not intended for malicious purposes. Its sole purpose is to demonstrate how
typosquatting attacks can be used to steal information. **Using this source code to develop or deploy malicious phishing
websites is unethical, illegal, and may result in legal action against the responsible individual(s).**

The author disclaims any liability for damages resulting from the use or misuse of this code, including but not limited
to any direct, indirect, incidental, consequential, or punitive damages. Users are responsible for ensuring that their
use of this code complies with all applicable laws and regulations.

This repository is licensed under the GNU General Public License v3.0. Individuals are free to use, modify, and
distribute the source code as long as they comply with the terms of the license.
