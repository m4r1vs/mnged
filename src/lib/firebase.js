const config = {
	apiKey: 'AIzaSyCzGTQ9yO4va-NOlNpqI4VRrzURQu0PQdE',
	authDomain: 'managed-me.firebaseapp.com',
	databaseURL: 'https://managed-me.firebaseio.com',
	projectId: 'managed-me',
	storageBucket: 'managed-me.appspot.com',
	messagingSenderId: '303837844694'
};

const isBrowser = (typeof window !== 'undefined');

if (isBrowser) firebase.initializeApp(config);

export const firestore = (isBrowser) && firebase.firestore();
export const auth = (isBrowser) && firebase.auth();
export const messaging = (isBrowser) && firebase.messaging();

export const facebookAuthProvider = (isBrowser) && new firebase.auth.FacebookAuthProvider();
export const githubAuthProvider = (isBrowser) && new firebase.auth.GithubAuthProvider();
export const twitterAuthProvider = (isBrowser) && new firebase.auth.TwitterAuthProvider();
export const googleAuthProvider = (isBrowser) && new firebase.auth.GoogleAuthProvider();