const { exec } = require('child_process')
const express = require('express')
const axios = require('axios')
const { Telegraf } = require('telegraf')
// const TelegramBot = require('node-telegram-bot-api')
const cron = require('node-cron')

const { env } = require('process')

const msoftBot = require('./MSoftBot')
const sendTelegramMessage = require('./TelegramMess')

const app = express()
const port = env.PORT || 4002

// Đường dẫn tới thư mục chứa repository
const REPO_PATH_DASH = 'D:/VPS-01/docker/super-dashboad'
const REPO_PATH_SERVER = 'D:/VPS-01/docker/chau-nodejs'

const DOCKER_UPDATE = 'docker-compose build && docker-compose down && docker-compose up -d'
const GIT_PULL_ORIGIN = 'git pull origin main'

app.use(express.json())

msoftBot()

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
		sendTelegramMessage('1610803211', `[START] - ${req?.body?.repository?.full_name}: ${command}`)

		exec(command, async (err, stdout, stderr) => {
			if (err) {
				console.error('Error:', err)

				// Gửi thông báo qua API Telegram
				sendTelegramMessage('1610803211', `[Failed] - ${req?.body?.repository?.full_name}: Kiểm tra lại đi`)

				return res.status(500).send('Something went wrong!')
			} else {
				// Gửi thông báo qua API Telegram
				sendTelegramMessage('1610803211', `[Done] - ${req?.body?.repository?.full_name}: Đã deploy`)
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

app.get('/', (req, res) => res.send('Express on Vercel'))

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})
