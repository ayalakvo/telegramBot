process.env["NTBA_FIX_319"] = 1
const TelegramBot = require('node-telegram-bot-api');
const Telegraf = require('telegraf').Telegraf;
const to = require('./to');
const PLEASE_CLICK_BTN = "אנא לחץ על כפתור";
TELEGRAM_TOKEN = "1886574920:AAEGd4S53CObcIsmdu2mrew3sA8IgrX2Ofk"
BUTTONS = [
    {
        "text": "A",
        "callback_data": "A1"
    },
    {
        "text": "B",
        "callback_data": "C1"
    }]




function addBotListeners() {
    console.log("HERE");
    const token = TELEGRAM_TOKEN;
    if (!token) return
    // bot = new TelegramBot(token, { polling: true });
    const bot = new Telegraf(token);
    bot.launch()
    bot.command('start', ctx => {
        console.log("started!!");
        console.log(ctx.from)
        bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
        })
    })
    bot.help((ctx) => ctx.reply('Send me a sticker'))
    bot.on('sticker', (ctx) => ctx.reply('👍'))
    bot.hears('hi', (ctx) => ctx.reply('Hey there'))

    bot.hears('animals', ctx => {
        console.log(ctx.from)
        let animalMessage = `great, here are pictures of animals you would love`;
        ctx.deleteMessage();
        bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: "dog",
                            callback_data: 'dog'
                        },
                        {
                            text: "cat",
                            callback_data: 'cat'
                        }
                    ],
    
                ]
            }
        })


        bot.action('dog', ctx => {
            bot.telegram.sendPhoto(ctx.chat.id, {
                source: "./images/bus.jpeg"
            })
        
        })
        
        //method that returns image of a cat 
        
        bot.action('cat', ctx => {
            bot.telegram.sendPhoto(ctx.chat.id, {
                source: "./images/bus1.jpeg"
            })
        
    })
})
}


addBotListeners()


//     bot.on('polling_error', error => console.log("there is a problem!!!!", error))
//     bot.on('message', async (msg) => {
//         console.log("I GOT A MSG", msg)
//         if(msg.text == '/start') {
//             sendDialogMsg(msg.from.id, "HELLO THERE! :)", BUTTONS)
//         }
//         // let [errInFetch, isNewUser] = await to(app.models.doners.logIn(JSON.stringify(msg.chat.id), msg.text));
//         // if (errInFetch) {
//         //   console.log("err in fetch", errInFetch);
//         // }

//         // if (isNewUser.res === 0) {
//         //   let [ansErr, saveAnswer] = await to(app.models.dialogs.saveAnswer(JSON.stringify(msg.chat.id), msg.text));
//         //   if (ansErr) console.log("ans error", ansErr);
//         //   if (!saveAnswer.ok) return;
//         //   if (saveAnswer.res.feadback != null) {
//         //     let options = {
//         //       reply_markup: JSON.stringify({
//         //         // resize_keyboard: false,
//         //         // one_time_keyboard: true,
//         //         force_reply: false,
//         //         selective: true,
//         //         // hide_keyboard: true,
//         //       })
//         //     };
//         //     if (saveAnswer.res.feadback !== PLEASE_CLICK_BTN) {
//         //       options.reply_markup = JSON.stringify({
//         //         resize_keyboard: false,
//         //         one_time_keyboard: true,
//         //         force_reply: false,
//         //         selective: true,
//         //         hide_keyboard: true,
//         //       })
//         //     }
//         //     bot.sendMessage(msg.chat.id, saveAnswer.res.feadback, options);
//         //     let contactMessage = saveAnswer.res.contactMessage;
//         //     if (contactMessage && contactMessage.contactIdTelegram) {
//         //       bot.sendMessage(contactMessage.contactIdTelegram,
//         //         `התקבלה תשובה קריטית במערכת\n<b>השאלה:</b> ${contactMessage.messageText}\n<b>התשובה:</b> ${contactMessage.text}\n<b>מאת:</b> ${contactMessage.name}\n<b>טלפון:</b> ${contactMessage.phone}`, { parse_mode: 'HTML' })
//         //     }
//         //   }
//         // }
//         //     else {
//         //       console.log(isNewUser)
//         //       const [sendErr, sent] = await to(bot.sendMessage(msg.chat.id, isNewUser.res));
//         //       if (sendErr) {
//         //         console.log("err telegram", sendErr);
//         //       }
//         //       console.log("semt", sent)


//         //     }
//     });

// }
// const sendDialogMsg = async (userId, messageText, buttons) => {
//   let options = {
//     // parse_mode: "Markdown",
//     disable_web_page_preview: true,
//     reply_markup: JSON.stringify({
//       remove_keyboard: true
//     })
//   };

//   if (buttons && buttons.length > 0) {
//     options.reply_markup = JSON.stringify({
//       keyboard:
//         [buttons]
//     });
//   };

//   console.log("chat id", userId);
//   console.log("messageText", messageText);
//   const [sendErr, sent] = await to(bot.sendMessage(userId, messageText, options));

//   if (sendErr) {
//     console.log("send errorrr!!!", sendErr);
//     return [sendErr];
//   }
//   return [null, sent];
// };

// addBotListeners()
// module.exports = { addBotListeners };