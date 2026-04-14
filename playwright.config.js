const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    fullyParallel: true,
    reporter: [['list']],
    use: {
        baseURL: 'http://127.0.0.1:4173',
        trace: 'on-first-retry'
    },
    webServer: {
        command: 'python -m http.server 4173',
        url: 'http://127.0.0.1:4173/index.html',
        reuseExistingServer: true,
        timeout: 120000
    }
});
