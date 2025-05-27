const { default: axios } = require('axios')
const AIMessage = require('./AIBard')

function getColor(params) {
	return params?.pctChange < 0 ? '🔴' : '🟢'
}

function getRenderItem(code, params) {
	const status = params?.pctChange < 0 ? '' : '+'
	return `- ${code}: ${params?.priceClose / 1000} (${status}${parseFloat(params?.pctChange).toFixed(1)}%) ${getStatusColor(params)}`
}

function formatStockData(stock) {
	return `
- Giá hiện tại: ${stock.priceClose.toLocaleString()} VND
- Giá khởi điểm: ${stock.priceOpen.toLocaleString()} VND
- Giá thấp nhất: ${stock.priceLow.toLocaleString()} VND
- Giá cao nhất: ${stock.priceHigh.toLocaleString()} VND
- Giá sàn: ${stock.priceFloor.toLocaleString()} VND
- Giá trần: ${stock.priceCeiling.toLocaleString()} VND
- Giá tham chiếu: ${stock.priceReference.toLocaleString()} VND
- Giá trung bình: ${stock.priceAverage.toFixed(2).toLocaleString()} VND
- Biến động: ${stock.netChange >= 0 ? '+' : ''}${stock.netChange.toLocaleString()} VND (${stock.pctChange.toFixed(2)}%)

- Tổng khối lượng giao dịch: ${stock.totalVolume.toLocaleString()} cổ phiếu
- Tổng giá trị giao dịch: ${stock.totalValue.toLocaleString()} VND

- Tổng mua: ${stock.totalBuyVolume.toLocaleString()} | Tổng bán: ${stock.totalSellVolume.toLocaleString()}
- Khối lượng mua nước ngoài: ${stock.buyForeignQuantity.toLocaleString()} | Giá trị: ${stock.buyForeignValue.toLocaleString()} VND
- Khối lượng bán nước ngoài: ${stock.sellForeignQuantity.toLocaleString()} | Giá trị: ${stock.sellForeignValue.toLocaleString()} VND

- Đặt mua:
  + Giá 1: ${stock.priceBid1.toLocaleString()} - KL: ${stock.quantityBid1.toLocaleString()}
  + Giá 2: ${stock.priceBid2.toLocaleString()} - KL: ${stock.quantityBid2.toLocaleString()}
  + Giá 3: ${stock.priceBid3.toLocaleString()} - KL: ${stock.quantityBid3.toLocaleString()}
- Đặt bán:
  + Giá 1: ${stock.priceAsk1.toLocaleString()} - KL: ${stock.quantityAsk1.toLocaleString()}
  + Giá 2: ${stock.priceAsk2.toLocaleString()} - KL: ${stock.quantityAsk2.toLocaleString()}
  + Giá 3: ${stock.priceAsk3.toLocaleString()} - KL: ${stock.quantityAsk3.toLocaleString()}
`.trim()
}

function reverseArray(arr) {
	return arr.slice().reverse()
}

function getClosingPricesText(data) {
	let res = ''

	let temp = reverseArray(data)

	temp.forEach((element, index) => {
		const dateStr = index == 0 ? 'hiện tại' : `${index} ngày trước`
		res = res + `${index > 0 ? ', ' : ''}${dateStr} là ${element[4]}`
	})

	// data là mảng 30 ngày, mỗi ngày có 5 phần tử theo giờ
	return res
}

const numberToPrice = (price) => {
	if (!price) {
		return 0
	}
	price += ''
	let x = price.split('.')
	let x1 = x[0]
	let x2 = x.length > 1 ? '.' + x[1] : ''
	let rgx = /(\d+)(\d{3})/
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2')
	}
	return x1 + x2
}

async function handlePrice(ctx) {
	if (!ctx?.payload) {
		ctx.reply('Không biết sài thì đừng phá')
	}

	ctx.reply('Tao đang xử lý, chờ xíu...')

	try {
		const res = await axios.request({
			method: 'get',
			maxBodyLength: Infinity,
			url: 'https://api.simplize.vn/api/historical/quote/' + ctx?.payload.toUpperCase()
		})

		const resChart = await axios.request({
			method: 'get',
			maxBodyLength: Infinity,
			url: `https://api2.simplize.vn/api/historical/prices/ohlcv?ticker=${ctx?.payload.toUpperCase()}&size=30&interval=1d&type=stock`
		})

		const resData = res?.data?.data

		const { priceClose, pctChange, priceOpen, priceFloor, totalSellVolume, priceCeiling, totalBuyVolume } = resData

		// console.log('----> resChart: ', getClosingPricesText(resChart?.data?.data))

		const txtPrice = `- Hiện tại: ${getColor(resData)} ${priceClose / 1000} (${pctChange < 0 ? '' : '+'}${parseFloat(pctChange).toFixed(
			1
		)}%)`

		const txtOpen = `- Đầu phiên: ${priceOpen / 1000}`
		const txtCeiling = `- Trần: ${priceCeiling / 1000}`
		const txtFloor = `- Sàn: ${priceFloor / 1000}`
		const txtBuyVolume = `- Vol mua: ${numberToPrice(parseInt(totalBuyVolume))}`
		const txtSellVolume = `- Vol bán: ${numberToPrice(parseInt(totalSellVolume))}`

		const txtHead = `${ctx?.payload.toUpperCase()}:`

		const txtFinnal = `
${txtHead}
${txtPrice}
${txtOpen}
${txtCeiling}
${txtFloor}
${txtBuyVolume}
${txtSellVolume}`

		let aiFeel = ''

		try {
			const AIRes = await AIMessage(
				`Giả sử mày là chuyên gia đầu tư chứng khoán 10 năm kinh nghiệm. Nhận xét bằng chữ, ngắn gọn nhất có thể về cổ phiếu ${ctx?.payload.toUpperCase()}, phong cách mất dạy một chút. Đây là data hiện tại của nó: ${formatStockData(
					resData
				)}. Còn đây là giá trong 30 ngày qua: ${getClosingPricesText(resChart?.data?.data)}. Cho tao điểm mua và điểm chốt lời luôn.`
			)
			aiFeel = AIRes.replace(/\*/g, '')
		} catch (error) {
			ctx.reply('Lỗi cmnr, thử lại đi!')
		}

		ctx.reply(`${txtFinnal}

${aiFeel}
`)
	} catch (error) {
		ctx.reply('Lỗi cmnr, thử lại đi!')
	}
}

module.exports = handlePrice
