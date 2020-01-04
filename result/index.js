const SUCCESS = 1; //成功
const ERROR = 2; //失败

module.exports = {
    success : function(ctx,result){
        ctx.status = 200;
        ctx.body = {
            success : 'true',
            code : SUCCESS,
            result : result
        };
    },
    error : function(ctx,result){
        ctx.status = 200;
        ctx.body = {
            success : 'false',
            code : ERROR,
            result : result
        };
    },
    stream : function(ctx,result){
        ctx.status = 206;
        ctx.body = result;
    }
}