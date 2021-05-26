const report = require('multiple-cucumber-html-reporter');
 
report.generate({
    jsonDir: './reports',
    reportPath: 'reports/htmlReports',
    openReportInBrowser:true,
    reportName: 'JelpitAutomatizadas',
    removeOriginalJsonReportFile: true,
    removeExistingJsonReportFile: true,
    metadata:{
        browser: {
            name: 'Firefox',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'macOs',
            version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Pruebas automatizadas para Jelpit '},
            {label: 'Release', value: '1.0.0'},
            {label: 'Cycle', value: 'B11221.34321'},
        ]
    }
});