<template>
  <el-container>
    <el-header class="header">
      <NavBar></NavBar>
    </el-header>
    <el-main>
      <el-row>
        <div class="gate-title">
          <svg class="icon icon-wangguan_zaixian" aria-hidden="true">
            <use xlink:href="#icon-wangguan_zaixian"></use>
          </svg>
          我的测试网关
        </div>
      </el-row>
      <el-row>
        <el-tabs :tab-position="tabPostion">
          <el-tab-pane label="Wi-Fi">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-Wi-Fi"></use>
            </svg>
            <!-- <i class="iconfont icon-Wi-Fi" style="float: left; margin: 20px;"></i> -->
            <div style="float: left">
              <!-- <h3>Wi-Fi</h3> -->
              <p><span class="small-title">名称：</span>{{ wifi.name }}</p>
              <p>
                <span class="small-title">Handle ID: </span>{{ wifi.handleID }}
              </p>
              <p>
                <span class="small-title">技术标准：</span>{{ wifi.standard }}
              </p>
              <p>
                <span class="small-title">IP地址：</span>{{ wifi.IPaddress }}
              </p>
              <p>
                <span class="small-title">MAC地址：</span>{{ wifi.MACaddress }}
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="蓝牙">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-lanya"></use>
            </svg>
            <div style="float: left">
              <p><span class="small-title">名称：</span>{{ bluetooth.name }}</p>
              <p>
                <span class="small-title">Handle ID: </span
                >{{ bluetooth.handleID }}
              </p>
              <p>
                <span class="small-title">MAC地址：</span
                >{{ bluetooth.MACaddress }}
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Zigbee">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-zuocedaohangshiliangtubiao_ZigBee"></use>
            </svg>
            <div style="float: left">
              <p><span class="small-title">名称：</span>{{ zigbee.name }}</p>
              <p>
                <span class="small-title">Handle ID: </span
                >{{ zigbee.handleID }}
              </p>
              <p>
                <span class="small-title">MAC地址：</span
                >{{ zigbee.MACaddress }}
              </p>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="RFID">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-rfid1"></use>
            </svg>
            <div style="float: left">
              <p><span class="small-title">名称：</span>{{ rfid.name }}</p>
              <p>
                <span class="small-title">Handle ID: </span>{{ rfid.handleID }}
              </p>
              <p>
                <span class="small-title">MAC地址：</span>{{ rfid.MACaddress }}
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="二维码/条形码">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-qrcode1"></use>
            </svg>
            <div style="float: left">
              <p><span class="small-title">名称：</span>{{ ocrcode.name }}</p>
              <p>
                <span class="small-title">Handle ID: </span
                >{{ ocrcode.handleID }}
              </p>
              <p>
                <span class="small-title">MAC地址：</span
                >{{ ocrcode.MACaddress }}
              </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import NavBar from "@/include/NavBar";
export default {
  name: "GateState",
  components: { NavBar },
  data() {
    return {
      tabPostion: "left",
      wifi: {
        name: "IoTify-WiFi",
        handleID:
          "21.86103.2/ecfeb19c37ed28ee2a590a265a79c1187aa61a9c4378136aa6bc3b0ce9de346e",
        standard: "Wi-Fi 5",
        IPaddress: "192.168.3.1",
        MACaddress: "8c:f2:28:53:41:e6",
      },
      bluetooth: {
        name: "IoTify-bluetooth",
        handleID:
          "21.86103.2/c1f7bfa489898538a8f985a0ca13c0d7ce35ae7646af6f252af18b5ce86ca0e9",
        MACaddress: "e8:4e:06:7c:39:66",
      },
      zigbee: {
        name: "IoTify-zigbee",
        handleID:
          "21.86103.2/689d8427942b8f56e8130f84532299e2e619ce98cef1d9e7b7b01aeda09f919c",
        MACaddress: "0x00158d0004080a1f ",
      },
      lora: {
        name: "IoTify-lora",
        handleID: "",
        MACaddress: "",
      },
      rfid: {
        name: "IoTify-rfid",
        handleID:
          "21.86103.2/2ded99988688ad807dd90b01f34ecea738ee8fd9e31bc4d04b9822356a12268b",
        MACaddress: "3308-33B2-DDD9-06C0-0002-0017",
      },
      ocrcode: {
        name: "IoTify-ocrcode",
        handleID: "",
        MACaddress: "",
      },
    };
  },
  methods: {},
  created() {},
};
</script>
<style scoped>
.header {
  background-color: #444C63;
}
.icon-wangguan_zaixian {
  height: 100px;
  width: 100px;
  margin-left: 20px;
  vertical-align: middle;
}
.small-title {
  font-weight: 700;
}
.el-tabs {
  text-align: left;
  margin: 30px;
}
</style>