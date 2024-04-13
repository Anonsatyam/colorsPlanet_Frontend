module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './colorsPlanet_Frontend/coverage'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'text-summary' }
        ]
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_DEBUG,
      autoWatch: true,
      browsers: ['ChromeHeadless'],
      customLaunchers: {
        ChromeHeadless: {
          base: 'Chrome',
          flags: ['--headless', '--disable-gpu', '--no-sandbox', '--remote-debugging-port=9222']
        }
      },
      singleRun: false,
      restartOnFileChange: true
    });
  };
  