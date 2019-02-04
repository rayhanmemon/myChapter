const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendPushNotification = functions.database.ref('/{organization}/posts/{pushId}/')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const post = snapshot.val();
      console.log('sendPushNotification', context.params, post);
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('function').set('worked!');
    });


//postContent = snapshot.val().postContent
//
