<template >
    <!--侧栏-->
    <el-aside style="border: 1px solid blue;width: 220px;height: 100%;">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;margin-top: 10%">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group title="权限管理">
            <el-menu-item index="1-1" @click="role()">角色管理</el-menu-item>
            <el-menu-item index="1-2" @click="user()">用户管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="日志管理">
            <el-menu-item index="1-3">查看日志</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">子管理</span>
            <el-menu-item index="1-4-1">子管理</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
          </template>

          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>

        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>

<script>
  export default {
      name:'foot',
    data(){
          return {
            isCollapse: true,
          }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //角色管理
      role(){
        let user= sessionStorage.getItem('user');
        if(user!=null){
          this.$router.push({name:'homePage'});
        }else {
            alert('请先登录');
          location.reload();
        }
      },
      user(){
        let user= sessionStorage.getItem('user');
        if(user!=null){
          this.$router.push({name:'userPage'});
        }else {
          alert('请先登录');
          location.reload();
        }
      }
    }
  }
</script>
