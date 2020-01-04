const router = require('koa-router')();
const result = require('../result');
const fs = require('fs');
const path = require('path');

router.prefix('/video')

function getRange(range) {
  var match = /bytes=([0-9]*)-([0-9]*)/.exec(range);
  const requestRange = {};
  if (match) {
      if (match[1]) requestRange.start = Number(match[1]);
      if (match[2]) requestRange.end = Number(match[2]);
  }
  return requestRange;
}

router.get('/get', async (ctx, next)=> {
  let name = ctx.query.name;
  let filePath = path.join(__dirname,'../public/'+name);
  let { size } = fs.statSync(filePath);
  console.log(size);
  const range = ctx.headers['range'];
  let { start, end } = getRange(range);
  end = end || start + 3000000 > size ? size - 1 : start + 3000000;
  if (!range) {
    return ctx.set('Accept-Ranges', 'bytes');
  }
  if (start >= size || end >= size) {
    ctx.response.status = 416;
    return ctx.set('Content-Range', `bytes */${size}`);
  }
  ctx.response.status = 206;
  ctx.set('Accept-Ranges', 'bytes');
  ctx.set('Content-Range', `bytes ${start}-${end}/${size}`);
  console.log({start , end})
  ctx.body = fs.createReadStream(filePath, { start , end});
})

module.exports = router
