const axios = require('axios')

// Hàm gửi tin nhắn qua API Telegram
async function sendTelegramMessage(chatId, message) {
	const telegramApiUrl = 'https://api.telegram.org/bot6401844894:AAFE4KoVWzhsduYi49uStCe7FglO58ZZYwc/sendMessage'

	const telegramMessage = {
		chat_id: chatId,
		text: message
	}

	try {
		await axios.post(telegramApiUrl, telegramMessage)
	} catch (error) {
		console.error('Failed to send Telegram message:', error)
	}
}

module.exports = sendTelegramMessage
