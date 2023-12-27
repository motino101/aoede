// Import the necessary modules from Firebase
import firebase from "firebase/app";
import "firebase/database";
import {
  initializeTestEnvironment,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import fs from "fs";
import { getUserSavedMessages, getUserConversations } from "../apis/msgConvoAPI";


// Initialize the test environment
let testEnv;

beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
        projectId: "aoede-f00ec",
        database: {
            rules: fs.readFileSync("database.rules.json", "utf8"),
            host: 'localhost',
            port: 9000  // Make sure this is the correct port for your Realtime Database emulator
        }
    });
});

// Define the test suite
describe('Realtime Database messages tests', () => {
    test('retrieves saved messages correctly', async () => {
        const uid = 'testUser';
        const mockData = {
            message1: {
                "Content": "hi there",
                "Language": "English",
                "Level": "Beginner",
            }
        };

        // // Seed the database emulator with mock data
        // await testEnv.withSecurityRulesDisabled(async (context) => {
        //     const adminDb = context.database();
        //     await adminDb.ref(`userSavedMessages/${uid}`).set(mockData);
        // });

        // Test the getUserSavedMessages API function
        await assertSucceeds(
            getUserSavedMessages(uid).then(data => {
            expect(data).toEqual(mockData);
        }));

        // Test read operation
        await assertSucceeds(testEnv.unauthenticatedContext().database().ref(`userSavedMessages/${uid}`).get());
    });

    // Additional tests can be added here
    test('retrieves saved conversations correctly', async () => {
        const uid = 'userId_1';
        const mockData = {
            conversationId_1: {
                "Saved": true,
                "Scenario": "Ordering food",
                "Language": "English",
                "Level": "Beginner",
            }
        };

        // // Seed the database emulator with mock data
        // await testEnv.withSecurityRulesDisabled(async (context) => {
        //     const adminDb = context.database();
        //     await adminDb.ref(`userSavedConversations/${uid}`).set(mockData);
        // });

        // Test the getUserSavedMessages API function
        await assertSucceeds(
            getUserConversations(uid).then(data => {
            expect(data).toEqual(mockData);
        }));

        // Test read operation
        await assertSucceeds(testEnv.unauthenticatedContext().database().ref(`userSavedConversations/${uid}`).get());
    });
});

// Clean up after all tests are done
afterAll(async () => {
  await testEnv.cleanup();
});
