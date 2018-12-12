<template>
  <div id="app" style="height: 100%;">
    <el-container style="height: 100%;">
    <foot></foot>
    <router-view/>
    </el-container>
  </div>
</template>

<script>
  import foot from './components/foot.vue'
export default {
  name: 'App',
  components:{foot:foot},
  data(){
    return {
    }
  },
  methods:{

  },
  computed:{
  }
}
</script>
<!--垂直基线-->
<style>
  #loginBack:after{
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  #loginChild{
    display: inline-block;
    vertical-align: middle;
  }
</style>

