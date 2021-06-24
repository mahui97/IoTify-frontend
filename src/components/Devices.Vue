<template>
  <el-container>
    <el-header>
      <NavBar></NavBar>
    </el-header>
    <el-main>
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick">
        <el-tab-pane label="所有设备" name="0">
          <!-- <span slot="label"><i class="el-icon-date"></i> 所有设备</span> -->
          <el-row class="abstract">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-wangguan_zaixian"></use>
            </svg>
            <h3 class="left">
              共发现了
              <span class="device-number">{{ devicesNumber }}</span> 个设备
            </h3>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-row>
                <svg class="icon icon-devices" aria-hidden="true">
                  <use xlink:href="#icon-Wi-Fi"></use>
                </svg>
              </el-row>
              <el-row
                >Wi-Fi设备：<span class="device-number">{{
                  wifi.number
                }}</span></el-row
              >
              <el-row class="scan-time-center"
                >更新：{{ wifi.lastScanTime | formatDate }}</el-row
              >
            </el-col>
            <el-col :span="8">
              <el-row>
                <svg class="icon icon-devices" aria-hidden="true">
                  <use xlink:href="#icon-lanya"></use>
                </svg>
              </el-row>
              <el-row
                >蓝牙设备：<span class="device-number">{{
                  bluetooth.number
                }}</span></el-row
              >
              <el-row class="scan-time-center"
                >更新：{{ bluetooth.lastScanTime | formatDate }}</el-row
              >
            </el-col>
            <el-col :span="8">
              <el-row>
                <svg class="icon icon-devices" aria-hidden="true">
                  <use
                    xlink:href="#icon-zuocedaohangshiliangtubiao_ZigBee"
                  ></use>
                </svg>
              </el-row>
              <el-row
                >ZigBee设备：<span class="device-number">{{
                  zigbee.number
                }}</span></el-row
              >
              <el-row class="scan-time-center"
                >更新：{{ zigbee.lastScanTime | formatDate }}</el-row
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-row>
                <svg class="icon icon-devices" aria-hidden="true">
                  <use xlink:href="#icon-LoRawulian"></use>
                </svg>
              </el-row>
              <el-row
                >LoRa设备：<span class="device-number">{{
                  lora.number
                }}</span></el-row
              >
              <el-row class="scan-time-center"
                >更新：{{ lora.lastScanTime | formatDate }}</el-row
              >
            </el-col>
            <el-col :span="8">
              <el-row>
                <svg class="icon icon-devices" aria-hidden="true">
                  <use xlink:href="#icon-rfid1"></use>
                </svg>
              </el-row>
              <el-row
                >RFID标签：<span class="device-number">{{
                  rfid.number
                }}</span></el-row
              >
              <el-row class="scan-time-center"
                >更新：{{ rfid.lastScanTime | formatDate }}</el-row
              >
            </el-col>
            <el-col :span="8">
              <el-row>
                <svg class="icon icon-devices" aria-hidden="true">
                  <use xlink:href="#icon-qrcode1"></use>
                </svg>
              </el-row>
              <el-row
                >二维码/条形码：<span class="device-number">{{
                  ocr.number
                }}</span></el-row
              >
              <el-row class="scan-time-center"
                >更新：{{ ocr.lastScanTime | formatDate }}</el-row
              >
            </el-col>
          </el-row>
          <el-row style="height: 60px"></el-row>
          <el-row>
            <el-button class="scan-button-center" @click="scan($event)"
              >扫描设备</el-button
            >
          </el-row>
          <el-row class="scan-time-center"
            >默认每10分钟更新一次设备信息，点击按钮可手动扫描设备</el-row
          >
        </el-tab-pane>
        <el-tab-pane label="Wi-Fi设备" name="1">
          <el-row class="abstract">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-Wi-Fi"></use>
            </svg>
            <h3 class="left">
              共发现了 <span class="device-number">{{ wifi.number }}</span> 个
              Wi-Fi 设备
            </h3>
            <div>
              <div style="height: 40px"></div>
              <el-button
                type="primary"
                class="scan-button"
                @click="scanWifi($event)"
                >扫描设备</el-button
              >
            </div>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row
            type="card"
            v-for="(wifiDev, index) in wifi.devices"
            :key="index"
          >
            <el-card
              :body-style="{ padding: '0px' }"
              style="margin-bottom: 20px; height: 80px; border-radius: 10px"
            >
              <div>
                <el-tooltip
                  v-if="wifiDev.isNormal === 'False'"
                  class="item"
                  effect="dark"
                  content="该设备正常"
                  placement="bottom-start"
                >
                  <el-image
                    class="type-image left"
                    :src="abnormalImageUrl"
                  ></el-image>
                </el-tooltip>
                <el-tooltip
                  v-else
                  class="item"
                  effect="dark"
                  content="该设备正常"
                  placement="bottom-start"
                >
                  <el-image
                    class="type-image left"
                    :src="normalImageUrl"
                  ></el-image>
                </el-tooltip>
              </div>
              <div class="vertical-bar left"></div>
              <div class="left">
                <div class="handle-id width500">{{ wifiDev.handleID }}</div>
                <el-row class="scan-time">
                  上次更新时间：<time class="scan-time">{{
                    wifi.lastScanTime | formatDate
                  }}</time>
                </el-row>
              </div>
              <div
                class="information"
                @click="getDetails('Wi-Fi', wifi.lastScanTime, wifiDev)"
              >
                <el-row class="infor-row">
                  <svg class="icon icon-yanjing" aria-hidden="true">
                    <use xlink:href="#icon-yanjing-"></use>
                  </svg>
                </el-row>
                <el-row style="font-size: 15px; line-height: 1.3"
                  ><span>详情</span></el-row
                >
              </div>
              <div class="vertical-bar right"></div>
            </el-card>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="蓝牙设备" name="2">
          <el-row class="abstract">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-lanya"></use>
            </svg>
            <h3 class="left">
              共发现了
              <span class="device-number">{{ bluetooth.number }}</span>
              个蓝牙设备
            </h3>
            <div>
              <div style="height: 40px"></div>
              <el-button
                type="primary"
                class="scan-button"
                @click="scanBluetooth($event)"
                >扫描设备</el-button
              >
            </div>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row
            type="card"
            v-for="(bluetoothDev, index) in bluetooth.devices"
            :key="index"
          >
            <el-card
              :body-style="{ padding: '0px' }"
              style="margin-bottom: 20px; height: 80px; border-radius: 10px"
            >
              <div>
                <el-tooltip
                  v-if="bluetoothDev.isNormal === 'False'"
                  class="item"
                  effect="dark"
                  content="该设备正常"
                  placement="bottom-start"
                >
                  <el-image
                    class="type-image left"
                    :src="abnormalImageUrl"
                  ></el-image>
                </el-tooltip>
                <el-tooltip
                  v-else
                  class="item"
                  effect="dark"
                  content="该设备正常"
                  placement="bottom-start"
                >
                  <el-image
                    class="type-image left"
                    :src="normalImageUrl"
                  ></el-image>
                </el-tooltip>
              </div>
              <div class="vertical-bar left"></div>
              <div class="left">
                <div class="handle-id width500">
                  {{ bluetoothDev.handleID }}
                </div>
                <el-row class="scan-time">
                  上次更新时间：<time class="scan-time">{{
                    bluetooth.lastScanTime | formatDate
                  }}</time>
                </el-row>
              </div>
              <div
                class="information"
                @click="
                  getDetails('Bluetooth', bluetooth.lastScanTime, bluetoothDev)
                "
              >
                <el-row class="infor-row">
                  <svg class="icon icon-yanjing" aria-hidden="true">
                    <use xlink:href="#icon-yanjing-"></use>
                  </svg>
                </el-row>
                <el-row style="font-size: 15px; line-height: 1.3"
                  ><span>详情</span></el-row
                >
              </div>
              <div class="vertical-bar right"></div>
            </el-card>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="ZigBee设备" name="3">
          <el-row class="abstract">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-zuocedaohangshiliangtubiao_ZigBee1"></use>
            </svg>
            <h3 class="left">
              共发现了 <span class="device-number">{{ zigbee.number }}</span> 个
              ZigBee 设备
            </h3>
            <div>
              <div style="height: 40px"></div>
              <el-button
                type="primary"
                class="scan-button"
                @click="scanZigbee($event)"
                >扫描设备</el-button
              >
            </div>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row
            type="card"
            v-for="(zigbeeDev, index) in zigbee.devices"
            :key="index"
          >
            <el-card
              :body-style="{ padding: '0px' }"
              style="margin-bottom: 20px; height: 80px; border-radius: 10px"
            >
              <div>
                <el-tooltip
                  v-if="zigbeeDev.isNormal === 'False'"
                  class="item"
                  effect="dark"
                  content="该设备正常"
                  placement="bottom-start"
                >
                  <el-image
                    class="type-image left"
                    :src="abnormalImageUrl"
                  ></el-image>
                </el-tooltip>
                <el-tooltip
                  v-else
                  class="item"
                  effect="dark"
                  content="该设备正常"
                  placement="bottom-start"
                >
                  <el-image
                    class="type-image left"
                    :src="normalImageUrl"
                  ></el-image>
                </el-tooltip>
              </div>
              <div class="vertical-bar left"></div>
              <div class="left">
                <div class="handle-id width500">{{ zigbeeDev.handleID }}</div>
                <el-row class="scan-time">
                  上次更新时间：<time class="scan-time">{{
                    zigbee.lastScanTime | formatDate
                  }}</time>
                </el-row>
              </div>
              <div
                class="information"
                @click="getDetails('ZigBee', zigbee.lastScanTime, zigbeeDev)"
              >
                <el-row class="infor-row">
                  <svg class="icon icon-yanjing" aria-hidden="true">
                    <use xlink:href="#icon-yanjing-"></use>
                  </svg>
                </el-row>
                <el-row style="font-size: 15px; line-height: 1.3"
                  ><span>详情</span></el-row
                >
              </div>
              <div class="vertical-bar right"></div>
            </el-card>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="LoRa设备" name="4"></el-tab-pane>
        <el-tab-pane label="RFID标签" name="5">
          <el-row class="abstract">
            <svg class="icon icon-devices left" aria-hidden="true">
              <use xlink:href="#icon-rfid1"></use>
            </svg>
            <h3 class="left">
              共发现了 <span class="device-number">{{ rfid.number }}</span> 个
              RFID 标签
            </h3>
            <div>
              <div style="height: 40px"></div>
              <el-button
                type="primary"
                class="scan-button"
                @click="scanRFID($event)"
                >扫描设备</el-button
              >
            </div>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row
            type="card"
            v-for="(rfidTag, index) in rfid.devices"
            :key="index"
          >
            <el-card
              :body-style="{ padding: '0px' }"
              style="margin-bottom: 20px; height: 80px; border-radius: 10px"
            >
              <div>
                <el-tooltip
                  v-if="rfidTag.isNormal === 'False'"
                  class="item"
                  effect="dark"
                  content="该设备正常"
                  placement="bottom-start"
                >
                  <el-image
                    class="type-image left"
                    :src="abnormalImageUrl"
                  ></el-image>
                </el-tooltip>
                <el-tooltip
                  v-else
                  class="item"
                  effect="dark"
                  content="该设备正常"
                  placement="bottom-start"
                >
                  <el-image
                    class="type-image left"
                    :src="normalImageUrl"
                  ></el-image>
                </el-tooltip>
              </div>
              <div class="vertical-bar left"></div>
              <div class="left">
                <div class="handle-id width500">{{ rfidTag.handleID }}</div>
                <el-row class="scan-time">
                  上次更新时间：<time class="scan-time">{{
                    rfid.lastScanTime | formatDate
                  }}</time>
                </el-row>
              </div>
              <div
                class="information"
                @click="getDetails('RFID', rfid.lastScanTime, rfidTag)"
              >
                <el-row class="infor-row">
                  <svg class="icon icon-yanjing" aria-hidden="true">
                    <use xlink:href="#icon-yanjing-"></use>
                  </svg>
                </el-row>
                <el-row style="font-size: 15px; line-height: 1.3"
                  ><span>详情</span></el-row
                >
              </div>
              <div class="vertical-bar right"></div>
            </el-card>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="二维码/条形码"></el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import NavBar from "@/include/NavBar";
