module.exports = {
    // 要监听的端口
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    // mongodb的地址
    mongodb: 'mongodb://localhost:27017/myblog'
}