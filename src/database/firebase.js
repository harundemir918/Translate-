import * as firebase from 'firebase';

if (!firebase.apps.length) {
    var firebaseConfig = {
        apiKey: "AIzaSyDoPaJG3fBfDiy5kXwYAa0IkaTfjBHBhJg",
        authDomain: "translate-f6c30.firebaseapp.com",
        databaseURL: "https://translate-f6c30.firebaseio.com",
        projectId: "translate-f6c30",
        storageBucket: "translate-f6c30.appspot.com",
        messagingSenderId: "34014183025",
        appId: "1:34014183025:web:f19c1f957a94fb45dea5d0",
        measurementId: "G-28L8P0D768"
    };
    firebase.initializeApp(firebaseConfig);
}

export default firebase;