<template>
  <div id="app">
    <el-container  >
      <el-header style="height: 30px;padding: 0 0">
<!--        <el-row>-->
<!--          <el-col span="20">-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 router @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">报表</template>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="/printlabel" >打印标签</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
          <el-menu-item style="float: right">登入</el-menu-item>
          <el-menu-item style="float: right" >
            <i class="el-icon-user-solid"></i>
            <span>你好</span>
          </el-menu-item>
        </el-menu>
<!--          </el-col>-->
<!--          <el-col span="4"></el-col>-->
<!--        </el-row>-->
      </el-header>
      <el-main style="padding:10px;height: 100%">
        <div style="height: 100%" >
         <router-view  style="height: 100%"/>
        </div>
      </el-main>
      <el-footer height="60">Create By HQP</el-footer>
    </el-container>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '/',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
       // console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  //text-align center
  color #2c3e50
 // margin-top 60px
.el-menu-demo
  height 30px
  line-height 30px
.el-menu-item
  height 30px
  line-height 30x
.el-footer
  border-top 1px solid #eee
  padding 5px
html,body,#app,.el-container
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
/* 一级菜单的样式 */
.el-menu--horizontal>.el-menu-item
  height: 30px;
  line-height: 30px;
.el-menu--horizontal>.el-menu-item,
.el-menu--horizontal>.el-submenu .el-submenu__title
  height: 30px;
  line-height: 30px;
.el-menu-item i
  color #eeeeee
</style>
