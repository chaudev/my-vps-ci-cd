const { Telegraf } = require('telegraf')
const cron = require('node-cron')
const insults = require('./insults')
const AIMessage = require('./AIBard')
const sendTelegramMessage = require('./TelegramMess')
const fbThaoThao = require('./fb-thao-thao')
const shju01 = require('./shju01')

function msoftBot() {
	const botToken = '6401844894:AAFE4KoVWzhsduYi49uStCe7FglO58ZZYwc'

	const id_dongbado = '-4085091793'
	const id_chau = '1610803211'

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

	function randomNumber(max) {
		return Math.floor(Math.random() * max) + 1
	}

	bot.command('hinh-be-thao', async (ctx) => {
		if (ctx.message.chat.id != id_chau) {
			ctx.reply('[FBI WARNING] - Con người chứ con gì mà ngắm con người ta quài vậy?')
			return
		}
		try {
			const hinhBeThao = fbThaoThao
			ctx.replyWithPhoto({ url: hinhBeThao[randomNumber(450)] })
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	bot.command('vitamin', async (ctx, xa) => {
		console.log('---- Nguoi yeu cau: ', ctx.from)

		if (ctx.message.chat.id !== id_dongbado && ctx.message.chat.id !== '-1002128394479') {
			ctx.reply('[FBI WARNING] - Bạn đang truy cập trái phép')
			return
		}

		try {
			const shju01s = shju01
			ctx.replyWithPhoto({ url: shju01s[randomNumber(1580)] })
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
			ctx.reply(AIRes.replace(/\*/g, ''))
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	// Một câu chuyện buồn
	bot.command('sad', async (ctx) => {
		try {
			const AIRes = await AIMessage('Kể một câu chuyện buồn khoảng 3 câu')
			ctx.reply(AIRes.replace(/\*/g, ''))
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	bot.command('ai', async (ctx) => {
		console.log('---- Nguoi yeu cau: ', ctx.from)

		if (ctx.message.chat.id !== id_dongbado && ctx.message.chat.id !== id_chau && ctx.message.chat.id != '-1002128394479') {
			ctx.reply('[FBI WARNING] - Bạn đang truy cập trái phép')
			return
		}

		if (!ctx?.payload) {
			ctx.reply('Cú pháp: /ai <NỘI DUNG CẦN HỎI>')
			return
		}

		if (ctx?.payload.toLowerCase().includes('lấy đồ ăn') || ctx?.payload.toLowerCase().includes('lay do an')) {
			ctx.reply('Minh nhỏ')
			return
		}

		try {
			const AIRes = await AIMessage(`Trả lời ngắn gọn bằng chữ: ${ctx?.payload}`)
			ctx.reply(AIRes.replace(/\*/g, ''))
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	// Khởi động bot
	bot.launch()
}

module.exports = msoftBot
