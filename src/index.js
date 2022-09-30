'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
const appRoot = require('app-root-path');
const Allure = require('allure-js-commons');
const Runtime = require('allure-js-commons/runtime');
const fs = require('fs');
const saveHistory = require('./save-history.js');
const deleteAllureData = require('./delete-allure-data').deleteAllureData;
const deleteVideos = require('./delete-allure-data').deleteVideos;
const deleteScreenshots = require('./delete-allure-data').deleteScreenshots;
const generateConfig = require('./generateConfig').generateConfig;
const path = require('path');

const allureReporter = new Allure();

global.allure = new Runtime(allureReporter);
let reporterConfig;

try {
  reporterConfig = require(`${process.env.PWD}/doc-allure-config`);
} catch (err) {
  reporterConfig = {};
}

// Default configuration
allure.docAllureConfig = generateConfig(reporterConfig);

if (allure.docAllureConfig.COPY_HISTORY) saveHistory(appRoot.path, allure.docAllureConfig);

allureReporter.setOptions({ targetDir: '' + appRoot.path + allure.docAllureConfig.RESULT_DIR });
const labels = allure.docAllureConfig.labels;

const errorConfig = {
  beforeHook: '- Error in test.before hook -\n',
  assertionError: 'AssertionError',
  brokenError: 'BrokenTest',
  brokenErrorMessage:
    allure.docAllureConfig.labels.brokenTestMessage || 'This test has been broken',
  testSkipMessage:
    allure.docAllureConfig.labels.skippedTestMessage || 'This test has been skipped.',
  testPassMessage: allure.docAllureConfig.labels.passedTestMessage || 'This test has been passed.',
  testUnstableMessage:
    allure.docAllureConfig.labels.unstableTestMessage || 'This test has been unstable.',
};

const testStatusConfig = {
  passed: 'passed',
  skipped: 'skipped',
  failed: 'failed',
  broken: 'failed',
  unstable: 'unstable',
};

