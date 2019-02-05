const functions = require('firebase-functions');

var fetch = require('node-fetch');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('/{organization}/posts/{postId}/')
    .onCreate((snapshot, context) => {
      const organization = context.params.organization;
      const organizationRef = snapshot.ref.root.child(`/${organization}`);

      const postId = context.params.postId;
      const post = snapshot.val();

      let messages = [];

      return organizationRef.child('/profiles').once('value').then(snapshot => {
        snapshot.forEach(childSnapshot => {
          let pushToken = childSnapshot.val().pushToken;
          if (pushToken) {
            messages.push({
              "to": pushToken,
              "title" : post.name,
              "body": post.postContent
            })
          }
        });
        return Promise.all(messages);
      }).then(messages => {
        return fetch('https://exp.host/--/api/v2/push/send', {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(messages)
      });
    });
  });
