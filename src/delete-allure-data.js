'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
const fs = require('fs');
const path = require('path');

const deleteEntireDirectory = function deleteEntireDirectory (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            const curPath = path + '/' + file;

            if (fs.lstatSync(curPath).isDirectory()) 
                deleteEntireDirectory(curPath);
            else 
                fs.unlinkSync(curPath);
      
        });
        fs.rmdirSync(path);
    }
};

const deleteOnlyFiles = function deleteOnlyFiles (path) {

    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            const curPath = path + '/' + file;

            if (fs.lstatSync(curPath).isDirectory()) 
                deleteEntireDirectory(curPath);
            else 
                fs.unlinkSync(curPath);
      
        });
    }
};


exports.deleteEntireDirectory = deleteEntireDirectory;

const deleteAllureData = function deleteAllureData (appRootPath, allureConfig) {
    const resultDir = '' + appRootPath + allureConfig.RESULT_DIR;
    const reportDir = '' + appRootPath + allureConfig.REPORT_DIR;

    if (allure.docAllureConfig.CLEAN_REPORT_DIR) {
        if (fs.existsSync(reportDir)) 
            deleteEntireDirectory(reportDir);
    
        if (fs.existsSync(resultDir)) 
            deleteEntireDirectory(resultDir);
    
    }
};

const deleteVideos = function deleteVideos () {

    if (allure.docAllureConfig.CLEAN_VIDEOS) {

        const videoOutput = allure.docAllureConfig.VIDEO_PATH;
        const path1 = path.resolve(videoOutput); // Part 1
        const dirs = fs.readdirSync(path1);
        const last = dirs[dirs.length - 1]; // pak de laatste (de meeste recente) video-map
        const videoDir = path.join(path1, `${last}`);

        if (fs.existsSync(videoDir)) 
            deleteEntireDirectory(videoDir);
    
    }
};

const deleteScreenshots = function deleteScreenshots () {

    if (allure.docAllureConfig.CLEAN_SCREENSHOTS) {

        const screenshotOutput = allure.docAllureConfig.SCREENSHOT_PATH;
        const path1 = path.resolve(screenshotOutput); // Part 1
        const dirs = fs.readdirSync(path1);
        const last = dirs[dirs.length - 1]; // pak de laatste (de meeste recente) screenshots-map
        const screenshotsDir = path.join(path1, `${last}`);

        if (fs.existsSync(screenshotsDir)) 
            deleteEntireDirectory(screenshotsDir);
    
    }
};

exports.deleteVideos = deleteVideos;
exports.deleteScreenshots = deleteScreenshots;
exports.deleteAllureData = deleteAllureData;
