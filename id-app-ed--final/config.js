import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBWnAF_PNz3Em48aAXUUUUXUmYaevSD44U',
  authDomain: 'id-app-1f901.firebaseapp.com',
  projectId: 'id-app-1f901',
  storageBucket: 'id-app-1f901.appspot.com',
  messagingSenderId: '909947939951',
  appId: '1:909947939951:web:def642e878ead4695af19a',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
