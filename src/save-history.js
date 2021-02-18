'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
const copydir = require('copy-dir');
const fs = require('fs');

exports['default'] = function (appRootPath, allureConfig) {
    const reportDir = '' + appRootPath + allureConfig.REPORT_DIR;
    const resultDir = '' + appRootPath + allureConfig.RESULT_DIR;
    const reportHistory = reportDir + '/history';
    const resultHistory = resultDir + '/history';

    if (fs.existsSync(reportHistory)) {
        if (!fs.existsSync(resultHistory)) 
            fs.mkdirSync(resultHistory);
    
        copydir.sync(reportHistory, resultHistory);
    }
};

module.exports = exports['default'];
