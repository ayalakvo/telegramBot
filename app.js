process.env["NTBA_FIX_319"] = 1
const Telegraf = require('telegraf').Telegraf;
const to = require('./to');
TELEGRAM_TOKEN = "1886574920:AAEGd4S53CObcIsmdu2mrew3sA8IgrX2Ofk"
PASSWORD = "z10mz10m"
const RATES = ['1', '2', '3', '4']
let current = 0
BUTTONS = [
    {
        text: RATES[0],
        callback_data: '1'
    },
    {
        text: RATES[1],
        callback_data: '2'
    },
    {
        text: RATES[2],
        callback_data: '3'
    },
    {
        text: RATES[3],
        callback_data: '4'
    }
]



IMAGES = [
    // './images/bus.jpeg',
    // './images/bus20.jpeg',
    // './images/bus1.jpeg',
    './images/bus2.jpeg',
    './images/bus3.jpeg',
    './images/bus5.jpeg',
    './images/bus6.jpeg',
    './images/bus7.jpeg',
    './images/bus8.jpeg',
    './images/bus15.jpeg',
    './images/bus9.jpeg',
    './images/bus11.jpeg',
    './images/bus12.jpeg',
    './images/bus13.jpeg',
    './images/bus10.jpeg',
    './images/bus14.jpeg',
    './images/bus4.jpeg',
    './images/bus16.jpeg',
    './images/bus17.jpeg',
    './images/bus18.jpeg',
    './images/bus19.jpeg',
    './images/bus21.jpeg',
    './images/bus22.jpeg'
]


const token = TELEGRAM_TOKEN;
if (!token) return
const bot = new Telegraf(token);
bot.launch()
let admin;
const score = {};
const users = [];
const answers = {};
bot.command('start', ctx => {
    users.push(ctx.from.id)
    const user = ctx.from.id
    handleSendPhoto(user)
    console.log('users: ', users);
})
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.hears(PASSWORD, (ctx) => {
    console.log('ctx: ', ctx.update.message.from);
    admin = ctx.update.message.from.id
    console.log('admin: ', admin);
})

//     bot.hears('animals', ctx => {
//         console.log(ctx.from)
//         let animalMessage = `great, here are pictures of animals you would love`;
//         ctx.deleteMessage();
//         bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
//             reply_markup: {
//                 inline_keyboard: [
//                     [{
//                             text: "dog",
//                             callback_data: 'dog'
//                         },
//                         {
//                             text: "cat",
//                             callback_data: 'cat'
//                         }
//                     ],

//                 ]
//             }
//         })


//         bot.action('dog', ctx => {
//             bot.telegram.sendPhoto(ctx.chat.id, {
//                 source: "./images/bus.jpeg"
//             })

//         })

// //         //method that returns image of a cat 

//         bot.action('cat', ctx => {
//             bot.telegram.sendPhoto(ctx.chat.id, {
//                 source: "./images/bus1.jpeg"
//             })

//     })
// })



function handleAnswer(ctx) {
    console.log('CTX!!!: ', ctx.from);
    const answer = ctx.match[0]
    const user = ctx.from.id
    console.log('user: ', typeof user);
    const currAnswers = answers[current]
    if (!currAnswers) {
        console.log('no answers yet');
        return
    }
    userAnswer = answers[current][user]
    if (!userAnswer)
        answers[current][user] = answer
    // console.log('answers: ', answers, 'currAnswers', currAnswers, 'current', current);
    if (user == admin) {
        current++
        // for (i = 0; i < Object.keys(currAnswers); i++) {
        Object.entries(currAnswers).map(user => {
            userId = user[0]
            if (currAnswers[userId] == answer && Number(userId) != admin) {
                if (!score[userId]) {
                    score[userId] = 1

                }
                else score[userId] += 1
            }
            if (current != IMAGES.length)
                handleSendPhoto(Number(userId))
        })
        if (current == IMAGES.length) {
            winner()
        }
        return
    }
    console.log('answers: ', answers);
}

async function handleSendPhoto(user) {
    try {
        console.log('IMAGES[0]: ', IMAGES[0]);
        await bot.telegram.sendPhoto(user, {

            source: IMAGES[current]
        })
        let msg = bot.telegram.sendMessage(user, "Rate the bus: ", {
            reply_markup: {
                inline_keyboard: [ // todo keyboard
                    BUTTONS
                ]
            }
        })

    } catch (error) {
        console.log("error!", error);
    }
}

async function winner() {
    try {
        console.log("score: ", score);
        if (!score || !Object.keys(score)) return
        user = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
        bot.telegram.sendMessage(Number(user), "ניצחת!!! המשימה שלך להקריא בקול את המשפט הבא: המתנה של נעם תגיע באוטובוס מספר 6000 ב-30 ביוני :) אל תדאגי יהיה שווה לחכות ", {
        })
        bot.telegram.sendAnimation(Number(user), "https://media.tenor.com/images/4582ae46f527b52939299fa480823623/tenor.gif")

    } catch (error) {
        console.log("error!", error);
    }
}

bot.action(RATES, ctx => {
    // questionId = ctx.update.callback_query.message.message_id
    if (!answers[current]) answers[current] = {}
    // console.log('CTX: ', ctx.update.callback_query.message.message_id, 'questionId', questionId);
    handleAnswer(ctx)
})
