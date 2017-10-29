const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.setUpNewUser = functions.auth.user().onCreate(event => {
	
	const user = event.data;

	firestore
		.collection('users')
		.doc(user.uid)
		.collection('tasks')
		.doc()
		.set({
			body: 'Hi '+ (user.displayName ? user.displayName : user.email) +', this is your first task. Feel free to explore all the features and capabilities of MNGED!',
			title: 'Your first task!',
			due: new Date(new Date().getTime() + 604800000),
			subject: null
		})
		.then(() => console.log('Created new FireStore entry for user: ', user))
		.catch((err) => console.error('Something went wrong creating FireStore entry for user: ', err));
  
});

exports.onUserDelete = functions.auth.user().onDelete(event => {
	
	const user = event.data;

	firestore
		.collection('users')
		.doc(user.uid)
		.delete()
		.then(() => console.log('deleted FireStore entry for user: ', user))
		.catch((err) => console.log('Something went wrong deleting FireStore entry for user: ', err));
});
