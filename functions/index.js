// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const distributionsApp = express();

// GET /api/distributions
// Get all distributions, optionally specifying a category to filter on
distributionsApp.get('/api/distributions', async (req, res) => {
    const category = req.query.category;
    let query = admin.database().ref(`/distributions`);
  

    try {
      const snapshot = await query.once('value');
      let distributions = [];
      snapshot.forEach((childSnapshot) => {
        distributions.push({date: childSnapshot.key, baskets: childSnapshot.val().distribution});
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
  
    console.log(`ANALYZING MESSAGE: "${distribution}"`);
  
    try {
      await admin.database().ref(`/distributions`).push(distribution);
  
      res.status(201).json(distribution);
    } catch(error) {
      console.log('Error saving message', error.message);
      res.sendStatus(500);
    }
  });


// [START export]
// Export the express app as an HTTP Cloud Function
exports.distributionsApp = functions.https.onRequest(distributionsApp);
// [END export]