<template>

      <form @submit.prevent="submitRegist">
        <el-input placeholder="请输入真实姓名" type="text" name="username" v-model="inputValue.name"
                  style="margin-top: 15px">
          <template slot="prepend">真实姓名</template>
        </el-input>

        <el-radio v-model="radio" label="男">男</el-radio>
        <el-radio v-model="radio" label="女">女</el-radio>

        <div class="block">
          <span class="demonstration">出生年月</span>
          <el-date-picker
            v-model="yearValue"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>

        <el-input placeholder="请输入用户账号" type="text" name="username" v-model="inputValue.username"
                  style="margin-top: 15px">
          <template slot="prepend">用户账号</template>
        </el-input>

        <el-input placeholder="请输入用户密码" type="text" name="username" v-model="inputValue.password"
                  style="margin-top: 15px">
          <template slot="prepend">用户密码</template>
        </el-input>

        <el-input placeholder="请确认用户密码" type="password"
                  style="margin-top: 15px">
          <template slot="prepend">确认用户密码</template>
        </el-input>

        <el-input placeholder="请输入真实姓名" type="text" name="username" v-model="inputValue.address"
                  style="margin-top: 15px">
          <template slot="prepend">家庭住址</template>
        </el-input>

        <el-input placeholder="请输入真实姓名" type="text" name="username" v-model="inputValue.mobile"
                  style="margin-top: 15px">
          <template slot="prepend">联系方式</template>
        </el-input>

        <div slot="footer" class="dialog-footer" style="text-align: right">
          <el-button @click="userRegistFlase" style="margin-top: 15px">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = true;submitRegist()"
                     style="margin-top: 15px">提 交
          </el-button>
        </div>
      </form>

</template>

<script>
  export default({
    name: "userRegist",
    data(){
      return {
        inputValue: {},
        radio:'',
        yearValue:''
      }
    },
    methods: {
      //注册提交
      submitRegist(){

        console.log(this.yearValue);
        let t = new Date(this.yearValue);
        console.log(t.getMonth,'----');

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let date2 = date.getDate();
        let hours = date.getHours();
        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let time = year + '-' + month + '-' + date2 + ' ' + hours + ':' + minutes + ':' + seconds;
        this.axios.get('http://localhost:3000/users/userRegist?name=' +this.inputValue.name+
          '&sex='+this.radio+
          '&address='+this.inputValue.address+
          '&mobile='+this.inputValue.mobile+
          '&year='+this.yearValue+
          '&username='+this.inputValue.username+
          '&password='+this.inputValue.password+
          '&userRegistTime='+time).then((data)=>{
          console.log(data);
        });
      },
      //取消注册
      userRegistFlase(){
          this.$router.push('/loginPage');
      }
    }
  })
</script>
