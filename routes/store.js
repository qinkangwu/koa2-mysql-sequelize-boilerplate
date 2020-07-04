const router = require('koa-router')();
const model = require("../model");
const { getDistance } = require("../utils/getDistance")
const jwt = require('jsonwebtoken');
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const conf = require('../config/conf');
const result = require('../result');
const uuid = require('node-uuid');

let Store = model.Store;
router.prefix('/store')

router.post('/register', async (ctx, next)=> {
    const store = ctx.request.body;
    store.id = uuid.v1();
    let res = await Store.create(store);
    result.success(ctx)
})

router.post('/getDistance' , async (ctx,next)=>{
    const store = await Store.findOne({
        where : {
            storeName : '遵义路'
        }
    });
    const otherStore = ctx.request.body;
    const distance = getDistance(store.log,store.lat,otherStore.log,otherStore.lat);
    result.success(ctx,{
        distance
    });
})


module.exports = router
