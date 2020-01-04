/* 扫描所有的model模型 */
const fs = require("fs");

let files = fs.readdirSync(__dirname); //同步遍历目录

let js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    if(f === 'index.js') continue;
    console.log(`import model from file ${f}...`);

    let name = f.substring(0, f.length - 3); //User.js ==> name : User
    module.exports[name] = require(__dirname + '/' + f);
}