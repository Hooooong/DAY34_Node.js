Android Programing
----------------------------------------------------
### 2017.10.27 27일차

#### 예제
____________________________________________________

#### 공부정리
____________________________________________________

##### __File Upload__

- File Upload

  - 모듈 설정

  ```javascript
  // 파일 읽기 모듈
  var fs = require("fs");
  // 파일 업로드 모듈
  var formidable = require("formidable");
  ```

  - 코드 설정

  ```javascript
  // 업로드 모듈의 form 설정
  var form = new formidable.IncomingForm();
  // 다중 파일 업로드 설정
  form.multiples = true;
  form.parse(req, function(error, names, files){  // 임시 폴더에 저장
      for(i in files){
          var oldPath = files[i].path;
          var dir = "c:/data/upload/";

          // 폴더가 존재하지 않으면 생성
          if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
          }

          var realPath = dir+files[i].name;
          renameFile(oldPath, realPath);
      }
  }

  function renameFile(oldPath, realPath, index){
      if(realPath.exists){
          renameFile(oldPath, realPath+'('+index+')', index++);
      }else{
          fs.renameSync(oldPath, realPath);
      }
  }
  ```

- MySQL 연결

  - 모듈 설정

  ```javascript
  // MySQL 모듈
  var mysql = require("mysql");
  ```

  - 코드 설정

  ```javascript
  // MySQL 은 Setting 값을 통해 Connect 한다.
  // host, user, password, port, database 명을 명시한다.
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
  ```
