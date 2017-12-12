// SocketController
function mensaje() {
	var connection = new WebSocket('ws://192.168.0.42:8080/pos');//127.0.0.1:8080
	connection.onopen = function () {
		connection.send('Hi');
		console.log("metodo mensaje");
	}
	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}
	connection.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
	}
}


$(document).ready(function() {
	$('#send_btn').click(function() {
		console.log("click");
		var message = $('#message');
		connection.send(message);
		console.log("click");
		
	});
});


