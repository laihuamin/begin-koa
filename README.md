## 项目的搭建
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
## 项目配置
先来看看package.json文件
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
第一部分是script
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
第二部分是dependencies
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
<b>配置环境</b>
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
<b>配置文件</b><br/>
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