var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
    
http.createServer(function (req, res) {
    
    var uri = url.parse(req.url).pathname,
        filename = path.join(process.cwd(), uri);
        
    fs.exists(filename, function(exists){
       if(!exists){
           res.writeHead(404,{"Content-Type":"text/plain"});
           res.write("404 Not Found\n");
           res.end();
           return;
       } 
       
       if(fs.statSync(filename).isDirectory()) filename += '/index.html';
       
       fs.readFile(filename,'binary',function(err,file){
           if(err){
               res.writeHead(500,{"Content-Type":"text/plain"});
               res.write(err+"\n");
               res.end();
               return;
           }
           
           var mime = {
                ".html":"text/html",
                ".js":"text/javascript",
                ".css":"text/css",
                ".png":"image/png",
                ".jpg":"image/jpeg",
                ".jpeg":"image/jpeg"
           },
           ext = filename.substring(filename.lastIndexOf("."));
           
           console.log("Request for " + filename + ": " + mime[ext]);
           
           res.writeHead(200,{"Content-Type":mime[ext]});
           res.write(file,"binary");
           res.end();
       });
    });
    
}).listen(process.env.PORT, process.env.IP);
