// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: `http://localhost:4000/api/v1`,
  encryptionKey: 'msp-pub-encrypt',
  firebaseConfig: {
    apiKey: 'AIzaSyAXbLCn8DpHM5dgRxVD4glU0aeHMMa9y4o',
    authDomain: 'chat-dude.firebaseapp.com',
    databaseURL: 'https://chat-dude.firebaseio.com',
    projectId: 'chat-dude',
    storageBucket: 'chat-dude.appspot.com',
    messagingSenderId: '872212122012',
    appId: '1:872212122012:web:e441a67631f4de66d96059'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