exports['default'] = function () {
  return {
    noColors: true,
    currentFixture: null,
    videos: [],
    videoMap: null,
    screenshotMap: null,

    report: {
      startTime: null,
      endTime: null,
      totalTime: 0,
      testStartTime: null,
      userAgents: null,
      passed: 0,
      total: 0,
      skipped: 0,
      fixtures: [],
      warnings: [],
    },

    reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
      console.log(labels.allureStartMessage);
      this.report.startTime = startTime;
      this.report.userAgents = userAgents;
      this.report.total = testCount;
      deleteAllureData(appRoot.path, allure.docAllureConfig);
    },

    reportFixtureStart: function reportFixtureStart(name, path, meta) {
      this.currentFixture = { name: name, path: path, tests: [], meta: meta };
      this.report.fixtures.push(this.currentFixture);
    },

    formatErrorObject: function formatErrorObject(errorText) {
      let errorMessage;

      let errorName;

      if (errorText.indexOf(errorConfig.assertionError) !== -1) {
        errorName = errorConfig.assertionError;
        errorMessage = errorText.substring(0, errorText.indexOf('\n\n'));
      } else if (errorText.indexOf(errorConfig.beforeHook) !== -1) {
        errorName = errorConfig.beforeHook;
        errorMessage = errorText.substring(
          errorConfig.beforeHook.length,
          errorText.indexOf('\n\n')
        );
      } else {
        errorName = errorConfig.brokenError;
        errorMessage = errorConfig.brokenErrorMessage;
      }
      return { errorName: errorName, errorMessage: errorMessage };
    },
    getTestEndTime: function getTestEndTime(testDuration, testStartTime) {
      return testDuration + testStartTime;
    },
    addEnvironment: function addEnvironment() {
      for (let i = 0; i < this.report.userAgents.length; i++)
        allure.addEnvironment(`Browser ${i + 1}: `, this.report.userAgents[i]);
    },
    addScreenshot: function addScreenshot(screenshotPath) {
      if (screenshotPath && fs.existsSync(screenshotPath)) {
        const img = fs.readFileSync(screenshotPath);

        allure.createAttachment(labels.screenshotLabel, new Buffer(img, 'base64'));
      }
    },
    addVideo: function addVideo(name) {
      name = name.replace(/(?:\r\n|\r|\n)/g, '');
      name = name.replace(/:/g, '');

      try {
        const videoOutput = allure.docAllureConfig.VIDEO_PATH;
        const path1 = path.resolve(videoOutput);
        const path2 = path.join(path1, `${name}`);
        const videoPath = path.join(path2, '1.mp4');

        if (videoPath && fs.existsSync(videoPath)) {
          const video = fs.readFileSync(videoPath);

          allure.createAttachment(labels.videoLabel, video, 'video/mp4');
        }
      } catch (error) {
        console.log(error);
      }
    },
    addJiraLinks: function addJiraLinks(meta) {
      if (meta && meta[allure.docAllureConfig.META.TEST_ID]) {
        const storyURL = allure.docAllureConfig.STORY_URL.replace(
          '{{ID}}',
          meta[allure.docAllureConfig.META.TEST_ID]
        );

        if (storyURL) allure.addArgument(allure.docAllureConfig.STORY_LABEL, storyURL);
      }
    },
    addFeatureInfo: function addFeatureInfo(meta, fixtureName) {
      let USER_STORY =
        this.currentFixture.meta &&
        this.currentFixture.meta[allure.docAllureConfig.META.USER_STORY];

      if (!USER_STORY) USER_STORY = meta && meta[allure.docAllureConfig.META.USER_STORY];

      let userAgents = '';

      for (let i = 0; i < this.report.userAgents.length; i++)
        userAgents += this.report.userAgents[i] + ', ';

      if (USER_STORY) {
        allure.feature(fixtureName);
        allure.story(USER_STORY);
      }
      let MODULE = meta && meta[allure.docAllureConfig.META.MODULE];

      if (MODULE) allure.epic(MODULE);

      let DESCRIPTION =
        this.currentFixture.meta &&
        this.currentFixture.meta[allure.docAllureConfig.META.DESCRIPTION];

      if (!DESCRIPTION) DESCRIPTION = meta && meta[allure.docAllureConfig.META.DESCRIPTION];

      if (DESCRIPTION) allure.description(DESCRIPTION);

      const DEVICE = meta && meta[allure.docAllureConfig.META.DEVICE];

      if (DEVICE) allure.addArgument(labels.deviceLabel, DEVICE);

      const LOCALE = meta && meta[allure.docAllureConfig.META.LOCALE];

      if (LOCALE) allure.addArgument(labels.localeLabel, LOCALE);

      const CHANNEL = meta && meta[allure.docAllureConfig.META.CHANNEL];

      if (CHANNEL) allure.addArgument(labels.channelLabel, CHANNEL);

      MODULE =
        this.currentFixture.meta && this.currentFixture.meta[allure.docAllureConfig.META.MODULE];
      if (!MODULE) MODULE = meta && meta[allure.docAllureConfig.META.MODULE];

      if (MODULE) allure.addArgument(labels.moduleLabel, MODULE);

      allure.addArgument(labels.userAgentLabel, userAgents);
    },
    reportTestStart: function reportTestStart(name, meta) {
      this.report.testStartTime = Date.now();
    },
    quarantineErrors: function quarantineErrors(testRunInfo) {
      let runId = 0;

      let quarantineErrors = '\n';

      if (testRunInfo.quarantine && Object.keys(testRunInfo.quarantine).length > 0) {
        Object.keys(testRunInfo.quarantine).forEach(k => {
          const error = testRunInfo.quarantine[k].errors;

          if (!testRunInfo.quarantine[k].passed && error)
            quarantineErrors += `\nRun ${++runId}: Failed - ${error[0].errMsg}`;
        });
      }
      return quarantineErrors;
    },
    reportTestDone: function reportTestDone(name, testRunInfo, meta) {
      const _this = this;

      allureReporter.startSuite(this.currentFixture.name);
      allureReporter.startCase(name, this.report.testStartTime);

      this.addEnvironment();
      this.addFeatureInfo(meta, this.currentFixture.name);
      allure.severity(meta ? meta[allure.docAllureConfig.META.SEVERITY] : '');
      this.addJiraLinks(meta);

      var testEndTime = this.getTestEndTime(testRunInfo.durationMs, this.report.testStartTime);

      var formattedErrs = testRunInfo.errs.map(function (err) {
        return _this.formatError(err);
      });

      const quarantineErrors = this.quarantineErrors(testRunInfo);

      if (testRunInfo.skipped) {
        const testInfo = {
          message: errorConfig.testSkipMessage,
          stack: 'no error',
        };

        allureReporter.endCase(testStatusConfig.skipped, testInfo, testEndTime);
      } else if (testRunInfo.unstable) {
        const testInfo = {
          message: errorConfig.testUnstableMessage,
          stack: quarantineErrors || 'no error',
        };

        allureReporter.endCase(testStatusConfig.unstable, testInfo, testEndTime);
      } else if (!formattedErrs || !formattedErrs.length) {
        const testInfo = {
          message: errorConfig.testPassMessage,
          stack: 'no error',
        };

        allureReporter.endCase(testStatusConfig.passed, testInfo, testEndTime);
      } else if (formattedErrs && formattedErrs.length) {
        const _formatErrorObject = this.formatErrorObject(formattedErrs[0]);

        const errorName = _formatErrorObject.errorName;
        const errorMessage = _formatErrorObject.errorMessage;

        const errorMsg = {
          name: errorName,
          message: errorMessage,
          stack: formattedErrs[0],
        };
        const testCafeErrorObject = testRunInfo.errs[0];

        this.addScreenshot(testCafeErrorObject.screenshotPath);
        this.addVideo(name);

        let testStatus = testStatusConfig.failed;

        if (errorName !== errorConfig.assertionError) testStatus = testStatusConfig.broken;

        allureReporter.endCase(testStatus, errorMsg, testEndTime);
      }

      allureReporter.endSuite();
    },

    reportTaskDone: function reportTaskDone(endTime, passed, warnings) {
      this.report.passed = passed;
      this.report.endTime = endTime;
      this.report.warnings = warnings;
      try {
        deleteVideos();
        deleteScreenshots();
      } catch (error) {
        console.log(error);
      }
      console.log(labels.allureClosedMessage);
    },
  };
};

module.exports = exports['default'];
