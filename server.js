var connect = require('connect');
var serveStatic = require('serve-static');

const PORT = 8080;

// fs.readFile('index.html', function (err, html) {

//     if (err) throw err;

//     http.createServer(function (request, response) {
//         response.writeHeader(200, {
//             "Content-Type": "text/html"
//         });
//         // response.writeHeader(200, {"Content-Type": "text/javascript"});  
//         response.write(html);
//         response.end();
//     }).listen(PORT);
// });

connect().use(serveStatic(__dirname)).listen(PORT, function(){
    console.log('Server running on 8080...');
});