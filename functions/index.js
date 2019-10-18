// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
var serviceAccount = require("../../amap-echanges-de-paniers-2605b20d6a7f.json");
 admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: "https://amap-echanges-de-paniers.firebaseio.com/"
 });

const express = require('express');
const distributionsApp = express();
var cors = require('cors');

distributionsApp.use(cors());

// GET /api/distributions
// Get all distributions, optionally specifying a category to filter on
distributionsApp.get('/api/distributions', async (req, res) => {
    const category = req.query.category;
    let query = admin.database().ref(`/distributions`);

    try {
      const snapshot = await query.once('value');
      let distributions = [];
      console.log(JSON.stringify(snapshot));  
      snapshot.forEach((childSnapshot) => {
        let distribution = childSnapshot.val();
        distribution.id = childSnapshot.key;
         distributions.push(distribution);
       });
  
      res.status(200).json(distributions);
    } catch(error) {
      console.log('Error getting messages', error.message);
      res.sendStatus(500);
    }
});

// POST /api/distributions
// Create a new distribution
distributionsApp.post('/api/distributions', async (req, res) => {
    const distribution = req.body;
  
    try {
      console.log("POST " + JSON.stringify(distribution));

      let pushRef = await admin.database().ref(`/distributions`).push(distribution);
      distribution.id = pushRef.key;
  
      res.status(201).json(distribution);
      console.log(`POST OK ${distribution.date} ${distribution.id}`);
    } catch(error) {
      console.log(`POST ERROR ${distribution.date} : `, error.message);
      res.sendStatus(500);
    }
  });

distributionsApp.put('/api/distributions/:id', async (req, res) => {
  const distribution = req.body;
  
  try {
    console.log(`PUT /distributions/${req.params.id}`);
    await admin.database().ref(`/distributions`).child(req.params.id).update(distribution);
    res.status(200).json(distribution);
    console.log(`PUT OK /distributions/${req.params.id}`)
  } catch(error) {
    console.log(`PUT ERROR /distributions/${req.params.id} : `, error.message);
    res.sendStatus(500);
  }

});

distributionsApp.delete('/api/distributions/:id', async (req, res) => {
  
  try {
    console.log(`DELETE : /distributions/${req.params.id}`);
    await admin.database().ref(`/distributions/${req.params.id}`).remove();
    res.status(200);
    console.log(`DELETE OK : /distributions/${req.params.id}`)
  } catch(error) {
    console.log(`DELETE ERROR : /distributions/${req.params.id} : `, error.message);
    res.sendStatus(500);
  }

});

// [START export]
// Export the express app as an HTTP Cloud Function
exports.distributionsApp = functions.https.onRequest(distributionsApp);
// [END export]