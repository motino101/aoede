

import { getDatabase, ref, onValue } from "firebase/database";
import { database, auth} from './configs/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";

function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export { loginUser };