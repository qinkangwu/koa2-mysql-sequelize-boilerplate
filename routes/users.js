const router = require('koa-router')();
const model = require("../model");
const jwt = require('jsonwebtoken');
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const conf = require('../config/conf');
const result = require('../result');
const uuid = require('node-uuid');
const redis = require('../utils/redis');

let Users = model.User;
router.prefix('/users')

/**
 * @api {get} /register 用户注册
 * @apiName registerUser
 * @apiGroup Users
 *
 * @apiParam {String} id 用户id
 * @apiParam {String} username 用户名
 * @apiParam {String} password 用户密码
 *
 * @apiSuccess {Number} code 1
 * @apiSuccess {String} success 'true'
 * @apiSuccess {Object} result {}
 */
router.post('/register',async(ctx)=>{
  const user = ctx.request.body;
  user.id = uuid.v1();
  const res = await redis.hmset(user.id,"id",user.id,"username",user.username,"password",user.password);
  Users.create(user);
  result.success(ctx);
});

router.post('/login', async (ctx, next)=> {
  const user = ctx.request.body;
  let userToken = {
    username: user.username,
    password : user.password
  };
  const token = jwt.sign(userToken, conf.jwtSecret, {expiresIn: '1h' , algorithm : 'HS256'})  //token签名 有效期为1小时
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
      username : payload.username,
      id : payload.id
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



module.exports = router
