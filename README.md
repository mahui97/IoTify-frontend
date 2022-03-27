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

## 需要安装的组件：

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
## 部署到服务器
1. 本地打包，得到文件夹`./dist/`
```bash
npm run build
```
2. 服务器安装nginx
3. 拷贝`dist/`到服务器某目录下
```bash
scp -P 827 -r dist/ root@62.234.44.237:/root/
```
4. 修改nginx配置
```bash
vim /etc/nginx/nginx.conf
```
在`http {}`中添加：
```
http {
    # 这里是一些本来就有的配置
    ...
    server {
        listen       8080;       #监听 8099 端口
        server_name  62.234.44.237;  #本地
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /root/dist;   #访问路径，相当于Tomcat的ROOT，这里自己配
            index  index.html index.htm;   #访问index
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
            #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```
5. 运行nginx
```bash
sudo systemctl restart nginx
```
6. 访问服务器地址：[http://62.234.44.237:8080](http://62.234.44.237:8080)即可。

## 注意
这里面`package.json`中有一行代码
``` json
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --host 183.173.120.249",
```
里面的IP是自己要部署的机器的IP，启动时需要保证这个IP正确。

调用后端的IP在`./src/common/js/api.js`中，`common`记录的都是公用的css或者js，有需要可以从里面找。