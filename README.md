# Whatsapp Detox Mode Client

## Objective

The main purpose of this hobby build was to reduce time to respond to messages that mattered. The client is very bare bones and requires NodeJS (Ideally the latest version, 12.6.3+ at the time of building.)

## To Do

- Add ability to whitelist some chats
- Add blacklist to overrule keywords in certain cases (Prefer blacklist mode)
- Add a Native UI to the product
- Add some form of sound notifications for native experience.
- Add ability to reply to messages
- Build a reminder to reply to mentions (Customizable) (Potentially receive reminders on Telegram at defined time)
- Add a way to detect forwards and ignore. Potentially where forward count > 1

# Requirements

To build and run this app you just need [Node.js](https://nodejs.org/en/) installed.

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
In `mention`, replace the number with your own in "9198xxxxxxxx@c.us" format. This will ensure that mentions are treated distinctly from keywords.

in `type`, select between

- `"CONSOLE"` - Get chats in console (Terminal, Bash, etc.) (Nerd mode)
- `"TELEGRAM"` - Get chats on your Telegram bot chat
- `"NOTIFICATIONS"` - Get native notifications for Windows/Linux/Mac OS

in `whitelist` - Update soon (You can leave it empty right now).

In `telegramConfig` add botKey as given by @botFather and chatId. Google how to get these keys.

chatId is available at (https://api.telegram.org/bot%bot-token%/getUpdates). Send a message to your bot, open the link and replace %bot-token% with your own generated token. The response should give you your chat Id (numerical).

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
npm run prod
```

- For debug and development

```
npm start
```

## VICTORY!!
