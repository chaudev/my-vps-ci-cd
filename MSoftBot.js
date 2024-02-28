const { Telegraf } = require('telegraf')
const cron = require('node-cron')
const insults = require('./insults')
const AIMessage = require('./AIBard')
const sendTelegramMessage = require('./TelegramMess')

function msoftBot() {
	const botToken = '6401844894:AAFE4KoVWzhsduYi49uStCe7FglO58ZZYwc'

	// Khởi tạo một bot với mã token nhận từ BotFather
	const bot = new Telegraf(botToken)

	// Thay thế 'YOUR_TELEGRAM_BOT_TOKEN' bằng token của bot Telegram của bạn
	const chatId = '-1002128394479' // Thay thế 'YOUR_CHAT_ID' bằng ID của cuộc trò chuyện bạn muốn gửi tin nhắn đến
	const dongBaDo = '-4085091793'

	// Lập lịch gửi tin nhắn vào mỗi 9h sáng
	cron.schedule('0 9 * * *', async () => {
		const AIRes = await AIMessage('Chào buổi sáng bằng một câu ngắn gọn và hài hước!')
		sendTelegramMessage(dongBaDo, AIRes)
	})

	// Lập lịch gửi tin nhắn vào mỗi ngày lúc 18 giờ
	cron.schedule('0 18 * * *', async () => {
		const AIRes = await AIMessage('1 câu tạm biệt mọi người ngắn gọn và hài hước sau giờ làm')
		sendTelegramMessage(dongBaDo, AIRes)
	})

	// Lập lịch gửi tin nhắn vào mỗi ngày lúc 18 giờ
	cron.schedule('0 12 * * *', async () => {
		const AIRes = await AIMessage('Đã tới giờ đi ăn, gọi mọi người đi ăn bằng 1 câu ngắn gọn')
		sendTelegramMessage(dongBaDo, AIRes)
	})

	// Chào bạn
	bot.command('chao', async (ctx) => {
		try {
			const AIRes = await AIMessage('Chào bằng một câu ngắn gọn và hài hước!')
			ctx.reply(AIRes)
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	// Chửi bạn
	bot.command('chui', async (ctx) => {
		try {
			const randomIndex = Math.floor(Math.random() * insults.length)
			const randomGreeting = insults[randomIndex]
			ctx.reply(randomGreeting)
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	// Một câu chuyện hài
	bot.command('joke', async (ctx) => {
		try {
			const AIRes = await AIMessage('Kể một câu chuyện cười khoảng 3 câu')
			ctx.reply(AIRes)
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	// Một câu chuyện buồn
	bot.command('sad', async (ctx) => {
		try {
			const AIRes = await AIMessage('Kể một câu chuyện buồn khoảng 3 câu')
			ctx.reply(AIRes)
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	// Chửi bạn
	bot.command('ai', async (ctx) => {
		if (!ctx?.payload) {
			ctx.reply('Cú pháp: /ai <NỘI DUNG CẦN HỎI>')
			return
		}

		try {
			const AIRes = await AIMessage(`Trả lời ngắn gọn về: ${ctx?.payload}`)
			ctx.reply(AIRes)
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	// Khởi động bot
	bot.launch()
}

module.exports = msoftBot
