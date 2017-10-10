import { firestore } from '../firebase';

const initializeState = store => {

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