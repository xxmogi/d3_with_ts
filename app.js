
var connect = require("connect"),
	serveStatic = require("serve-static"),
	path = require("path"),
	port = 8000;
	
var app = connect();
app.use(serveStatic(path.join(__dirname,"public")));
app.listen(8000);
console.log("server start at http://localhost:"+port)
 