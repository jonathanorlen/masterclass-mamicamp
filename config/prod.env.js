'use strict'
require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  FIREBASE_apiKey: JSON.stringify(process.env.FIREBASE_apiKey),
  FIREBASE_authDomain: JSON.stringify(process.env.FIREBASE_authDomain),
  FIREBASE_databaseURL: JSON.stringify(process.env.FIREBASE_databaseURL),
  FIREBASE_projectId: JSON.stringify(process.env.FIREBASE_projectId),
  FIREBASE_storageBucket: JSON.stringify(process.env.FIREBASE_storageBucket),
  FIREBASE_messagingSenderId: JSON.stringify(process.env.FIREBASE_messagingSenderId),
  FIREBASE_appId: JSON.stringify(process.env.FIREBASE_appId),
  FIREBASE_measurementId: JSON.stringify(process.env.FIREBASE_measurementId)
}
