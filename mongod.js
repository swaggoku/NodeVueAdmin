const mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://localhost/stu")

// 设计集合解构
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有值
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

// 将文档结构发布为模型
// User 会自动转成小写复数形式
var User = mongoose.model('User',userSchema)

// 对users集合进行数据库操作(增删改查)
/**
 *  新增数据
 */
// var admin = new User({
//   username: 'tom',
//   password: '123456',
//   email: 'admin@qq.com'
// })
// // 持久化储存
// admin.save((err,ret) => {
//   if(err) {
//     console.log("保存失败")
//   }else {
//     console.log("保存成功")
//     console.log(ret)
//   }
// })
/**
 *  查询数据
 */
// User.find((err,ret) => {
//   if(err) {
//     console.log("查询失败")
//   }else {
//     console.log(ret)
//   }
// })
// User.find({
//   username: 'zs'
// },(err,ret) => {
//   if(err) {
//     console.log("查询失败")
//   }else {
//     console.log(ret)
//   }
// })
// User.findOne({
//   username: 'admin'
// },(err,ret) => {
//   if(err) {
//     console.log("查询失败")
//   }else {
//     console.log(ret)
//   }
// })
/**
 *  删除数据
 */
// User.remove({
//   username: "米斯特"
// },(err,ret) => {
//   if(err){
//     console.log("删除失败")
//   }else {
//     console.log(ret)
//   }
// })
/**
 *  更新数据
 */
// User.findByIdAndUpdate('5edb96a6a1301754a86e901b', {
//   password: 123123
// },(err,ret) => {
//   if(err) {
//     console.log("更新失败")
//   }else {
//     console.log("更新成功")
//     console.log(ret)
//   }
// })
