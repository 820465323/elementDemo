<template>
  <el-container id="app" style="width: 100%;z-index: 99999;position: fixed;">
  <!--登录框-->
  <div style="width: 100%;height: 100%;text-align: center;z-index: 99999;position: fixed" id="loginBack">
    <!--视频播放-->
    <div style="width: 100%;height: 100%;position: fixed;margin: auto">
      <video src="../../static/mp4/19273975-102-009-144230.mp4" style="object-fit: fill;width: 100%;height: 100%;"  muted="muted" autoplay="autoplay" loop="loop"></video>
    </div>

    <!--自定义提示框-->
    <div id="messages-org" style="width: 100%;position: fixed;z-index: 99999;background-color: orange;opacity: 0;text-align: center;color: red">
      账号密码不能为空!
    </div>
    <div id="messages-red" style="width: 100%;position: fixed;z-index: 99999;background-color: red;opacity: 0;text-align: center;color: black">
      账号密码错误!
    </div>


    <div style="border: 1px solid transparent;width: 400px;height: 400px;margin: auto;z-index: 9999" id="loginChild">

      <div style="display: inline-block;vertical-align: middle;z-index: 9999">
        <img src="../../static/img/3.jpg" alt="图片不见了" style="width: 150px;height: 150px;border-radius: 20%;z-index: 9999;position: relative">
      </div>

      <div style="display: inline-block;vertical-align: middle;font-size: 25px;color: whitesmoke;z-index: 9999;position: relative">
        <B>&nbsp;&nbsp;&nbsp;套博士一家 💗</B>
      </div>

      <br><br>
      <!--登录表单-->
      <form @submit.prevent="submit" style="z-index: 9999;position: relative;">
        <el-input placeholder="请输入用户名" type="text" name="username" v-model="input.username" @blur="blurUsername()"></el-input>
        <p id="p1" style="display: none;z-index: 9999;position: relative">用户名不能为空</p>
        <br><br>
        <el-input placeholder="请输入用户密码" type="password" name="password" v-model="input.password" @blur="blurPassword()"></el-input>
        <p id="p2" style="display: none;z-index: 9999;position: relative;">用户名密码不能为空</p>
        <br><br>
        <el-button type="primary" style="width: 100%;height: 40px;z-index: 9999;position: relative" @click="submit()">登录</el-button>
        <br><br>
        <el-button type="success" style="width: 100%;height: 40px;z-index: 9999;position: relative" @click="regist()">注册</el-button>
      </form>
    </div>
  </div>
  </el-container>
</template>

<script>
  export default({
    name:"loginPage",
    data(){
        return {
          input:{},
          result:{},
        }
    },
    created:function(){
    },
    methods:{
      submit(){
        //登陆验证
        if(this.input.username==undefined||this.input.password==undefined||this.input.password==''||this.input.username==''){
          document.querySelector('#messages-org').style='width: 100%;position: fixed;z-index: 99999;background-color: orange;text-align: center;transition: all 2s;opacity: 1;transition: all 2s;color: red';
          setTimeout(()=>{
            document.querySelector('#messages-org').style='width: 100%;position: fixed;z-index: 99999;background-color: orange;text-align: center;transition: all 2s;opacity: 0;transition: all 2s;color: red';
          },2000);
        }else {
          //登陆判断
          this.axios.get(`http://localhost:3000/user?username=`+this.input.username+'&password='+this.input.password).then((data)=>{
            this.result = data.data;
            if(this.result==''||this.result==null||this.result==undefined){
              document.querySelector('#messages-red').style='width: 100%;position: fixed;z-index: 99999;background-color: red;text-align: center;transition: all 2s;opacity: 1;transition: all 2s;color: red;color: black';
              setTimeout(()=>{
                document.querySelector('#messages-red').style='width: 100%;position: fixed;z-index: 99999;background-color: red;text-align: center;transition: all 2s;opacity: 0;transition: all 2s;color: red;color: black';
              },2000);
            }else {
              this.$message({
                showClose: true,
                message: '欢迎'+this.result.name,
                type: 'success'
              });
/*
              document.querySelector('#loginBack').style='display:none;width: 100%;background-color: whitesmoke;height: 100%;text-align: center';
*/
              let date = new Date();
              let year = date.getFullYear();
              let month = date.getMonth() + 1;
              let date2 = date.getDate();
              let hours = date.getHours();
              let seconds = date.getSeconds();
              let minutes = date.getMinutes();
              let time = year + '-' + month + '-' + date2 + ' ' + hours + ':' + minutes + ':' + seconds;
                this.axios.get('http://localhost:3000/userLoginTime?_id='+this.result._id+'&loginTime='+time).then((data)=>{
                  console.log('客户端没问题');
                });

                //利用sessionStorage存储用户的登录信息信息
              console.log(JSON.stringify(this.result));
                sessionStorage.setItem('user',JSON.stringify(this.result));
                  this.$router.push({name:'rolePage'});
            }
          });
        }
      },
      //表单验证
      blurPassword () {
        if(this.input.password==undefined||this.input.password==''){
          document.querySelector('#p2').style='color:whitesmoke;display:block;z-index: 9999;position: relative'
        }else {
          document.querySelector('#p2').style='display:none;z-index: 9999;position: relative'
        }
      },
      blurUsername () {
        if(this.input.username==undefined||this.input.username==''){
          document.querySelector('#p1').style='color:whitesmoke;display:block;z-index: 9999;position: relative'
        }else {
          document.querySelector('#p1').style='display:none;z-index: 9999;position: relative'
        }
      },
      //注册框
      regist(){
        this.$router.push({name:"userRegist"});
      },
    }
  })
</script>
