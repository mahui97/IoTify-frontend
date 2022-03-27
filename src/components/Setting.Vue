<template>
    <el-container>
        <el-header class="header">
            <NavBar></NavBar>
        </el-header>
        <el-main>
            <el-row>
            <div class="gate-title">
                <svg class="icon icon-wangguan_zaixian icon-devices" aria-hidden="true">
                    <use xlink:href="#icon-wangguan_zaixian"></use>
                </svg>
                我的测试网关
            </div>
            </el-row>
            <el-row>
                <h3 class="left">自动扫描间隔： <span class="device-number">{{ scanInterval }}</span> 分钟</h3>
            </el-row>
            <el-row>
                <h3 class="left">扫描设备种类</h3>
            </el-row>
            <el-row>
                <el-tag class="left"
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                    </el-tag>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import NavBar from "@/include/NavBar";
export default {
    name: 'Setting',
    components: {NavBar},
    data () {
        return {
            scanInterval: 10,
            dynamicTags: ['Wi-Fi', 'Bluetooth', 'Zigbee', 'RFID', 'LoRa', '二维码/条形码'],

        }
    },
    methods: {
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

    },
    create () {
        NavBar.activeIndex = '1';
    }
}
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
.el-tag {
    margin-right: 10px;
    font-weight: bold;
    font-size: 14px;
}
</style>