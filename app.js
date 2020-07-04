const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const jwtKoa = require('koa-jwt');
const path = require('path');
const conf = require('./config/conf')

const index = require('./routes/index');
const users = require('./routes/users');
const video = require('./routes/video');
const store = require('./routes/store');
const cors = require('koa2-cors');

const KoaBody = require('koa-body');
const tokenConfirm = require('./middle/tokenConfirm');

const {  accessLogger,systemLogger, } = require('./middle/logger');
const fetch = require('node-fetch')

const isDev = process.env.npm_lifecycle_event === 'dev';

// error handler
isDev && onerror(app);

// middlewares
app.use(KoaBody({
  multipart: true,
  strict: false,
  formidable: {
      uploadDir:  path.join(__dirname, `/temp`), //设置上传缓存文件夹
      maxFileSize: 1024 * 1024 * 10 * 1024, // 设置上传文件大小最大限制，默认1G 1024M
      keepExtensions : true
  },
  jsonLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
}));

app.use(json());
app.use(cors());
app.use(accessLogger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(tokenConfirm());

app
  .use(jwtKoa({
    secret : conf.jwtSecret
  }).unless({
      path: [
        /^\/users\/login/,
        /^\/users\/register/,
        /^\/uploadVideo/,
        /^\/video\/get/,
        /^\/favicon.ico/,
      ] //数组中的路径不需要通过jwt验证
  }))

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(video.routes(), video.allowedMethods());
app.use(store.routes(), store.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  systemLogger.error(err);
});

module.exports = app;
