// 新建一个 GitHub 仓库 node-demo-1 来存放你的代码，只需要有一个 server.js 文件即可
// 运行 node server.js 8888 可以成功监听 8888 端口
// 访问 http://localhost:8888 得到一个 HTML 页面，页面里面有一个 h1 标签，并且页面会请求一个 style.css
// style.css 内容为 h1{color: red}
// 访问其他未知路径一律提示「你访问的页面不存在」，并且状态码为 404


const http = require("http");
const url = require("url");
let port = process.argv[2] || process.env.PORT;
let server = http.createServer();

if (!port) {
    console.log("麻烦指定一下端口号");
    process.exit(1); //触发exit事件
}

server.on("request", (request, response) => {
    const method = request.method.toLowerCase();
    const { pathname: path, searchParams: query, search } = new url.URL(request.url, `http://localhost:${port}`);
    console.log(`有请求发送:  路径为:${path},  查询参数为:${search}`);
    if (method === "get") {
        if (path === "/") {
            response.writeHead(200, {
                "Content-Type": "text/html;charset=utf-8"
            });
            response.write(`
                <link rel="stylesheet" href="/style">
                <h1>泥嚎~</h1>
            `);
        } else if (path === "/style") {
            response.writeHead(200, {
                "Content-Type": "text/css;charset=utf-8"
            });
            response.write("h1 { color: red }");
        } else {
            response.statusCode = 404;
            response.setHeader("Content-Type", "text/html;charset=utf-8");
            response.write("您访问的页面不存在");

        }
    }
    response.end();
});
server.listen(port);
console.log("服务器启动成功");


// exprss框架中的send方法会自动识别文件类型和状态码，路由更清晰
// const { request, response } = require("express");
// const url = require("url");
// let port = process.argv[2] || process.env.PORT;
// const express = require("express");
// if (!port) {
//     console.log("麻烦指定一下端口号");
//     process.exit(1);
// }
// const server = express();
// server.use((request, response, next) => {
//     const { pathname: path, searchParams: query, search } = new url.URL(request.url, `http://localhost:${port}`);
//     console.log(`有请求发送:  路径为:${path},  查询参数为:${search}`);
//     next();
// })
// server.get("/", (request, response) => {
//     response.send(`
//         <link rel="stylesheet" href="/style">
//         <h1>泥嚎~~~</h1>
//     `);
// });
// server.get("/style", (request, response) => {
//     response.send(`h1 { color: red }`);
// });
// server.use((request, response) => {
//     response.status(404).send("您访问的页面不存在");
// })
// server.listen(port);