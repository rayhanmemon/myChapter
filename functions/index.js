const functions = require('firebase-functions');

let fetch = require('node-fetch');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('Omicron-Pi')
.onCreate(event => {
  const root = event.data.ref.root;
  let messages = [];

  root.child('Omicron-Pi/profiles').once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let pushToken = childSnapshot.val().pushToken;
        if (pushToken) {
          messages.push({
            to: pushToken,
            body: 'New Node Added'
          });
        }
    })
    return Promise.all(messages);
  }).then(messages => {
    return fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages)
    });
  });
});
