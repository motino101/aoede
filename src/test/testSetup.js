const { initializeTestEnvironment } = require('@firebase/rules-unit-testing');

let testEnv;

beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
        projectId: "aoede-f00ec",
        database: {
            rules: "database.rules.json",
            host: 'localhost', // Typically 'localhost', adjust if different
            port: 9000,       // The port your Firebase database emulator runs on
        },
    });
});

afterAll(async () => {
    if (testEnv) {
        await testEnv.cleanup();
    }
});

module.exports = { testEnv };
