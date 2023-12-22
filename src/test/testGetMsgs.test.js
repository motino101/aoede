const { getDatabase, ref, onValue } = require("firebase/database");
const { testEnv } = require('./testSetup');

describe('getUserSavedMessages', () => {
    it('retrieves saved messages correctly', async (done) => {
        // set mock data
        const uid = 'testUser';
        const mockData = { /* ... */ };

        // Seed the database emulator with mock data
        const db = getDatabase(testEnv.getAdminApp());
        await db.ref(`userSavedMessages/${uid}`).set(mockData);

        // Mock the function to test
        function getUserSavedMessages(uid) {
            const userMessagesRef = ref(db, `userSavedMessages/testUser`);
            onValue(userMessagesRef, (snapshot) => {
                const data = snapshot.val();
                try {
                    expect(data).toEqual(mockData);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        }

        getUserSavedMessages(uid);
    });
});
