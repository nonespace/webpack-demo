const webpack = require("webpack")
const {resolve} = require("path")
module.exports = {
    mode:"production",
    entry:{
        dll:["react"],
    },
    output:{
        filename:"[name].js",
        path:resolve(__dirname,"dll"),
        library:'[name]_hash'
    },
    plugins:[
        new webpack.DllPlugin({
            name:'[name]_[hash]',
            path:"dll/manifest.json"
        })
    ]
};