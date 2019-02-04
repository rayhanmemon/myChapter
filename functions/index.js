const functions = require('firebase-functions');

let fetch = require('node-fetch');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('Omicron-Pi')
.onCreate(event => {
  const root = event.data.ref.root;
  let messages = [];

  console.log(event);
});
