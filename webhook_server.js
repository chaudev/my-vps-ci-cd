const { exec } = require('child_process')
const express = require('express')
const axios = require('axios')
const { env } = require('process')

const app = express()
const port = env.PORT

// Đường dẫn tới thư mục chứa repository
const REPO_PATH_DASH = 'D:/VPS-01/docker/super-dashboad'
const REPO_PATH_SERVER = 'D:/VPS-01/docker/chau-nodejs'

const DOCKER_UPDATE = 'docker-compose build && docker-compose down && docker-compose up -d'
const GIT_PULL_ORIGIN = 'git pull origin main'

app.use(express.json())

// Hàm gửi tin nhắn qua API Telegram
async function sendTelegramMessage(message) {
	const telegramApiUrl = 'https://api.telegram.org/bot6401844894:AAFE4KoVWzhsduYi49uStCe7FglO58ZZYwc/sendMessage'
	const chatId = '1610803211'

	const telegramMessage = {
		chat_id: chatId,
		text: message
	}

	try {
		await axios.post(telegramApiUrl, telegramMessage)
		console.log('Telegram message sent successfully')
	} catch (error) {
		console.error('Failed to send Telegram message:', error)
	}
}

// Hàm chính
async function deploy(req, res) {
	if (req?.body?.ref == 'refs/heads/main' || 'refs/heads/master') {
		let command = ''

		if (req?.body?.repository?.full_name == 'chaudev/super-dashboad') {
			command = `cd ${REPO_PATH_DASH} && ${GIT_PULL_ORIGIN} && ${DOCKER_UPDATE}`
		} else if (req?.body?.repository?.full_name == 'chaudev/ischau-server') {
			command = `cd ${REPO_PATH_SERVER} && ${GIT_PULL_ORIGIN} && ${DOCKER_UPDATE}`
		}

		// Gửi thông báo qua API Telegram
		sendTelegramMessage(`[START] - ${req?.body?.repository?.full_name}: ${command}`)

		exec(command, async (err, stdout, stderr) => {
			if (err) {
				console.error('Error:', err)

				// Gửi thông báo qua API Telegram
				sendTelegramMessage(`[Failed] - ${req?.body?.repository?.full_name}: Kiểm tra lại đi`)

				return res.status(500).send('Something went wrong!')
			} else {
				// Gửi thông báo qua API Telegram
				sendTelegramMessage(`[Done] - ${req?.body?.repository?.full_name}: Đã deploy`)
			}

			console.log('Output:', stdout)
			console.error('Errors:', stderr)

			res.status(200).send('Webhook received and docker-compose executed')
		})
	}
}

app.post('/webhook', (req, res) => {
	// Khi có yêu cầu POST tới /webhook

	if (!req?.body?.repository?.full_name) {
		return res.status(400).send('Does not support this request')
	}

	if (req?.body?.repository?.full_name.includes('chaudev')) {
		return res.status(400).send('Does not support this repository')
	}

	// Gọi hàm deploy để bắt đầu quá trình triển khai
	deploy(req, res)
})

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})
