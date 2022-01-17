# iotify-frontend

> IoTify's frontend project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

需要安装的组件：

1、安装webpack-cli等:
``` bash
sudo npm install -g webpack-cli
npm install webpack-cli -D
npm install style-loader stylus-loader css-loader less --save-dev
npm install less-loader@4.1.0
```
2、安装element-ui:
``` bash
npm install element-ui -S
```
3、vscode 插件：`vetur`

4、安装axios:
``` bash
npm install axios
```
5、安装echarts
```bash
npm install echarts --save-dev
```

## 注意
这里面`package.json`中有一行代码
``` json
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --host 183.173.120.249",
```
里面的IP是自己要部署的机器的IP，启动时需要保证这个IP正确。

调用后端的IP在`./src/common/js/api.js`中，`common`记录的都是公用的css或者js，有需要可以从里面找。