<template>
    <el-container>
        <el-header>
            <NavBar></NavBar>
        </el-header>
        <el-main>
            <el-row>
                <el-input placeholder="请输入内容" v-model="searchKey">
                    <template slot="append">
                        <el-button @click="search">点击搜索</el-button>
                    </template>
                </el-input>
            </el-row>
            <el-row class="scan-time">共为您搜索到{{ devices.length }}条结果</el-row>
            <el-row style="height:20px;"></el-row>
            <el-row type="card" v-for="(dev, index) in devices" :key="index">
                <el-card :body-style="{ padding: '0px'}" style="margin-bottom: 20px; height:80px; border-radius:10px;">
                    <div>
                        <el-tooltip class="item" effect="dark" content="这是一部手机" placement="bottom-start">
                            <!-- <el-image class="type-image left" :src="typeImageUrl"></el-image> -->
                            <div>
                            <svg v-if="dev.protocol === 'Wi-Fi'" class="icon icon-protocol left" aria-hidden="true">
                                <use xlink:href="#icon-Wi-Fi"></use>
                            </svg>
                            <svg v-else-if="dev.protocol === 'Bluetooth'" class="icon icon-protocol left" aria-hidden="true">
                                <use xlink:href="#icon-lanya"></use>
                            </svg>
                            <svg v-else-if="dev.protocol === 'ZigBee'" class="icon icon-protocol left" aria-hidden="true">
                                <use xlink:href="#icon-zuocedaohangshiliangtubiao_ZigBee"></use>
                            </svg>
                            <svg v-else-if="dev.protocol === 'LoRa'" class="icon icon-protocol left" aria-hidden="true">
                                <use xlink:href="#icon-LoRawulian"></use>
                            </svg>
                            <svg v-else-if="dev.protocol === 'RFID'" class="icon icon-protocol left" aria-hidden="true">
                                <use xlink:href="#icon-rfid1"></use>
                            </svg>
                            <svg v-else class="icon icon-protocol left" aria-hidden="true">
                                <use xlink:href="#icon-qrcode1"></use>
                            </svg>
                            </div>
                        </el-tooltip>
                    </div>
                    <div class="vertical-bar left"></div>
                    <div class="left">
                        <div class="handle-id width500">{{ dev.handleID }}</div>
                        <el-row class="scan-time">
                            上次更新时间：<time class="scan-time">{{ lastScanTime | formatDate}}</time>
                        </el-row>
                    </div>
                    <div class="information" @click="getDetails(dev)">
                        <el-row class="infor-row">
                            <svg class="icon icon-yanjing" aria-hidden="true">
                                <use xlink:href="#icon-yanjing-"></use>
                            </svg>
                        </el-row>
                        <el-row style="font-size:15px;line-height:1.3;"><span>详情</span></el-row>
                    </div>
                    <div class="vertical-bar right"></div>
                </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>

import NavBar from '@/include/NavBar';
export default {
    name: 'Search',
    components: { NavBar },
    data () {
        return {
            searchKey: '' ,
            typeImageUrl: '',
            lastScanTime: new Date(),
            devices: []
        }
    },
    methods: {
        search: function() {
            var data = new FormData();
            data.append('keyword', this.searchKey);
            this.$api.post('/query', data, response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response.data);//请求成功，response为成功信息参数
                    if(response.data != '无查询结果！') {
                        this.devices = response.data;
                        this.lastScanTime = new Date();
                    } else {
                        this.devices = [];
                    }
                } else {
                    console.log(response.message);//请求失败，response为失败信息
                }
            });
        },
        getDetails: function(curDev) {
            console.log(curDev);
            var paras = {
                handleID: curDev.handleID,
                protocol: curDev.protocol,
                lastScanTime: this.lastScanTime,
                type: curDev.type,
                staticID: curDev.staticID,
                isNormal: curDev.isNormal
            }
            if(curDev.protocol == 'Wi-Fi') {
                paras.ipAddress = curDev.ipAddress;
            }
            // this.$router.push({name:'device',params:{id: handleId}});
            console.log(paras);
            this.$router.push({
                path: `/device`,
                query: paras
            })
        }
    },
    created() {
        this.searchKey = this.$route.query.searchKey;
        this.devices = [];
        this.search();
    }
}
</script>
<style scoped>
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