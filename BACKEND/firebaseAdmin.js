import admin from 'firebase-admin';

import serviceAccount from './fitness-tracker-bb8fe-firebase-adminsdk-fbsvc-28f8ac4095.json' assert { type: 'json' }; // Path to your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), 
  // serviceAccountKey.json is downloaded from Firebase console
});
export const auth = admin.auth();

