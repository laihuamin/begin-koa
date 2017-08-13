# 项目的搭建
一开始搭建项目会云里雾里不知道从哪里入手，但是好在我们有项目生成工具，[koa-generator](https://github.com/17koa/koa-generator)<br/>
1、我们安装生成工具
```
npm install -g koa-generator
```
2、创建项目
```
koa2 hello-koa2
```
3、进入项目目录
```
cd hello-koa2
```
4、npm安装
```
npm install
```
5、开启项目
```
npm start
```
visit http://127.0.0.1:3000
# 项目配置
## 先来看看package.json文件
```
{
  "name": "hello-koa2",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "node bin/www",
    "dev": "./node_modules/.bin/nodemon bin/www",
    "prd": "pm2 start bin/www",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "debug": "^2.6.3",
    "koa": "^2.2.0",
    "koa-bodyparser": "^3.2.0",
    "koa-convert": "^1.2.0",
    "koa-json": "^2.0.2",
    "koa-logger": "^2.0.1",
    "koa-onerror": "^1.2.1",
    "koa-router": "^7.1.1",
    "koa-static": "^3.0.0",
    "koa-views": "^5.2.1",
    "pug": "^2.0.0-rc.1"
  },
  "devDependencies": {
    "nodemon": "^1.8.1"
  }
}

```
我们从里面挑出两部分来看<br/>
<strong>第一部分是script<strong>
```
"scripts": {
    "start": "node bin/www",
    "dev": "./node_modules/.bin/nodemon bin/www",
    "prd": "pm2 start bin/www",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
其实<b>npm strat</b>指令<br/>
其实就是执行script中的start，相当于在终端输入
```
node bin/www
```
他会加载 `node bin/www` 文件<br/>
有兴趣的可以去看一下这个模块.关于[npm scripts](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)这里有阮一峰老师的文章，可以看一下<br/>
<strong>第二部分是dependencies<strong>
```
"dependencies": {
    "debug": "^2.6.3",
    "koa": "^2.2.0",
    "koa-bodyparser": "^3.2.0",
    "koa-convert": "^1.2.0",
    "koa-json": "^2.0.2",
    "koa-logger": "^2.0.1",
    "koa-onerror": "^1.2.1",
    "koa-router": "^7.1.1",
    "koa-static": "^3.0.0",
    "koa-views": "^5.2.1",
    "pug": "^2.0.0-rc.1"
  },
```
这里表示的是已经安装的npm包的依赖，在文件中直接可以通风require引入<br/>
## 配置环境
可以使用node提供的process.env.NODE_DNV来设置<br/>
我们可以来测试一下，<br/>
在启动服务时输入指令
```
NODE_ENV=test npm start
```
我们可以在bin/www文件中添加配置
```
console.log("process.env.NODE_ENV=" + process.env.NODE_ENV);
```
然后终端中就会输出
```
process.env.NODE_ENV=test
```
所以我们可以在script标签中把环境配置好
```
"scripts": {
    "start": "NODE_ENV=development node bin/www",
    "dev": "./node_modules/.bin/nodemon bin/www",
    "prd": "pm2 start bin/www",
    "test": "NODE_ENV=test echo \"Error: no test specified\" && exit 1"
  },
```
## 配置文件
创建config目录，储存配置文件，然后创建development.js 、test.js 、index.js文件<br/>
development.js
```
module.exports = {
    env: 'development',  //开发环境
    port: '3001', //监听端口
    mongodb_url: '', //数据库地址
    redis_url: '', //redis地址
    redis_port: '' //redis端口
}
```
test.js
```
module.exports = {
    env: 'test',  //测试环境
    port: '3002', //监听端口
    mongodb_url: '', //数据库地址
    redis_url: '', //redis地址
    redis_port: '' //redis端口
}
```
index.js
```
const development_env = require('./development.js');
const test_env = require('./test.js');

module.exports = {
    development: development_env,
    test: test_env
}[process.env.NODE_ENV || 'development']
```
环境的配置文件已经准备完毕<br/>
接下来我们要配置一下 bin/www文件，添加如下代码
```
const config = require('../config');
console.log('port=' + config.port);
```
然后运行npm start 看一下终端的输出
```
port=3001
process.env.NODE_ENV=development
```
## 日志
<strong>1、koa-generator中已经自带了koa-logger</strong>
如果你需要按照时间或者按照文件大小，本地输出log文件的话，建议还是采用[log4js-node](https://github.com/nomiddlename/log4js-node)
```
// app.js中
const logger = require('koa-logger')
···
···
app.use(logger())
```
<strong>2、建议使用log4js</strong>
log4js提供了多个日志等级分类，同时也能替换console.log输出，另外他还可以按照文件大小或者日期来生成本地日志文件，还可以使用邮件等形式发送日志。

我们在这演示用info和error两种日志等级分别记录响应日志和错误日志。

<strong>3、log4js配置<strong>
在config目录中，新建log_config.js
```
```
log_util.js
```
var log4js = require('log4js');

var log_config = require('../config/log_config');

//加载配置文件
log4js.configure(log_config);

var logUtil = {};

var errorLogger = log4js.getLogger('errorLogger');
var resLogger = log4js.getLogger('resLogger');

//封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};

//封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};

//格式化响应日志
var formatRes = function (ctx, resTime) {
    var logText = new String();

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";
    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //响应状态码
    logText += "response status: " + ctx.status + "\n";

    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;

};

//格式化错误日志
var formatError = function (ctx, err, resTime) {
    var logText = new String();

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //错误名称
    logText += "err name: " + err.name + "\n";
    //错误信息
    logText += "err message: " + err.message + "\n";
    //错误详情
    logText += "err stack: " + err.stack + "\n";

    //错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
}

//格式化请求日志
var formatReqLog = function (req, resTime) {

    var logText = new String();

    var method = req.method;
    //访问方法
    logText += "request method: " + method + "\n";

    //请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n";

    //客户端ip
    logText += "request client ip:  " + req.ip + "\n";

    //开始时间
    var startTime;
    //请求参数
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
        // startTime = req.query.requestStartTime;
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        // startTime = req.body.requestStartTime;
    }
    //服务器响应时间
    logText += "response time: " + resTime + "\n";

    return logText;
}

module.exports = logUtil;
```
