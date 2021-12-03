'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const generateConfig = function generateConfig(reporterConfig) {
  return {
    CLEAN_REPORT_DIR: reporterConfig.CLEAN_REPORT_DIR || false,
    COPY_HISTORY: reporterConfig.COPY_HISTORY || false,
    CLEAN_VIDEOS: reporterConfig.CLEAN_VIDEOS || false,
    CLEAN_SCREENSHOTS: reporterConfig.CLEAN_SCREENSHOTS || false,
    RESULT_DIR: reporterConfig.RESULT_DIR || '/allure/allure-results',
    REPORT_DIR: reporterConfig.REPORT_DIR || '/allure/allure-report',
    META: {
      TEST_ID: (reporterConfig.META && reporterConfig.META.TEST_ID) || 'ID',
      DEVICE: (reporterConfig.META && reporterConfig.META.DEVICE) || 'DEVICE',
      LOCALE: (reporterConfig.META && reporterConfig.META.LOCALE) || 'LOCALE',
      CHANNEL: (reporterConfig.META && reporterConfig.META.CHANNEL) || 'CHANNEL',
      BLOK: (reporterConfig.META && reporterConfig.META.BLOK) || 'BLOK',
      MODULE: (reporterConfig.META && reporterConfig.META.MODULE) || 'MODULE',
      SEVERITY: (reporterConfig.META && reporterConfig.META.SEVERITY) || 'SEVERITY',
      USER_STORY: (reporterConfig.META && reporterConfig.META.USER_STORY) || 'USER_STORY',
      DESCRIPTION: (reporterConfig.META && reporterConfig.META.DESCRIPTION) || 'DESCRIPTION',
    },
    STORY_LABEL: reporterConfig.STORY_LABEL || 'JIRA story link',
    STORY_URL: reporterConfig.STORY_URL || 'https://jira/browse/{{ID}}',
    VIDEO_PATH: reporterConfig.VIDEO_PATH || 'videos/',
    REPORTS_PATH: reporterConfig.REPORTS_PATH || 'reports/',
    SCREENSHOT_PATH: reporterConfig.SCREENSHOT_PATH || 'screenshots/',
    labels: {
      screenshotLabel:
        (reporterConfig.labels && reporterConfig.labels.screenshotLabel) || 'Screenshot',
      videoLabel: (reporterConfig.labels && reporterConfig.labels.videoLabel) || 'Video',
      reportsLabel: (reporterConfig.labels && reporterConfig.labels.reportsLabel) || 'Reports',
      browserLabel: (reporterConfig.labels && reporterConfig.labels.browserLabel) || 'Browser',
      userAgentLabel:
        (reporterConfig.labels && reporterConfig.labels.userAgentLabel) || 'User Agent',
      moduleLabel: (reporterConfig.labels && reporterConfig.labels.moduleLabel) || 'Module',
      localeLabel: (reporterConfig.labels && reporterConfig.labels.localeLabel) || 'Locale',
      channelLabel: (reporterConfig.labels && reporterConfig.labels.channelLabel) || 'Channel',
      deviceLabel: (reporterConfig.labels && reporterConfig.labels.deviceLabel) || 'Device',
      allureStartMessage:
        (reporterConfig.labels && reporterConfig.labels.allureStartMessage) ||
        'Allure reporter started...',
      allureClosedMessage:
        (reporterConfig.labels && reporterConfig.labels.allureClosedMessage) ||
        'Allure reporter closed...',
      brokenTestMessage:
        (reporterConfig.labels && reporterConfig.labels.brokenTestMessage) ||
        'This test has been broken',
      skippedTestMessage:
        (reporterConfig.labels && reporterConfig.labels.skippedTestMessage) ||
        'This test has been skipped.',
      passedTestMessage:
        (reporterConfig.labels && reporterConfig.labels.passedTestMessage) ||
        'This test has been passed.',
      unstableTestMessage:
        (reporterConfig.labels && reporterConfig.labels.unstableTestMessage) ||
        'This test has been unstable.',
    },
  };
};

exports.generateConfig = generateConfig;
