// Get users's saved messages
import { database, auth } from './configs/firebaseConfig'
import { getDatabase, ref, child, get, onValue } from "firebase/database";

// Get users's saved messages. returns structure: { m1: {"Content":..., "Language":..., "Level":...}, m2: ... })
function getUserSavedMessages(uid) {
    const userMessagesRef = ref(database, `userSavedMessages/${uid}`);
    onValue(userMessagesRef, (snapshot) => {
        const data = snapshot.val();
        return data;
    });
}

// Get users's saved convos

// Get user's convo history

// Get user's message info

// Get conversation info

export { getUserSavedMessages };