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
这里表示的是已经安装的npm包的依赖，在文件中直接可以通风require引入
