const router = require('koa-router')();
const model = require("../model");
const jwt = require('jsonwebtoken');
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const conf = require('../config/conf');
const result = require('../result');

let Users = model.User;
router.prefix('/users')

router.post('/login', async (ctx, next)=> {
  const user = ctx.request.body;
  let userToken = {
    name: user.username
  };
  const token = jwt.sign(userToken, conf.jwtSecret, {expiresIn: '1h'})  //token签名 有效期为1小时
  result.success(ctx,{
    token
  });
})

router.get('/userInfo', async (ctx) => {
  const token = ctx.header.authorization  // 获取jwt
  let payload
  if (token) {
    payload = await verify(token.split(' ')[1], conf.jwtSecret)  // // 解密，获取payload
    result.success(ctx,{
      username : payload.name
    });
  } else {
    result.error(ctx,{
      info : 'authorization错误'
    })
  }
});

router.get('/allUsers',async(ctx)=>{
  const allUsers = await Users.findAll();
  result.success(ctx,allUsers);
});

router.post('/register',async(ctx)=>{
  const user = ctx.request.body;
  Users.create(user);
  console.log(user);
  result.success(ctx);
});

module.exports = router
