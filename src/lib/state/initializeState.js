import { firestore } from '../firebase';

const initializeState = (stores, user) => {

	if (user) {
		
		firestore.enablePersistence()
			.then(() => {
				console.log('Offline usage of database is now activated!');
			})
			.catch((err) => {
				if (err.code === 'failed-precondition') {
					stores.uiStore.showSnackbar(
						'Wasn\'t able to enable offline database. Maybe you have multible tabs of MNGED opened?',
						'OKAY',
						10000
					);
				}
				else if (err.code === 'unimplemented') {
					stores.uiStore.showSnackbar(
						'Your browser doesn\'t support offline databases. To enjoy the full experience, try another one',
						'OKAY',
						10000
					);
				}
			});
			
		firestore
			.collection('users')
			.doc(user.uid)
			.collection('classes')
			.doc('block_a')
			.get()
			.then((doc) => {
				if (!doc.exists) stores.uiStore.newUser = true;
			});
		
		
		// firestore
		// 	.collection('users')
		// 	.doc(user.uid)
		// 	.onSnapshot((doc) => {
		// 		stores.uiStore.initUi(true);
		// 	});
		
		if (!stores.uiStore.newUser) {

			firestore
				.collection('users')
				.doc(user.uid)
				.collection('classes')
				.onSnapshot((snapshot) => {
					snapshot.docChanges.forEach((docChanges) => {
						switch (docChanges.type) {
							case 'added':
								stores.classesStore.addClass(docChanges.doc.id, docChanges.doc.data());
								break;
							case 'modified':
								stores.classesStore.editClass(docChanges.doc.id, docChanges.doc.data());
								break;
							case 'removed':
								stores.uiStore.throwError('#001');
								break;
							default:
								stores.uiStore.throwError('#002');
						}
					});
				});
				
			firestore
				.collection('users')
				.doc(user.uid)
				.collection('tasks')
				.onSnapshot((snapshot) => {
					snapshot.docChanges.forEach((docChanges) => {
						switch (docChanges.type) {
							case 'added':
								stores.taskStore.addTask(docChanges.doc.id, docChanges.doc.data());
								break;
							case 'modified':
								stores.taskStore.editTask(docChanges.doc.id, docChanges.doc.data());
								break;
							case 'removed':
								stores.taskStore.removeTask(docChanges.doc.id);
								break;
							default:
								stores.uiStore.throwError('#002');
						}
					});
				});
		}
	}
};

export default initializeState;