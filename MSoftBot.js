const { Telegraf } = require('telegraf')
const axios = require('axios')
const cron = require('node-cron')
const insults = require('./insults')
const AIMessage = require('./AIBard')
const sendTelegramMessage = require('./TelegramMess')
const fbThaoThao = require('./fb-thao-thao')
const shju01 = require('./shju01')
const handlePrice = require('./TradeBot')

function getDaysUntilTargetDate() {
	const today = new Date() // Ngày hiện tại
	const targetDate = new Date('2025-01-29') // Ngày mục tiêu

	// Tính số ngày còn lại
	const differenceInTime = targetDate - today
	const daysRemaining = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24))

	return daysRemaining > 0 ? daysRemaining : 0 // Đảm bảo không trả giá trị âm
}

function msoftBot() {
	const botToken = '6401844894:AAFE4KoVWzhsduYi49uStCe7FglO58ZZYwc'

	const id_dongbado = '-4085091793'
	const id_chau = '1610803211'

	// - Khánh: 810913292
	// - Sinh: 2062272285
	// - Nguyên: 1354036195
	// - Minh nhỏ: 849343168

	// Khởi tạo một bot với mã token nhận từ BotFather
	const bot = new Telegraf(botToken, {
		telegram: {
			apiRoot: 'https://api.telegram.org'
		}
	})

	// Thay thế 'YOUR_TELEGRAM_BOT_TOKEN' bằng token của bot Telegram của bạn
	const chatId = '-1002128394479' // Thay thế 'YOUR_CHAT_ID' bằng ID của cuộc trò chuyện bạn muốn gửi tin nhắn đến
	const dongBaDo = '-4085091793'

	// Lập lịch gửi tin nhắn vào mỗi 9h sáng
	cron.schedule('0 9 * * *', async () => {
		const AIRes = await AIMessage('Chào buổi sáng bằng một câu ngắn gọn, phong cách mất dạy')
		sendTelegramMessage(dongBaDo, AIRes)
	})

	// Lập lịch gửi tin nhắn vào mỗi ngày lúc 18 giờ
	cron.schedule('0 18 * * *', async () => {
		const AIRes = await AIMessage(`Đã hết giờ làm. Nói 1 câu tạm biệt mọi người ngắn gọn và hài hước, phong cách mất dạy.`)
		sendTelegramMessage(dongBaDo, AIRes)
	})

	// Lập lịch gửi tin nhắn vào mỗi ngày lúc 18 giờ
	cron.schedule('0 12 * * *', async () => {
		const AIRes = await AIMessage('Đã tới giờ đi ăn, gọi mọi người đi ăn bằng 1 câu ngắn gọn, phong cách mất dạy')
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

	bot.command('hinh_be_thao', async (ctx) => {
		ctx.reply('[FBI WARNING] - Con người chứ con gì mà ngắm con người ta quài vậy?')
		return
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

	bot.command('info', async (ctx, xa) => {
		if (ctx.from?.id != id_chau) {
			ctx.reply('[409] - Mày không có quyền sử dụng tính năng này')
			return
		}

		ctx.reply(`👉 User Id: ${ctx.from?.id} \n👉 Group Id: ${ctx.message.chat.id}`)
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

		if (!ctx?.payload) {
			ctx.reply('Cú pháp: /ai <NỘI DUNG CẦN HỎI>')
			return
		}

		try {
			const AIRes = await AIMessage(`Trả lời bằng chữ, ngắn gọn, phong cách mất dạy: ${ctx?.payload}`)
			ctx.reply(AIRes.replace(/\*/g, ''))
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	bot.command('trade', async (ctx) => {
		if (ctx.from?.id != id_chau) {
			ctx.reply('[409] - Mày không có quyền sử dụng tính năng này')
			return
		}

		try {
			const mwg = await axios.request({
				method: 'get',
				maxBodyLength: Infinity,
				url: 'https://api.simplize.vn/api/historical/quote/MWG'
			})

			const vnz = await axios.request({
				method: 'get',
				maxBodyLength: Infinity,
				url: 'https://api.simplize.vn/api/historical/quote/VNZ'
			})

			const vcb = await axios.request({
				method: 'get',
				maxBodyLength: Infinity,
				url: 'https://api.simplize.vn/api/historical/quote/VCB'
			})

			const vnd = await axios.request({
				method: 'get',
				maxBodyLength: Infinity,
				url: 'https://api.simplize.vn/api/historical/quote/VND'
			})

			const mwgData = mwg?.data?.data
			const vnzData = vnz?.data?.data
			const vcbData = vcb?.data?.data
			const vndData = vnd?.data?.data

			const buyData = {
				vnz: 371,
				vcb: 64.7,
				fpt: 119.2,
				vnd: 16.3
			}

			ctx.reply(`
				Báo cáo đại nhân:\n${getRenderItem('MWG', mwgData)}\n${getRenderItem('VNZ', vnzData, buyData.vnz)}\n${getRenderItem(
				'VCB',
				vcbData,
				buyData.vcb
			)}\n${getRenderItem('VND', vndData, buyData.vnd)}
			`)
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	bot.command('vin', async (ctx) => {
		if (ctx.from?.id != id_chau) {
			ctx.reply('[409] - Mày không có quyền sử dụng tính năng này')
			return
		}

		try {
			const vhm = await axios.request({
				method: 'get',
				maxBodyLength: Infinity,
				url: 'https://api.simplize.vn/api/historical/quote/VHM'
			})

			const vic = await axios.request({
				method: 'get',
				maxBodyLength: Infinity,
				url: 'https://api.simplize.vn/api/historical/quote/VIC'
			})

			const vpl = await axios.request({
				method: 'get',
				maxBodyLength: Infinity,
				url: 'https://api.simplize.vn/api/historical/quote/VPL'
			})

			const vhmData = vhm?.data?.data
			const vicData = vic?.data?.data
			const vplData = vpl?.data?.data

			ctx.reply(`
				Nhà VIN hiện tại:\n${getRenderItem('VIC', vicData)}\n${getRenderItem('VHM', vhmData)}\n${getRenderItem('VPL', vplData)}
			`)
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}
	})

	bot.command('price', async (ctx) => {
		handlePrice(ctx)
	})

	// Khởi động bot
	bot.launch()
}

module.exports = msoftBot

function getStatusColor(params) {
	return params?.pctChange < 0 ? '🔴' : '🟢'
}

function calculateProfitOrLoss(buyPrice, sellPrice) {
	console.log('----> buyPrice: ', buyPrice, ' sellPrice: ', sellPrice)

	if (typeof buyPrice !== 'number' || typeof sellPrice !== 'number' || buyPrice <= 0) {
		return ''
	}

	const difference = sellPrice - buyPrice
	const percentage = (difference / buyPrice) * 100

	// Làm tròn đến 2 chữ số thập phân
	const rounded = Math.round(percentage * 100) / 100

	return rounded // số dương nếu lời, số âm nếu lỗ
}

function getRenderItem(code, params, buy = 0) {
	const status = params?.pctChange < 0 ? '' : '+'

	const priceChangePercent = calculateProfitOrLoss(parseFloat(buy), parseFloat(params?.priceClose / 1000).toFixed(1))

	if (buy > 0) {
		return `- ${code}: ${params?.priceClose / 1000} (${status}${parseFloat(params?.pctChange).toFixed(
			1
		)}%) | Tổng: ${priceChangePercent} (${getStatusColor(params)})`
	}
	return `- ${code}: ${params?.priceClose / 1000} (${status}${parseFloat(params?.pctChange).toFixed(1)}%) ${getStatusColor(params)}`
}
