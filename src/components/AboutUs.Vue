<template>
  <el-container>
    <el-header class="header">
      <NavBar></NavBar>
    </el-header>
    <el-main>
      <el-row>
        <div class="gate-title">物联网标识网关介绍</div>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-image
            style="width: 400px; height: 400px"
            class="margin"
            :src="require('@/assets/gateway.jpeg')"
          >
          </el-image>
        </el-col>
        <el-col :span="6">
          <div class="margin text">
            物联网标识网关用于管理5种协议的设备，可以扫描到网关附近的设备，为设备赋予唯一的标识ID，并将其注册到网关。
          </div>
          <div class="margin text">
            其中，蓝牙模块、Wi-Fi模块和zigBee模块内置在树莓派中，RFID阅读器和天线外接于树莓派上。
          </div>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import NavBar from "@/include/NavBar";
export default {
  name: "AboutUs",
  components: { NavBar },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>
<style scoped>
.header {
  background-color: #444C63;
}
.margin {
  margin-top: 10px;
  margin-bottom: 10px;
}
.text {
  text-align: left;
}
</style>