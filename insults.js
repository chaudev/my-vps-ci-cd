const insults = [
	'Ngu như chó 7 màu!',
	'Đầu óc cậu ngắn hơn dây đo năm!',
	'Trí tuệ cậu thấp hơn mực nước biển!',
	'Con mèo nhà cậu còn thông minh hơn cậu!',
	'Cậu là kẻ nặng mông nhất trong hệ mặt trời!',
	'Thằng này não ngắn chưa từng thấy!',
	'Cậu chả khác gì cái cống bị nghẹt!',
	'Có chút trí tuệ không đâu nhưng không sao, vì cậu vẫn chưa sử dụng được nó!',
	'Đừng bao giờ nghĩ về chuyện làm tổn thương cảm xúc của người khác, cậu chả có cảm xúc để tổn thương!',
	'Cậu ngu như bò!',
	'Trí tuệ của cậu thấp đến mức phải đào hố mới chạm tới!',
	'Thật khó tin là tự nhiên lại tạo ra một kẻ như cậu!',
	'Đừng để bụi phủ lên tâm trí cậu, sẽ mất mùi cậu đấy!',
	"Khoai tây nói rằng 'tôi đen nhưng không ngu', còn cậu thì sao?",
	'Cậu có thể bỏ qua học cấp 2, vì cậu chẳng học được gì từ đó!',
	'Cậu không biết điều gì mà còn tự tin, thật là dễ thương!',
	'Cậu như một cuộc thiếu sót của tự nhiên!',
	'Thậm chí cả trường lớp cũng phản đối việc cậu xuất hiện!',
	'Cậu là cảnh báo sống động về việc giảm IQ!',
	'Tài năng của cậu chưa được phát hiện, và có vẻ như sẽ không bao giờ!',
	'Kẻ thua cuộc trong cuộc đua tiến hóa!',
	'Cậu là bằng chứng sống cho việc ngu không giới hạn!',
	'Cậu có thể nghĩ được một cái gì đó thông minh? Không, cậu không thể!',
	'Cậu thật sự là ngu ngốc vô đối!',
	'Cậu ngu đến nỗi cả chuỗi cửa hàng cà phê cũng không đủ để giải thích!',
	'Cậu đã thử chứng minh mình thông minh chưa? Đừng cố gắng, sẽ phí thời gian lắm!',
	'Đừng bao giờ thách thức trí tuệ của cậu, vì cậu không có!',
	'Đôi khi, việc im lặng là cách tốt nhất để giữ cho người khác không biết cậu ngu như thế nào!',
	'Cậu có phải là một tài khoản troll của tự nhiên không?',
	'Thằng này ngu đến mức phản cảm!',
	'Cậu giống như phép thử lực kéo của trí tuệ!',
	'Có ai đã từng nói với cậu rằng thông minh không phải là một bức tranh, vì cậu là một tác phẩm dở hơi!',
	"Cậu là loại người khiến con trẻ tự hỏi 'tại sao, ông trời?'",
	'Có lẽ cậu đã mất tất cả tinh thần cạnh tranh mà không hề biết!',
	'Trí tuệ của cậu là vật liệu xây dựng cho một khu dân cư!',
	'Cậu là minh chứng sống cho việc tiến hóa không nhất quán!',
	"Thực sự, cậu là hiện thân của từ 'kém cỏi'!",
	"Nếu như 'ngu' là một nghề nghiệp, cậu sẽ là người giàu nhất trong nghề!",
	'Cậu là một trường hợp nghiên cứu tiêu biểu về sự kém cỏi!',
	'Cậu thực sự là một biểu tượng cho việc tuyệt vọng!',
	'Cậu không phải là một khái niệm mới về sự ngu xuẩn, nhưng cậu thực sự là một ví dụ sống!',
	'Cậu là một hiện thân hoàn hảo cho việc sinh vật bò sát cũng có khả năng phát triển!',
	'Cậu là một phép thử độc đáo cho sự bất lực của trí tuệ!',
	'Cậu biết không, sự ngu dốt của cậu là cội nguồn của nhiều trò vui!',
	'Cậu giống như một quả bom ngu, cứ chờ đến lúc nổ!',
	'Tôi không biết liệu cậu thực sự ngu hay là chỉ đang làm trò ngốc thôi!',
	'Cậu không đáng để ngồi xuống và nói chuyện!',
	'Trí tuệ của cậu thấp hơn một chục tầng hầm!',
	'Có ai đó đã để quên cậu ở trong bể nước khi cậu còn bé?',
	'Cậu giống như một bản sao kém chất lượng của một người thật sự!',
	'Cậu là một trường hợp đặc biệt của sự thiếu hiểu biết!',
	'Trí tuệ của cậu còn thấp hơn cả nhiệt độ phòng lạnh!',
	'Cậu là kẻ sống sót cuối cùng trong cuộc thi tồi tệ nhất!',
	"Nếu cậu là một chương trình máy tính, người dùng sẽ chọn 'gỡ cài đặt' ngay lập tức!",
	'Cậu là một mẫu thiết kế thất bại của tự nhiên!',
	'Trí tuệ của cậu là nguyên nhân khiến Darwin phải ngán ngẩm!',
	'Cậu giống như một cỗ máy sản xuất sự thất bại!',
	'Nếu sự ngu dốt là một môn học, cậu sẽ là giáo viên hàng đầu!',
	'Thật là đáng tiếc khi thấy cách cậu lãng phí không gian!',
	'Nếu có một giải thưởng cho sự thiếu hiểu biết, cậu sẽ là người chiến thắng không cần bỏ phiếu!',
	'Cậu là sự thất bại đi lên của sự tiến hóa!',
	"Nếu cậu là một game, rating sẽ là '0 sao'!",
	'Có lẽ cậu là một trong những lý do khiến trái đất muốn triệt hạ con người!',
	'Trí tuệ của cậu thấp đến mức một đám cháy cũng không thể làm nóng được!',
	'Cậu không chỉ là một sai lầm của tự nhiên, mà còn là một sai lầm của cha mẹ!',
	'Thật buồn khi thấy cậu là kết quả cuối cùng của hàng tỷ năm tiến hóa!'
]

module.exports = insults