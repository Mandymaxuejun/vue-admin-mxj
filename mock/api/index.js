const path = require('path')
const fs = require('fs')
const moduleDir = path.join(__dirname,'module')
const files = fs.readdirSync(moduleDir)
const apiArr = []
files.forEach(function(file){
    apiArr.push(require(path.resolve(moduleDir,file)))
})
module.exports = apiArr