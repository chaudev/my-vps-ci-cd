const { GoogleGenerativeAI } = require('@google/generative-ai')

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyCz4ZKI77J-MyX1GALoS9RQl-2u1Zjk78U')

async function AIMessage(message) {
	try {
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

		const prompt = message
		const result = await model.generateContent(prompt)
		const response = await result.response
		const text = response.text()

		return text
	} catch (error) {
		return 'Lỗi cmnr, thử lại nha!'
	}
}

module.exports = AIMessage
