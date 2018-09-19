const Koa = require('koa');

const app = module.exports = new Koa();

app.use(async function pageNotFound(ctx) {
    // 返回状态码
    ctx.status = 404;

    switch (ctx.accepts('html', 'json')) {
        case 'html':
            ctx.type = 'html';
            ctx.body = '<p>page not found</p>';
            break;
        case 'json':
            ctx.type = 'json';
            ctx.body = {
                message: 'Page Not Found'
            };
            break;
        default:
            ctx.type = 'text';
            ctx.body = 'Page Not Found'
    }
});

if(!module.parent) app.listen(3000);