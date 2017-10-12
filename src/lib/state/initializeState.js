import { firestore } from '../firebase';

const initializeState = store => {

	firestore.enablePersistence()
		.then(() => {
			console.log('Offline usage of database is now activated!');
		})
		.catch((err) => {
			if (err.code === 'failed-precondition') {
				store.showSnackbar(
					'Wasn\'t able to enable offline database. Maybe you have multible tabs of MNGED opened?',
					'OKAY',
					10000
				);
			}
			else if (err.code === 'unimplemented') {
				store.showSnackbar(
					'Your browser doesn\'t support offline databases. To enjoy the full experience, try another one',
					'OKAY',
					10000
				);
			}
		});

	firestore
		.collection('users')
		.doc('aqCB6Pw5QZSgNuxzueuR')
		.onSnapshot((doc) => {
			if (doc) store.setUser(doc.data());
		});
  
	firestore
		.collection('users')
		.doc('aqCB6Pw5QZSgNuxzueuR')
		.collection('classes')
		.onSnapshot((snapshot) => {
			snapshot.docChanges.forEach((docChanges) => {
				switch (docChanges.type) {
					case 'added':
						store.addClass(docChanges.doc.id, docChanges.doc.data());
						break;
					case 'modified':
						store.editClass(docChanges.doc.id, docChanges.doc.data());
						break;
					case 'removed':
						store.throwError('#001');
						break;
					default:
						store.throwError('#002');
				}
			});
		});
    
	firestore
		.collection('users')
		.doc('aqCB6Pw5QZSgNuxzueuR')
		.collection('tasks')
		.onSnapshot((snapshot) => {
			snapshot.docChanges.forEach((docChanges) => {
				switch (docChanges.type) {
					case 'added':
						store.addTask(docChanges.doc.id, docChanges.doc.data());
						break;
					case 'modified':
						store.editTask(docChanges.doc.id, docChanges.doc.data());
						break;
					case 'removed':
						store.removeTask(docChanges.doc.id);
						break;
					default:
						store.throwError('#002');
				}
			});
		});
};

export default initializeState;