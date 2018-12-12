<template>
  <el-container style="height: 100%">
    <div style="margin: auto;font-size: 50px">陶会雪小同学 💗</div>
  </el-container>
</template>

<script>
  export default({
    name:"rolePage",
    data(){
        return{
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
