const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt"); // 密码加密
const gravatar = require("gravatar"); // 头像
const jwt = require("jsonwebtoken"); // 获取token
const passport = require("passport"); // 验证token

router.get("/test", (req, res) => {
  return res.json({
    msg: "success"
  })
})

// $route POST api/users/register
// @desc 返回请求的json数据
// @access public
router.post('/register', (req, res) => {
  console.log(req.body);
  // 查询数据库中是否拥有邮箱
  User.findOne({
    email: req.body.email
  }).then((user) => {
    if (user) {
      return res.status(400).json("邮箱已被注册!")
    } else {
      // 头像
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        avatar,
        identity: req.body.identity
      })
      // 加密
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

    }
  })
})

// $route POST api/users/login
// @desc 返回token json web token passport
// @access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        return res.status(404).json("用户不存在")
      }
      // 密码匹配 返回一个bool值
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // 登录成功 获取token
            // jwt.sign("规则","加密名字","过期时间","箭头函数")
            const rule = {
              id: user.id,
              name: user.username,
              avatar: user.avatar,
              identity: user.identity
            }
            jwt.sign(rule, "secret", {
              expiresIn: 3600
            }, (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: "Bearer " + token
              })
            })
            // res.json({
            //   msg: "success"
            // })
          } else {
            return res.status(400).json("密码错误")
          }
        })
    })
})

// $route GET api/users/current
// @desc return user
// @access Private
router.get("/current", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    identity: req.user.identity
  })
})

module.exports = router;