// Get users's saved messages
import { database, auth } from './configs/firebaseConfig'
import { getDatabase, ref, child, get, onValue } from "firebase/database";

// Get users's saved messages. returns structure: { m1: {"Content":..., "Language":..., "Level":...}, m2: ... })
function getUserSavedMessages(uid) {
    return new Promise((resolve, reject) => {
        const userMessagesRef = ref(database, `userSavedMessages/${uid}`);
        onValue(userMessagesRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data); // Resolve the promise with the data
        }, (error) => {
            reject(error); // Reject the promise if there's an error
        });
    });
}

// Get users's saved convos
function getUserConversations(uid) {
    return new Promise((resolve, reject) => {
        const userConvosRef = ref(database, `userConversationHistory/${uid}`);
        onValue(userConvosRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data); // Resolve the promise with the data
        }, (error) => {
            reject(error); // Reject the promise if there's an error
        });
    })
}


// Get user's convo history

// Get user's message info

// Get conversation info

export { getUserSavedMessages, getUserConversations };