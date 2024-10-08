var clc = require("cli-color");
const moment = require("moment");
const fs = require("fs");

const debugmode = process.env.DEBUG == "true" ? true : false
const logtofile = process.env.LOGTOFILE == "true" ? true : false

var erro = clc.red.bold;
var warn = clc.yellow;
var not = clc.blackBright;
var inf = clc.cyanBright;
var mok = clc.xterm(201)

function writeLogFile(message){
    fs.appendFileSync('api.log', message + '\n', (err) = {
        if (err) {
            error("Error writing to a log file: ", err)
        }
    })
}

function error(message){
    const timestamp = moment(new Date()).format("YYYY.MM.DD H:mm:ss")
    const ts = `[${timestamp}]: `;

    if(debugmode) console.log(ts + erro(message))
    if(logtofile) writeLogFile(ts + message)
}

function warning(message){
    const timestamp = moment(new Date()).format("YYYY.MM.DD H:mm:ss")
    const ts = `[${timestamp}]: `;

    if(debugmode) console.log(ts + warn(message))
    if(logtofile) writeLogFile(ts + message)
}

function info(message){
    const timestamp = moment(new Date()).format("YYYY.MM.DD H:mm:ss")
    const ts = `[${timestamp}]: `;

    if(debugmode) console.log(ts + inf(message))
    if(logtofile) writeLogFile(ts + message) 
}

function notice(message){
    const timestamp = moment(new Date()).format("YYYY.MM.DD H:mm:ss")
    const ts = `[${timestamp}]: `;

    if(debugmode) console.log(ts + not(message))
    if(logtofile) writeLogFile(ts + message)
}

function moka(message){
    const timestamp = moment(new Date()).format("YYYY.MM.DD H:mm:ss")
    const ts = `[${timestamp}]: `;

    if(debugmode) console.log(ts + mok(message))
    if(logtofile) writeLogFile(ts + message) 
}

module.exports = {error, info, moka, notice, warning}