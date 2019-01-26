// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
var admin = require('firebase-admin');

var serviceAccount = require('./ServiceAccountKey.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp(functions.config().firebase);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://ksigapp.firebaseio.com"
// });

exports.sendPushNotifications = functions.database.ref('/Omicron-Pi')
    .onCreate((snapshot, context) => {
      const post = snapshot.val();
      console.log('Uppercasing', context.params.organization, post);
      const uppercasePost = post.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('cloudFunctionTest').set({ snapshot, context });
    });