export default {
  name: "Devices",
  components: { NavBar },
  data() {
    return {
      tabPosition: "left",
      devicesNumber: 0,
      normalImageUrl: require("@/assets/zhengchang.png"),
      abnormalImageUrl: require("@/assets/ic_warning.png"),
      deviceTypes: ["all", "Wi-Fi", "BlueTooth"],
      wifi: {
        number: 0,
        lastScanTime: new Date(),
        devices: [],
      },
      bluetooth: {
        number: 0,
        lastScanTime: new Date(),
        devices: [],
      },
      zigbee: {
        number: 0,
        lastScanTime: new Date(),
        devices: [],
      },
      rfid: {
        number: 0,
        lastScanTime: new Date(),
        devices: [],
      },
      lora: {
        number: 0,
        lastScanTime: new Date(),
        devices: [],
      },
      ocr: {
        number: 0,
        lastScanTime: new Date(),
        devices: [],
      },
      bluetoothDevices: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.name == "0") {
        // console.log("ready to scan...");
        // this.scan(event);
      } else if (tab.name == "1") {
        this.scanWifi(event);
      } else if (tab.name == "2") {
        this.scanBluetooth(event);
      } else if (tab.name == "3") {
        this.scanZigbee(event);
      } else if (tab.name == "5") {
        this.scanRFID(event);
      }
    },
    scanWifi: function (event) {
      let that = this;
      //从后台获取新的devices数据
      this.$api.post("/wifi", {}, (response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data); //请求成功，response为成功信息参数
          that.wifi.number = response.data.length;
          that.wifi.lastScanTime = new Date();
          that.wifi.devices = response.data;
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    },
    scanBluetooth: function (event) {
      let that = this;
      //从后台获取新的devices数据
      this.$api.post("/bluetooth", {}, (response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data); //请求成功，response为成功信息参数
          that.bluetooth.devices = response.data;
          that.bluetooth.lastScanTime = new Date();
          that.bluetooth.number = response.data.length;
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    },
    scanZigbee: function (event) {
      let that = this;
      //从后台获取新的devices数据
      this.$api.post("/zigbee", {}, (response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data); //请求成功，response为成功信息参数
          that.zigbee.devices = response.data;
          that.zigbee.lastScanTime = new Date();
          that.zigbee.number = response.data.length;
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    },
    scanRFID: function (event) {
      let that = this;
      //从后台获取新的devices数据
      this.$api.post("/rfid", {}, (response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data); //请求成功，response为成功信息参数
          that.rfid.devices = response.data;
          that.rfid.lastScanTime = new Date();
          that.rfid.number = response.data.length;
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    },
    scan: function (event) {
      //获取所有设备的数据
      console.log("scaning...");
      let that = this;
      //从后台获取新的devices数据
      this.$api.post("/all", {}, (response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data); //请求成功，response为成功信息参数

          that.zigbee.number = response.data.zigbee.length;
          that.zigbee.lastScanTime = new Date();
          that.zigbee.devices = response.data.zigbee;

          that.bluetooth.devices = response.data.bluetooth;
          that.bluetooth.lastScanTime = new Date();
          that.bluetooth.number = response.data.bluetooth.length;

          that.wifi.number = response.data.wifi.length;
          that.wifi.lastScanTime = new Date();
          that.wifi.devices = response.data.wifi;

          that.rfid.number = response.data.rfid.length;
          that.rfid.lastScanTime = new Date();
          that.rfid.devices = response.data.rfid;

          that.devicesNumber =
            that.zigbee.number +
            that.wifi.number +
            that.bluetooth.number +
            that.rfid.number;
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
      // if(this.timer) {
      //     clearInterval(this.timer);
      // } else {
      //     this.timer = setInterval(() => {
      //         this.scan($event);
      //         // setTimeout(this.scan(), 0);
      //     }, 600000);
      // }
    },
    getDetails: function (ptcl, lst, curDev) {
      console.log(curDev);
      console.log("protocol:");
      // console.log(ptcl);
      var paras = {
        handleID: curDev.handleID,
        protocol: ptcl,
        lastScanTime: lst,
        type: curDev.type,
        staticID: curDev.staticID,
        isNormal: curDev.isNormal,
      };
      if (ptcl == "Wi-Fi") {
        paras.ipAddress = curDev.ipAddress;
      } else if (ptcl == "RFID") {
        paras.phaseShift = curDev.phaseShift;
      }
      // this.$router.push({name:'device',params:{id: handleId}});
      console.log(paras);
      this.$router.push({
        path: `/device`,
        query: paras,
      });
    },
  },
  mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.scan(event);
        // setTimeout(this.scan(), 0);
      }, 600000);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  },
  created() {
    // this.scan(event);
    // NavBar.activeIndex = '1';
  },
};
</script>
<style scoped>
.abstract {
  vertical-align: bottom;
  text-align: center;
}
.scan-button-center {
  width: 300px;
  background-color: #409eff;
  color: #ffffff;
}
.scan-button {
  float: right;
  width: 200px;
  background-color: #409eff;
  color: #ffffff;
}
/* .el-row {
    display: flex;
    align-items: center;
    margin: auto;
} */
.type-image {
  height: 50px;
  width: 50px;
  margin: 15px;
}
.vertical-bar {
  width: 1px;
  height: 80px;
  background: #d7d7d7;
  /* display: inline-block; */
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: middle;
  text-align: center;
}

.scan-time-center {
  height: 25px;
  line-height: 1.7;
  font-size: 14px;
  color: #909399;
  text-align: center;
}
.icon-yanjing {
  height: 45px;
  width: 45px;
  /* margin-left: 12.5px;
    margin-right: 12.5px; */
}

.information {
  float: right;
  vertical-align: middle;
  height: 80px;
  width: 80px;
}
.infor-row {
  line-height: 50px;
  font-size: 50px;
}
</style>