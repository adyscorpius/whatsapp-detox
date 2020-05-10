# Whatsapp Detox Mode Client
Whatsapp Detox Mode allows you to severely reduce your Whatsapp Time. With COVID-19's Work From Home, the volume of communication increased tremendously. Being able to stay responsive while maintaining productivity was getting tough. 

The main purpose of this project was to reduce time to respond to important messages. This is a bare bones project built on NodeJS (Ideally the latest version, 12.6.3+ at the time of building). 

# DISCLAIMER & TERMS OF USE
This project will maintain zero telemetry. No logging/analytics of any kind will be sent from your system. To ensure this transparency, the project will remain open source. **Real Trust is Verified**.

I look forward to building this project, however I do not guarantee that it'll continue to work in the future.

# Support
This is a hobby project, and it solved a big need for me. While I cannot guarantee resolution, I'll continue to build and resolve issues as they appear. Feel free to reach out to me on twitter @adyscorpius or mail me on github@aditsharda.com

# Features
- QR Code scanning in terminal (Logs into Whatsapp Web automatically)
- Runs on headless chrome (No window mode)
- Coloured dark terminal mode (Helps separate messages from who sent it.)
- Shows all messages from groups in one place where you are mentioned or keywords exist.
- It won't save the view. if you use Whatsapp Web elsewhere or exit program, window will reset.

# To Do
- Add ability to whitelist some chats
- Allow saving of chats in a local file for later recall into window.
- Add a resume option to reload where it left.
- Add blacklist to overrule keywords in certain cases (Prefer blacklist mode)
- Add a Native UI to the product (Native vs Web based?)
- Add some form of sound notifications for native experience.
- Add ability to reply to messages
- Build a reminder to reply to mentions (Customizable) (Potentially receive reminders on Telegram at defined time)
- Add a way to detect forwards and ignore. Potentially where forward count > 1
- Force Use Here as an option (Required since Whatsapp Web does not work in multiple instances/places)
- Potentially add Whatsapp Web window mode (Use that, in addition to bot). Not sure of memory implications
- Add support for Media when GUI created.

# Requirements
- [Node.js](https://nodejs.org/en/).
- A little bit of time.
- Ability to copy paste commands and create a config.JSON file (Not too tough I hope).
- A Windows/Linux/Mac OS based PC that can run the window.

# Getting started

- Clone the repository

```
git clone --depth=1 https://github.com/adyscorpius/whatsapp-mentions whatsapp-bot
```

- Install dependencies

```
cd whatsapp-bot
npm install
```

Add the following to config.json. Update keywords to include keywords of your choice. You can hundred of keywords. 
In **mention**, replace the number with your own in "9198xxxxxxxx@c.us" format. This will ensure that mentions are treated distinctly from keywords.

in **type**, select between 
  "CONSOLE" - Get chats in console (Terminal, Bash, etc.) (Nerd mode)
  "TELEGRAM" - Get chats on your Telegram bot chat 
  "NOTIFICATIONS" - Get native notifications for Windows/Linux/Mac OS

in **whitelist** .... Not working yet, ignore. 

In **telegramConfig** add botKey as given by @botFather and chatId. Google how to get these keys.

Save the config.json.

```
{
  "keywords": [
    "birthday",
    "congrats",
    "everyone",
    "team",
    "urgent",
    "important"
  ],
  "type": "CONSOLE",
  "mention": "",
  "whitelist": [],
  "telegramConfig": {
    "botKey": "",
    "chatId": ""
  }
}

```

- Start the project

```
npm prod
```

- For debug and development

```
npm start
```

VICTORY! 
