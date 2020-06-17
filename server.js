const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport"); // 验证token
const cors = require("cors");

const key = require("./config/keys").mongoURL;

// 引入路由
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

const port = 8000;
app.listen(port, () => console.log(`Severt is running on port ${port}`));

// 跨域
app.use(cors());

// 使用body-parser中间件
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// 连接数据库
mongoose.connect(key, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected")
  }).catch(err => {
    console.log(err)
  })
//
mongoose.set('useFindAndModify', false)

// passport初始化
app.use(passport.initialize());
// passport传入js文件 直接引用
require("./config/passport")(passport)

app.use("/api/users", users);
app.use("/api/profiles", profiles);