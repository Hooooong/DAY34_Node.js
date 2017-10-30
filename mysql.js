var mysql = require("mysql");

var settings = {
    host : "localhost",
    user : "root",
    password : "mysql",
    port : "3306",
    database : "memo"
}

var con = mysql.createConnection(settings);

con.connect(function(error){
    if(error){
        console.log("DB is Error!", error);
    }else{
        con.query("select * from memo", function(error, result){

            result.forEach(function(element) {
                console.log(element);
            }, this);
            
        });
        // Query 처리에 대한 연결 해제
        this.end();
    }
});

// 데이터베이스에 대한 연결 헤제
con.end(); 