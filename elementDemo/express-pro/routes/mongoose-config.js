/**
 * Created by Administrator on 2018/11/26.
 */
//引入mongoose
const mongoose = require('mongoose');
//建立连接
mongoose.connect(`mongodb://localhost:27017/test`,{ useNewUrlParser: true ,poolSize:5});

//判断连接是否生效
const conn = mongoose.connection;
conn.on("open",()=>{
    console.log('success');
});
conn.on("error",()=>{
    console.log('error');
});

//需要生成可以操作表数据的对象和骨架
let user = mongoose.Schema({
},{collection:"user",versionKey:false,strict:false});
let user_log = mongoose.Schema({
},{collection:"user_log",versionKey:false,strict:false});
//利用骨架生成操作数据库对象
global.user = mongoose.model("user",user);
global.user_log = mongoose.model("user_log",user_log);
/*console.log('---------------------------------------------------',user);
console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++',user_log);*/
