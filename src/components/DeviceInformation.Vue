<template>
  <el-container>
    <el-header>
      <NavBar></NavBar>
    </el-header>
    <el-main>
      <el-row>
        <el-tooltip
          class="item"
          effect="dark"
          content="该设备正常"
          placement="bottom-start"
        >
          <el-image
            v-if="form.isNormal === 'False'"
            class="type-image left"
            :src="abnormalImageUrl"
          ></el-image>
          <el-image
            v-else
            class="type-image left"
            :src="normalImageUrl"
          ></el-image>
        </el-tooltip>
        <div class="left">
          <el-row
            class="handle-id"
            style="margin-top: 20px; margin-bottom: 20px"
            >{{ handleID }}</el-row
          >
          <el-row class="scan-time">
            上次扫描：<time class="scan-time">{{
              lastScanTime | formatDate
            }}</time>
          </el-row>
        </div>
        <div class="right">
          <svg
            v-if="protocolImg === 1"
            class="icon icon-devices right"
            aria-hidden="true"
          >
            <use xlink:href="#icon-Wi-Fi"></use>
          </svg>
          <svg
            v-else-if="protocolImg === 2"
            class="icon icon-devices right"
            aria-hidden="true"
          >
            <use xlink:href="#icon-lanya"></use>
          </svg>
          <svg
            v-else-if="protocolImg === 3"
            class="icon icon-devices right"
            aria-hidden="true"
          >
            <use xlink:href="#icon-zuocedaohangshiliangtubiao_ZigBee"></use>
          </svg>
          <svg
            v-else-if="protocolImg === 4"
            class="icon icon-devices right"
            aria-hidden="true"
          >
            <use xlink:href="#icon-LoRawulian"></use>
          </svg>
          <svg
            v-else-if="protocolImg === 5"
            class="icon icon-devices right"
            aria-hidden="true"
          >
            <use xlink:href="#icon-rfid1"></use>
          </svg>
          <svg v-else class="icon icon-devices right" aria-hidden="true">
            <use xlink:href="#icon-qrcode1"></use>
          </svg>
        </div>
      </el-row>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        disabled
        style="margin-left: 20px"
      >
        <el-form-item label="设备类型" style="text-align: left">
          {{ form.type }}
        </el-form-item>
        <el-form-item label="静态ID" style="text-align: left">
          {{ form.staticID }}
        </el-form-item>
        <el-form-item label="动态ID" style="text-align: left">
          {{ form.dynamicID }}
        </el-form-item>
        <el-form-item v-if="protocolImg < 4">
          <el-table
            ref="singleTable"
            :data="form.features"
            highlight-current-row
            style="width: 450px"
          >
            <el-table-column property="feature" width="80"> </el-table-column>
            <el-table-column property="value" label="设备值" width="120">
            </el-table-column>
            <el-table-column
              property="normalInterval"
              label="正常区间"
              width="120"
            >
            </el-table-column>
            <el-table-column property="status" label="状态"> </el-table-column>
          </el-table>
          <el-row style="color: orange" v-if="!form.isNormal">
            表格内红色值为异常值
          </el-row>
        </el-form-item>
        <el-form-item
          v-if="protocolImg === 1"
          label="IP地址"
          style="text-align: left"
        >
          {{ form.ipAddress }}
        </el-form-item>
        <el-form-item
          v-if="protocolImg === 5"
          label="相位偏移"
          style="text-align: left"
        >
          {{ form.phaseShift }}
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import NavBar from "@/include/NavBar";
export default {
  name: "DeviceInformation",
  components: { NavBar },
  data() {
    return {
      protocolImg: 0,
      handleID: "",
      lastScanTime: new Date(),
      normalImageUrl: require("@/assets/zhengchang.png"),
      abnormalImageUrl: require("@/assets/ic_warning.png"),
      form: {
        type: "血氧仪",
        staticID: "4C:3D:12:24:6F:8E",
        dynamicID: "25/10",
        features: [
          {
            feature: "RSSI",
            value: "25",
            normalInterval: "10~25",
            status: "正常",
          },
          {
            feature: "CSI",
            value: "10",
            normalInterval: "8~10",
            status: "正常",
          },
        ],
        ipAddress: "192.168.1.4",
        phaseShift: "",
        isNormal: false,
      },
    };
  },
  methods: {},
  created() {
    console.log(this.$route.query);
    this.handleID = this.$route.query.handleID;
    this.lastScanTime = this.$route.query.lastScanTime;
    if (this.$route.query.protocol == "Wi-Fi") {
      this.form.type = "手机";
      this.protocolImg = 1;
      this.form.ipAddress = this.$route.query.ipAddress;
    } else if (this.$route.query.protocol == "Bluetooth") {
      this.protocolImg = 2;
    } else if (this.$route.query.protocol == "ZigBee") {
      this.protocolImg = 3;
    } else if (this.$route.query.protocol == "RFID") {
      this.form.type = "RFID标签";
      this.protocolImg = 5;
      this.form.dynamicID = this.$route.query.phaseShift;
      this.form.phaseShift = this.$route.query.phaseShift;
    }
    this.form.staticID = this.$route.query.staticID;
    this.form.isNormal = this.$route.query.isNormal;
  },
};
</script>
<style scoped>
.type-image {
  height: 50px;
  width: 50px;
  margin: 15px;
}
</style>