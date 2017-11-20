const admin = require('firebase-admin');
const request = require('request');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

const config = {
	googlePlusKey: 'AIzaSyBBuZrztM5uYu1b0pLZiRI2J60XoDZZvVo'
};

const getHeader = user => {
	console.log('getHeader() started...');
	let headerURL = null;

	if (typeof user.providerData !== 'object') return null;
	if (!user.providerData[0]) return null;
	if (user.providerData[0].providerId !== 'google.com') return null;

	const googleUid = user.providerData[0].uid;
	
	request('https://www.googleapis.com/plus/v1/people/' + googleUid + '?fields=cover%2FcoverPhoto%2Furl&key=' + config.googlePlusKey, (error, response, body) => {
		console.log('request done: ', response);
		if (!error && response.statusCode === 200) {
			const cover = JSON.parse(body).cover;
			console.log('Got cover: ', cover);
			if (!cover) return null;
			if (!cover.coverPhoto) return null;
			if (!cover.coverPhoto.url) return null;
			headerURL = cover.coverPhoto.url;
		}
		else console.error('Error fetching HeaderURL: ', error);
	});

	return headerURL;
};

exports.setUpNewUser = functions.auth.user().onCreate(event => {
	
	const user = event.data;

	const batch = firestore.batch();
	const userRef = firestore.collection('user-data').doc(user.uid);

	batch.set(userRef, {
		name: user.displayName || 'Mnger',
		email: user.email || null,
		photoURL: user.photoURL || 'https://mnged.me/assets/imgs/default_profile_picture.png',
		headerURL: getHeader(user) || 'https://mnged.me/assets/imgs/default_header.jpg'
	});

	const taskRef = userRef.collection('tasks').doc();
	batch.set(taskRef, {
		title: 'My first Task: Explore MNGED!',
		due: new Date(new Date().getTime() + 604800000),
		created: new Date()
	});

	batch.set(taskRef.collection('attachments').doc(), {
		type: 'note',
		title: 'A note by Marius',
		content: `Hi ${user.displayName || 'Mnger'}! I am Marius Niveri, the founder and creator of MNGED. I hope you enjoy using my apllication and also feel free to [contact me](https://twitter.com/mariusniveri) in case you have any questions or improvments regarding MNGED. I hope you have an awesome day!`,
		created: new Date()
	});

	batch.commit()
		.then(() => console.log('Successfully created FireStore entry for user: ', user))
		.catch(err => console.error('Error creating FireStore entry for user: ', err));
  
});

exports.onUserDelete = functions.auth.user().onDelete(event => {
	
	const user = event.data;

	firestore
		.collection('user-data')
		.doc(user.uid)
		.delete()
		.then(() => console.log('deleted FireStore entry for user: ', user))
		.catch((err) => console.log('Something went wrong deleting FireStore entry for user: ', err));
});
