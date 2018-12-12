const express = require('express');
const app = express();
/* GET users listing. */
//excel导入,批量加入
app.all('/userImport', (req, res, next) => {
    //接受前台被转换的数组字符串
    let arr2 = JSON.parse(req.query.arr);
        /*new user({name:"ttt",id:222}).save(function(err,data){
            res.send(data)
        });*/
    user.collection.insert(arr2,(err,data)=>{
        if (err) {
            res.send(err,'发生了错误');
        } else {
            res.send('success');
        }
    });
});

//查询所有条数
app.all('/total',(req,res,next)=>{
    user.count({},(error,data)=>{
        console.log(data);
        res.send(JSON.stringify(data));
    });
});

//用户注册
app.all('/userRegist',(req,res,next)=>{
    console.log(req.query.year);
    new user({"name":req.query.name,"sex":req.query.sex,"address":req.query.address,"mobile":req.query.mobile,"year":req.query.year,"username":req.query.username,"password":req.query.password,"userRegistTime":req.query.userRegistTime}).save((err,data)=>{
            res.send(data);
    });
});
module.exports = app;
