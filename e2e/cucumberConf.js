//protractor.conf.js
// username= process.env.LT_USERNAME || "andres.tabima@dreamcodesoft.com",
// accessKey=  process.env.LT_ACCESS_KEY || "7cHbT8svuda8CwsDxvNxCJ1WtliemaC3mUc7W2LhSNYer4006k",

exports.config = {
    
  //seleniumAddress: 'https://'+ username +':'+ accessKey  +'@hub.lambdatest.com/wd/hub',
  //directConnect : true,
  //resultJsonOutputFile:'./testResults.json', 
  getPageTimeout: 100000,
  allScriptsTimeout: 1000000,
  framework: 'custom', // set to "custom" instead of cucumber.
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  multiCapabilities: [
    // {
    //   "build" : "Develop v1.05",
    //   "name" : "OSX-Chrome",
    //   "platform" : "MacOS Catalina",
    //   "browserName" : "Chrome",
    //   "version" : "84.0",
    //   metadata: {
    //     browser: {
    //         name: 'chrome',
    //         version: '58'
    //     },
    //     device: 'MacBook Pro 1',
    //     platform: {
    //         name: 'OSX',
    //         version: '10.12.6'
    //     }
    //   }
    // },
    {
      'browserName': 'chrome',
      'chromeOptions': 
      { 
        //args: [ "--headless", "--disable-gpu", "--window-size=800,600", "--no-sandbox"]
      },
        metadata: {
          browser: {
              name: 'chrome',
              version: '82'
          },
          device: 'Windows 10',
          platform: {
              name: 'OS',
              version: '10.12.6'
          }
        }
    }

    // {
    //   "build" : "Develop v1.05",
    //   "name" : "W10-explorer",
    //   "platform" : "Windows 10",
    //   "browserName" : "Internet Explorer",
    //   "version" : "11.0",
    //   "ie.compatibility" : 11001,
    //   metadata: {
    //     browser: {
    //         name: 'Internet Explorer',
    //         version: '58'
    //     },
    //     device: 'MacBook Pro 2',
    //     platform: {
    //         name: 'Windows',
    //         version: '10.12.6'
    //     }
    //   }
    // },

    // {
    //   "build" : "Develop v1.05",
    //   "name" : "W10-Edge",
    //   "platform" : "Windows 10",
    //   "browserName" : "MicrosoftEdgeInsider",
    //   "version" : "79.0",
    //   metadata: {
    //     browser: {
    //         name: 'Microsoft Edge',
    //         version: '58'
    //     },
    //     device: 'MacBook Pro 3',
    //     platform: {
    //         name: 'Windows',
    //         version: '10.12.6'
    //     }
    //   }
    // },

    // {
    //   "build" : "Develop v1.05",
    //   "name" : "OSX-Safari",
    //   "platform" : "macOS Mojave",
    //   "browserName" : "Safari",
    //   "version" : "12.0",
    //   metadata: {
    //     browser: {
    //         name: 'Safari',
    //         version: '58'
    //     },
    //     device: 'MacBook Pro 4',
    //     platform: {
    //         name: 'MacOS Catalina',
    //         version: '10.12.6'
    //     }
    //   }
    // },
    // {
    //   "build" : "Develop v1.05",
    //   "name" : "W10-firefox",
    //   "platform" : "Windows 10",
    //   "browserName" : "Firefox",
    //   "version" : "78.0",
    //   metadata: {
    //     browser: {
    //         name: 'Firefox',
    //         version: '58'
    //     },
    //     device: 'MacBook Pro 5',
    //     platform: {
    //         name: 'Windows 10',
    //         version: '10.12.6'
    //     }
    //   }
    // },
    
  ],
  maxSessions: 1,
  // Spec patterns are relative to this directory.
  //maxSessions: 5,
  specs: [
    'tests/Feature/*.feature',
  ],

  cucumberOpts: {
    require: 'tests/Feature/Step_Defination/*.js',
    strict: true,                  // <boolean> fail if there are any undefined or pending steps
    tags: '@Smoke',
    format: ['json:./reports/Jelpit.json'],
    profile: false,
    'no-source': true
  },

  plugins: [{
    package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
    options:{
        // read the options part for more options
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        openReportInBrowser: true,
        removeExistingJsonReportFile: true,
        removeOriginalJsonReportFile: true,
        reportName:'Pruebas automatizadas Jelpit conjuntos',
        reportPath: 'reports/htmlReport',
        jsonOutputPath: 'reports/htmlReport',
        pageTitle:'Reporte de pruebas automatizadas Jelpit conjuntos',
        customData: {
          title: 'Run info',
          data: [
              {label: 'Project', value: 'Pruebas automatizadas para Jelpit '},
              {label: 'Release', value: '1.0.0'},
              {label: 'Cycle', value: 'B11221.34321'},
          ]
        }
    }
  }],

  onPrepare: function () {
    browser.getCapabilities().then(function (capabilities) {
      browserName = capabilities.get('browserName');
    });
    browser.manage().window().maximize(); // maximize the browser before executing the feature files
    // Load chai assertions
    const chai = require('chai');
    const chaiAsPromised = require('chai-as-promised');
    var expect = chai.expect;

    // Load chai-as-promised support
    chai.use(chaiAsPromised);

    // Initialise should API (attaches as a property on Object)
    chai.should();

    browser.getCapabilities().then(function (capabilities) {
      browserName = capabilities.get('browserName');
    });
  },
};