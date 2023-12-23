// // Import the necessary modules from Firebase
// import firebase from "firebase/app";
// import "firebase/firestore";
// import {
//   initializeTestEnvironment,
//   assertSucceeds,
//   RulesTestEnvironment
// } from "@firebase/rules-unit-testing";
// import fs from "fs";

// // Initialize the test environment
// let testEnv;

// beforeAll(async () => {
//   testEnv = await initializeTestEnvironment({
//     projectId: "aoede-f00ec",
//     // firestore: {
//     //   rules: fs.readFileSync("path/to/your/firestore.rules", "utf8"),
//     // },
//     database: {
//       // rules: "../../../database.rules.json",
//       host: 'localhost',
//       port: 9000
//     }
//   });
// });

// // Define the test suite
// describe('Firestore messages tests', () => {
//   let aliceContext;

//   beforeAll(async () => {
//     // Create a test context for a user named 'alice'
//     aliceContext = testEnv.authenticatedContext("alice");
//   });

//   afterAll(async () => {
//     // Clean up the test context
//     await aliceContext.cleanup();
//   });

//   test('Alice should be able to read her messages', async () => {
//     // Assuming messages are stored in a collection 'messages' and each message has a field 'userId' to denote the user it belongs to
//     const messagesRef = aliceContext.firestore().collection("messages").where("userId", "==", "alice");
//     await assertSucceeds(messagesRef.get());
//   });

//   // Additional tests can be added here
// });

// // Clean up after all tests are done
// afterAll(async () => {
//   await testEnv.cleanup();
// });


// // async function getTestEnv() {

// //   console.log("Initializing test environment...");

// //   const testEnv = await initializeTestEnvironment({
// //       projectId: "aoede-f00ec",
// //       // Uncomment and use firestore and database configurations as needed
// //       // firestore: {
// //       //     rules: fs.readFileSync("firestore.rules", "utf8"),
// //       // },
// //       database: {
// //           // rules: "../../../database.rules.json",
// //           host: 'localhost',
// //           port: 9000
// //       }
// //   });

// //   console.log("Test environment initialized:", testEnv);
// //   return testEnv;
// // }


// // export { getTestEnv };