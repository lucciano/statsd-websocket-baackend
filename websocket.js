var ws = require('nodejs-websocket');


var instance;

function WebsocketBackend(startupTime, config, emitter){
  var self = this;
  this.ws_url = config.ws_url | "ws://localhost:8081"

   var connection = ws.connect(this.ws_url, {})

   connection.on("connect", function (str) {
        console.log("connection open")
        connection.sendText("Statsd");
  })

  emitter.on('packet', function(packet, rinfo) { 

        connection.sendText(packet.toString().trim());
  });
}


exports.init = function(startupTime, config, events) {
  instance = new WebsocketBackend(startupTime, config, events); 
  return true;
};
