<template>
  <div>
    <el-container>
      <el-header>
        <NavBar></NavBar>
      </el-header>
      <el-main>
        <div style="height: 50px">
          <el-image
            style="width: 200px; height: 200px"
            :src="require('@/assets/logo-square.jpg')"
          >
          </el-image>
        </div>
        <span style="font-family: 'kaiti SC bold'"
          >欢迎来到物联网标识管理系统</span
        >
        <span style="font-family: 'Comic Sans MS'">IoTify</span>！
        <div style="height: 200px"></div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
// import { component } from "vue/types/umd";

import NavBar from "../include/NavBar";
export default {
  name: "HomePage",
  components: { NavBar },
  data() {
    return {
      activeIndex: "1",
      buttonmsg: "测试按钮内容",
      searchKey: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    searchHandleID() {
      console.log("进入搜索页");
      console.log(this.searchKey);
    },
    goGate() {
      this.$router.push("/gate");
    },
  },
};
</script>
<style scoped>
.el-menu {
  padding: 0px;
  height: 55px;
  float: left;
}
.el-main {
  color: #ffffff;
  line-height: 630px;
  background: #0c020263 url("../../static/background.jpg") no-repeat;
  background-size: 100% 100%;
  font-size: 30px;
  vertical-align: middle;
  font-family: "Comic Sans MS";
}
</style>