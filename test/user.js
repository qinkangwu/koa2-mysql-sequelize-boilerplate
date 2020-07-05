const co = require('co');
const app = require('../app');
const jwt = require('jsonwebtoken');
const model = require("../model");
const request = require('supertest').agent(app.listen());
const uuid = require('node-uuid');
const conf = require('../config/conf');
const should = require('should');
let Users = model.User;

describe('测试user接口',async ()=>{
  const self = this;

  // 为每个单元测试初始化数据
  before((done)=> {
    co(function* () {
      //每次执行it之前都会执行一遍这里
      self.user1 = yield Users.create({id : uuid.v1(),username : 'test',password:'123456'});
      self.token = jwt.sign(self.user1.dataValues, conf.jwtSecret, {expiresIn: '1h' , algorithm : 'HS256'});
      done();
    }).catch(err => {
      console.log('err: ', err);
      done();
    })
  });

  after((done)=>{
    process.exit();
  })
  

  it('register接口测试',(done)=>{
    request.post('/users/register')
           .send({id : uuid.v1(),username : 'registerTest',password:'123456'})
           .expect(200,(err,res)=>{
      if(err){
        done(err);
      }else{
        // console.log(res.body);
        done();
      }
    })
  });

  it('login接口测试',(done)=>{
    request.post('/users/login')
           .send({username : 'registerTest',password:'123456'})
           .expect(200,(err,res)=>{
      if(err){
        done(err);
      }else{
        // console.log(res.body);
        done();
      }
    })
  });

  it('userInfo接口测试(有token)',(done)=>{
    request.get('/users/userInfo')
           .set('Authorization', 'Bearer ' + self.token)
           .expect(200,(err,res)=>{
      if(err){
        done(err);
      }else{
        // console.log(res.body);
        should(res.body.result.id).equal(self.user1.dataValues.id);
        done();
      }
    })
  });

  it('userInfo接口测试(无token)',(done)=>{
    request.get('/users/userInfo')
           .expect(401,(err,res)=>{
      if(err){
        done(err);
      }else{
        // console.log(res.body);
        done();
      }
    })
  });
});