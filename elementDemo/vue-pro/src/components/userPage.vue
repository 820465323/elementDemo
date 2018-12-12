<template>
  <el-container style="height: 50px;margin: auto">
  <el-button type="primary" @click="sub()">测试按钮</el-button>
  </el-container>
</template>

<script>
  import XLSX from 'xlsx'
  export default({
    name:"userPage",
    data(){
      return{

      }
    },
    methods:{
      sub(){
          this.axios.get('http://localhost:3000/userLog/user_log').then((data)=>{
            console.log(data.data);
          });
      }
    },
    created:function () {
      //判断登录标志进行拦截
      let user= sessionStorage.getItem('user');
      if(user==null){
        alert('请先登录');
        this.$router.push({name:'loginPage'});
      }
    }
  });
</script>
