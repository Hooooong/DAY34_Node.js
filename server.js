
/*
    postman 에서 전송 테스트 시 Content-type 을 지정하면 안된다.
    
*/
var http  = require("http");
// 파일 업로드
var formidable = require("formidable");
var fs = require("fs");

var server = http.createServer(function(req, res){

    if(req.url == "/upload"){ 
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.parse(req, function(error, names, files){  // 임시 폴더에 저장
            
            console.log(names);
            console.log(files);
            for(i in files){
                    
                var oldPath = files[i].path;
                var realPath = "c:/data/upload/"+files[i].name;
                
                renameFile(oldPath, realPath);
            }
            res.end("Complete!!!");
        });

        // form.on('end', function(error){
        //     if(error){
        //     }else{
        //         res.end();
        //     }
        // })


    }else{
        res.end("404 not Found!!!!!");
    }
});

function renameFile(oldPath, realPath, index){
    if(realPath.exists){
        renameFile(oldPath, realPath+"("+index+")", index++);
    }else{
        fs.renameSync(oldPath, realPath);
    }
}

server.listen(8090, function(){
    console.log("Server is Running......");
});