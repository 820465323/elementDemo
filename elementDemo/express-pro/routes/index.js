const express = require('express');
const session = require('express-session');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();

app.use(session({
    saveUninitialized:false,//是否保存初始化的session对象到内存中
    resave:false,//是否定期更新在内存中的session对象
    secret:"ssd",//加密的密钥
    rolling:true,//是否每一次操作都重置session存活时间
    cookie:{maxAge:1000*10}//设置session存活时间
}));

/* GET home page. */
//用户登陆
app.all('/user', (req, res, next)=> {
    //session为object,不存在即为undefined
  /*req.session.user = {username:req.query.username,password:req.query.password};*/
  user.findOne({"username":req.query.username,"password":req.query.password},(error,data)=>{
      /*res.send({data:{data:data,sessionState:req.session.user}});*/
      res.send(data);
  })
});

//用户登录更新登录时间
app.all('/userLoginTime',(req,res,next)=>{
    let id = req.query._id;
    let _id = mongoose.Types.ObjectId(id);
    console.log(_id,req.query.loginTime)
    user.update({"_id":_id},{$set:{loginLastTime:req.query.loginTime}},{upsert:true,multi:false},(err,data)=>{
        res.send(data);
    })
});

//分页查询
app.all('/userTable',(req,res,next)=>{
    num = parseInt(req.query.number);
    numSkip = parseInt(req.query.skipPage);
    user.find({},(error,data)=>{
        res.send(data);
    }).skip(numSkip).limit(num).sort({userRegistTime:-1});//对结果默认排序
});

//指定页码分页查询
app.all('/userTableSkip',(req,res,next)=>{
    numSkip = parseInt(req.query.skipPage);
    num = parseInt(req.query.number);
    user.find({},(error,data)=>{
        res.send(data);
    }).skip((numSkip-1)*num).limit(num).sort({userRegistTime:-1});
});

//上传文件
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },

    /*以时间戳命名的文件*/
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }

    /*filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }*/
});
let upload = multer({storage: storage});
let imageName = '';
app.all('/images', upload.array('imgfile', 40), (req, res, next)=> {
    let files = req.files;
    if (!files[0]) {
        res.send('error');
        //在此地加上return 纯属于防止express报错,因为send和end结束之后都会调用return
        return 'error'
    } else {
        console.log(files[0].filename);
        imageName=files[0].filename;
        res.send('success');
        return 'success'
    }
});

//需改用户头像路径
app.all('/imagesUpdate',(req,res,next)=>{
    let id = req.query.id;
    //将传来的ID转换为mongodb的ObjectId,需要引入mogoose
    let _id = mongoose.Types.ObjectId(id);
    console.log(id);
    user.update({"_id":_id},{$set:{headPicture:'http://localhost:3000/images/'+imageName}},{upsert:true,multi:false},(err,data)=>{
        console.log(imageName,'&&&&&&&&&&&&&&&&&&&&&&&&&');
        res.send(imageName);
    });
});

//删除用户信息
app.all('/deleteMessages',(req,res,next)=>{
    let id = req.query.id;
    console.log(id,'**************************');
    let _id = mongoose.Types.ObjectId(id);
    user.remove({"_id":_id},(err,data)=>{
        res.send(data);
    });
});
module.exports = app;
