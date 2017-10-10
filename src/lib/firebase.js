const firebase = require('firebase');
require('firebase/firestore');

const config = {
	apiKey: 'AIzaSyCzGTQ9yO4va-NOlNpqI4VRrzURQu0PQdE',
	authDomain: 'managed-me.firebaseapp.com',
	databaseURL: 'https://managed-me.firebaseio.com',
	projectId: 'managed-me',
	storageBucket: 'managed-me.appspot.com',
	messagingSenderId: '303837844694'
};

firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const messaging = (typeof window !== 'undefined') ? firebase.messaging() : null;

export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();