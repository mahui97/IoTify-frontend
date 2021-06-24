<template>
    <div class="header">
        <router-link :to="{ path: '/'}">
            <el-image style="height:60px;width:165px;float:left;"
            :src="require('@/assets/logo-rectangle.jpg')">
            </el-image>
        </router-link>
        <el-menu router mode="horizontal" :default-active="$route.path"
        @select="handleSelect"
        background-color="#D7D7D7"
        text-color="#000000" active-text-color="#409EFF">
            <el-menu-item index="/gate">网关状态</el-menu-item>
            <el-menu-item index="/devices">设备信息</el-menu-item>
            <el-menu-item index="/setting">设置</el-menu-item>
            <el-menu-item index="/aboutus">关于我们</el-menu-item>
        </el-menu>
        <el-input v-if="notSearch" class="search-input input" placeholder="输入关键字搜索设备"
        v-model="searchKey" @keyup.enter.native="searchHandleID">
        <svg class="icon icon-sousuo" 
        slot="suffix" aria-hidden="true"
        @click="searchHandleID()">
            <use xlink:href="#icon-sousuo"></use>
        </svg>
        </el-input>
        <svg class="icon icon-searching" aria-hidden="true"
        v-else>
            <use xlink:href="#icon-sousuo"></use>
        </svg>
    </div>
</template>
<script> 
export default {
    name: 'NavBar',
    data () {
        return {
            activeIndex: '',
            // buttonmsg: '测试按钮内容',
            notSearch: 1,
            searchKey: ''
        }
    },
    methods: {
      handleSelect(key, keyPath) {
          this.notSearch = 1;
        console.log(key, keyPath);
      },
      searchHandleID() {
        this.notSearch = 0;
        this.$router.push({
            path: `/search`,
            query: {searchKey: this.searchKey}
        });
      },
    //   goHome() {
    //     this.$router.push('/');
    //   }
    },
    created: function (){
        
    }
}
</script>
<style scoped>
.header {
    margin: 0;
    padding: 0;
    background-color: #D7D7D7;
    color: #333;
    text-align: center;
    line-height: 60px;
    vertical-align: middle;
}

.el-menu {
    padding: 0px;
    height: 55px;
    float: left;
}

.input >>> .el-input__inner {
    border-radius: 30px;
}
.search-input {
    width: 240px;
    margin-right: 5px;
    float: right;
}

.icon-sousuo {
    margin-right: 5px;
    height: 16px;
    width: 16px;
}
.icon-searching {
    color: #409EFF;
    width: 27px;
    float: right;
    margin-right: 13px;
}
</style>