import { firestore } from '../firebase';

const initFirestore = uiStore => {

	if (uiStore.wasFirestoreLoaded) return false;

	// FireStore wasn't loaded before:
	firestore.enablePersistence()
		.then(() => {
			console.log('Offline usage of database is now activated!');
			uiStore.firestoreLoaded();
		})
		.catch((err) => {
			if (err.code === 'failed-precondition') {
				uiStore.showSnackbar(
					'Wasn\'t able to enable offline database. Maybe you have multible tabs of MNGED opened?',
					'OKAY',
					10000
				);
			}
			else if (err.code === 'unimplemented') {
				uiStore.showSnackbar(
					'Your browser doesn\'t support offline databases. To enjoy the full experience, try updating your browser or installing another one!',
					'OKAY',
					10000
				);
			}
		});
};

const initializeState = (stores, user) => {

	const { uiStore, taskStore, userStore } = stores;

	// enable offline usage for database
	initFirestore(uiStore);

	// set user in MobX
	userStore.setUser(user);

	// only perform when user logged in
	if (user) {

		// update uiStore so it knows user is logged in
		uiStore.setUserState(true);

		// set appmode to app to show header etc..
		uiStore.setAppMode('app');

		firestore
			.collection('user-data')
			.doc(user.uid)
			.get()
			.then(doc => userStore.setUser(user, doc.data()));
		
		// listen for changes in tasks
		firestore
			.collection('user-data')
			.doc(user.uid)
			.collection('tasks')
			.onSnapshot(snapshot => {
				snapshot.docChanges.forEach(docChanges => {
					switch (docChanges.type) {
						case 'added':
							taskStore.addTask(docChanges.doc.id, docChanges.doc.data());

							firestore.collection('user-data')
								.doc(user.uid)
								.collection('tasks')
								.doc(docChanges.doc.id)
								.collection('attachments')
								.onSnapshot(snapshotAttachment => {
									snapshotAttachment.docChanges.forEach(docChangesAttachment => {
										switch (docChangesAttachment.type) {
											case 'added':
												taskStore.addAttachment(docChanges.doc.id, docChangesAttachment.doc.id, docChangesAttachment.doc.data());
												break;
											case 'modified':
												taskStore.editAttachment(docChanges.doc.id, docChangesAttachment.doc.id, docChangesAttachment.doc.data());
												break;
											case 'removed':
												taskStore.removeAttachment(docChangesAttachment.doc.id);
												break;
											default:
												uiStore.throwError('firestore-unexpected-change-type-in-attachment');
										}
									});
								});

							break;
						case 'modified':
							taskStore.editTask(docChanges.doc.id, docChanges.doc.data());
							break;
						case 'removed':
							taskStore.removeTask(docChanges.doc.id);
							break;
						default:
							uiStore.throwError('firestore-unexpected-change-type-in-task');
					}
				});
			});
	}

	// user not logged in now, but someone was logged in before
	else if (uiStore.userLoggedIn) {

		// set appmode to app to hide header etc..
		uiStore.setAppMode('landing');

		// reset all database-related stores
		stores.reset();

		// make sure uiStore knows that user not logged in and app updated
		uiStore.setUserState(false);
	}

	// set appmode to app to hide header etc..
	else uiStore.setAppMode('landing');

	// init UI
	uiStore.appIsLoaded();
};

export default initializeState;