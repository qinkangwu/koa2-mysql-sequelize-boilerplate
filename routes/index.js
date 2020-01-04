const router = require('koa-router')()
const fs = require('fs');
const result = require('../result');
const path = require('path');

router.get('/', async (ctx, next) => {
  ctx.body = 'hello world';
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/uploadVideo' , async (ctx,next)=>{
  let file = ctx.request.files.data;
  const reader = fs.createReadStream(file.path); 
  let filePath = path.join(__dirname, '../public') + `/${file.name}`;
  const upStream = fs.createWriteStream(filePath,{
    autoClose : true
  }); 
	 // 可读流通过管道写入可写流 
  reader.pipe(upStream);
  fs.unlinkSync(file.path);
  const promiseHandle = ()=> new Promise((resolve,reject)=>{
    upStream.on('finish',()=>{
      resolve('ok');
    });
  });
  await promiseHandle();
  result.success(ctx,'http://localhost:8888/video/get?name=' + file.name);
})

module.exports = router
