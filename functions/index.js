const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.setUpNewUser = functions.auth.user().onCreate(event => {
	
	const user = event.data;
	const date = new Date();
	const batch = firestore.batch();

	const docRefUserInfo = firestore
		.collection('users')
		.doc(user.uid);

	const docRefScheduleInfo = firestore
		.collection('users')
		.doc(user.uid)
		.collection('schedule')
		.doc('info');
	
	batch.set(docRefUserInfo, {
		email: user.email,
		name: user.displayName
	});
		
	batch.set(docRefScheduleInfo, {
		schedule: false,
		lastEdit: date.getTime()
	});

	batch.commit().then(() => {
		console.log('Created new FireStore entry for user: ', user);
	});
  
});
