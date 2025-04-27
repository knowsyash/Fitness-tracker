import admin from 'firebase-admin';

var serviceAccount = require('./fitness-tracker-bb8fe-firebase-adminsdk-fbsvc-28f8ac4095.json'); // Path to your service account key file
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccount)), 
  // serviceAccountKey.json is downloaded from Firebase console
});
export const auth = admin.auth();

