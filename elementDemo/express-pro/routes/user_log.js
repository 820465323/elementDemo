const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

/*let myStream = {
 write:function(logData){
 //保存到数据库里
 console.log(logData,"获取到日志源数据");
 }
 };*/
let method = '';
app.use(morgan(function (tokens, req, res) {
    console.log('222222222');
    console.log('请求时间  = ', new Date());
    console.log('请求方式  = ', tokens.method(req, res));
    console.log('请求链接  = ', tokens.url(req, res));
    console.log('请求状态  = ', tokens.status(req, res),);
    console.log('请求长度  = ', tokens.res(req, res, 'content-length'), '-',);
    console.log('响应时间  = ', tokens['response-time'](req, res) + 'ms');
    console.log('远程地址  = ', tokens['remote-addr'](req, res));
    console.log('远程用户  = ', tokens['remote-user'](req, res));
    console.log('http版本  = ', tokens['http-version'](req, res));
    console.log('浏览器信息 = ', tokens['user-agent'](req, res));
    console.log('method  ===============',method);
    //根据用户访问的标识添加不同的日志信息
    if(method=='userLog'){
        console.log('+++++++++++++++++++++++++++++');
    }
    return [
        '请求方式: ' + tokens.method(req, res) + ' ',        //请求方法
        '请求链接: ' + tokens.url(req, res) + ' ',           //请求链接
        '请求状态: ' + tokens.status(req, res) + ' ',        //请求状态
        '时间格式: ' + tokens.date(req, res, 'web') + ' ',     //时间有三种格式,clf、iso、web,默认是clf
        '远程地址: ' + tokens['remote-addr'](req, res) + ' ', //远程地址
        '远程用户: ' + tokens['remote-user'](req, res) + ' ', //远程用户
        'http版本: ' + tokens['http-version'](req, res) + ' ',    //http版本
        '请求长度: ' + tokens.res(req, res, 'content-length') + ' ', '-',    //请求长度
        '响应时间: ' + tokens['response-time'](req, res), 'ms' + ' ',        //响应时间
        '浏览器信息: ' + tokens['user-agent'](req, res) + ' ',      //浏览器信息
    ].join('');
}, {stream: accessLogStream}));


app.all('/user_log', async (req, res, next) => {
    method = 'userLog';
    user_log.find({}, (error, data) => {
        res.send(data);
    })
});

module.exports = app;