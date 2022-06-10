const fs = require("fs");
const path = require("path");
var stripBom = require("strip-bom");
const log = require("./function/log.js");
var originalconfig = {
    botname: "JABD",
    admin: "",
    prefix: "/",
    logEvent: false,
    seflListen: false,
    spotify : {
        clientId: "97c3e7bd62554a2089e037cb7c1f8836",
        clientSecret: "b6609e7258154766822ca43565fa8932"
    },
    lang : "en_US"
}
function getCF(){
    if (fs.existsSync("./config.json")) {
        console.log('Đã Tìm Thấy File Config!');
        try{
            var rt = JSON.parse(stripBom(fs.readFileSync(path.join(__dirname, "config.json"), {encoding: "utf8"})));
            return rt;
        } catch (err){
            console.error(err);
            console.error("Không thể đọc dữ liệu File Config! Tiến hành dừng bot để tránh lỗi không mong muốn...");
            process.exit(100);
        }
    } else if (!fs.existsSync("./config.json")) {
        log.err('Chưa Tìm Thấy Config!')
        log.loaded('Khởi tạo Config File...');
        try{
            fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(originalconfig, null, 4)); 
            log.loaded('Tạo File Config Thành Công!')
        } catch (_) {
            log.err("Lỗi Khi Tạo Config!");
        }
        try{
            var rt = JSON.parse(stripBom(fs.readFileSync(path.join(__dirname, "config.json"), {encoding: "utf8"})));
            return rt;
        } catch (err){
            console.error(err);
            console.error("Không thể đọc dữ liệu File Config! Tiến hành dừng bot để tránh lỗi không mong muốn...");
            process.exit(100);
        }
    }
}

module.exports = getCF;
