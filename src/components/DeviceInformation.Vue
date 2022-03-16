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
          <!--<svg
            v-else-if="protocolImg === 4"
            class="icon icon-devices right"
            aria-hidden="true"
          >
            <use xlink:href="#icon-LoRawulian"></use>
          </svg>-->
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
        <el-form-item
          v-if="protocolImg == 1"
          label="信号强度"
          style="text-align: left"
        >
          {{ form.rssi }}
        </el-form-item>
        <el-form-item
          v-if="protocolImg == 2"
          label="设备类型"
          style="text-align: left"
        >
          {{ form.dev_class }}
        </el-form-item>
        <el-form-item
          v-if="protocolImg == 6"
          label="设备类型"
          style="text-align: left"
        >
          {{ form.type }}
        </el-form-item>
        <el-form-item
          v-if="needBarcodeDevClass"
          label="设备类型"
          style="text-align: left"
        >
          {{ form.dev_class }}
        </el-form-item>
        <el-form-item label="静态ID" style="text-align: left">
          {{ form.staticID }}
        </el-form-item>
        <el-form-item
          v-if="protocolImg == 2"
          label="时钟偏斜"
          style="text-align: left"
        >
          {{ form.offset }}
        </el-form-item>
        <el-form-item
          v-if="protocolImg == 3"
          label="链路质量"
          style="text-align: left"
        >
          {{ form.lqi }}
        </el-form-item>
        <el-form-item
          v-if="protocolImg === 5"
          label="阻抗相位"
          style="text-align: left"
        >
          {{ form.phaseShift }}
        </el-form-item>
        <el-form-item
          v-if="protocolImg === 6"
          label="纹理特征"
          style="text-align: left"
        >
          <div v-if="protocolImg == 6" id="texture_chart" class="chart"></div>
          <!-- {{ form.texture }} -->
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
        type: "",
        staticID: "4C:3D:12:24:6F:8E",
        rssi: 0.0,
        dev_class: "",
        offset: 0,
        lqi: 0.0,
        ipAddress: "",
        phaseShift: "",
        texture: "",
        isNormal: false,
      },
      needBarcodeDevClass: false,
    };
  },
  methods: {
    hasLetter: function (str) {
      console.log("hasLetter str: ");
      console.log(str);
      for (var i in str) {
        var asc = str.charCodeAt(i);
        if ((asc >= 65 && asc <= 90) || (asc >= 97 && asc <= 122)) {
          this.isQRcode = true;
          return;
        }
      }
      this.isQRcode = false;
    },
    drawChart: function (yList) {
      var len = yList.length;
      var xValue = new Array(len);
      var yValue = new Array(len);
      for (var i = 0; i < len; i++) {
        xValue[i] = i;
      }
      for (var i = 0; i < len; i++) {
        yValue[i] = parseFloat(yList[i]);
      }
      var tmp = document.getElementById("texture_chart");
      let txct = this.$echarts.init(tmp);
      txct.setOption({
        title: { text: "特征直方图" },
        tooltip: {},
        xAxis: {
          data: xValue,
        },
        yAxis: {},
        series: [
          {
            name: "特征值",
            type: "bar",
            data: yValue,
          },
        ],
      });
    },
  },
  created() {
    console.log(this.$route.query);
    this.handleID = this.$route.query.handleID;
    this.lastScanTime = this.$route.query.lastScanTime;
    this.form.staticID = this.$route.query.staticID;
    this.form.isNormal = this.$route.query.isNormal;

    if (this.$route.query.protocol == "Wi-Fi") {
      this.form.type = "手机";
      this.protocolImg = 1;
      this.form.rssi = this.$route.query.rssi;
    } else if (this.$route.query.protocol == "Bluetooth") {
      this.protocolImg = 2;
      this.form.offset = this.$route.query.offset;
      this.form.dev_class = this.$route.query.dev_class;
    } else if (this.$route.query.protocol == "ZigBee") {
      this.protocolImg = 3;
      this.form.lqi = this.$route.query.lqi;
    } else if (this.$route.query.protocol == "RFID") {
      this.form.type = "RFID标签";
      this.protocolImg = 5;
      // this.form.dynamicID = this.$route.query.phaseShift;
      this.form.phaseShift = this.$route.query.phaseShift;
    } else if (this.$route.query.protocol == "ocrcode") {
      this.protocolImg = 6;
      this.form.dev_class = this.$route.query.type;
      // this.hasLetter(this.form.staticID);

      if (this.$route.query.type == "QRCODE") {
        this.form.type = "二维码";
      } else {
        this.form.type = "条形码";
        this.needBarcodeDevClass = true;
      }
      console.log(this.form);

      // this.form.dynamicID = this.$route.query.texture;
      this.form.texture = this.$route.query.texture;
      
      // this.drawChart(this.form.texture);
    }
  },
  mounted() {
    if(this.protocolImg == 6) {
      this.drawChart(this.form.texture);
    }
  },
};
</script>
<style scoped>
.type-image {
  height: 50px;
  width: 50px;
  margin: 15px;
}
.chart {
  height: 300px;
  width: 600px;
}
</style>