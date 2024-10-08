var clc = require("cli-color");
const moment = require('moment');
const fs = require('fs');

var err = clc.red.bold;
var warn = clc.xterm(208);
var not = clc.blackBright;
var inf = clc.xterm(201);

const debugmode = process.env.DEBUG;
const logtofile = process.env.LOGTOFILE;

function writeLogFile(message){
    fs.appendFileSync('api.log', message+ '\n', (err)=>{
        if (err) {
            error('Error writing to a log file: ', err);
        }
    })

}

function error(message){
    timestamp = moment(new Date()).format('YYYY.MM.DD H:mm:ss');
    const ts = `[${timestamp}]: `;
    if(debugmode) console.log(ts + err(message));
    if(logtofile) writeLogFile(ts + message);
}

function warning(message){
    timestamp = moment(new Date()).format('YYYY.MM.DD H:mm:ss');
    const ts = `[${timestamp}]: `;
    if(debugmode) console.log(ts + warn(message));
    if(logtofile) writeLogFile(ts + message);
}

function info(message){
    timestamp = moment(new Date()).format('YYYY.MM.DD H:mm:ss');
    const ts = `[${timestamp}]: `;
    if(debugmode) console.log(ts + inf(message));
    if(logtofile) writeLogFile(ts + message);

}

function notice(message){
    timestamp = moment(new Date()).format('YYYY.MM.DD H:mm:ss');
    const ts = `[${timestamp}]: `;
    if(debugmode) console.log(ts + not(message));
    if(logtofile) writeLogFile(ts + message);
}

module.exports = { error, warning, info, notice }
