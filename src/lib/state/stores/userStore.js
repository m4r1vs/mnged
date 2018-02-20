import { observable, action } from 'mobx';

class User {
	@observable name
	@observable email
	@observable photoURL
	@observable headerURL

	constructor(user, databaseUser) {
		this.name = user.displayName || 'Mnger';
		this.email = user.email || 'Not provided';
		this.uid = user.uid || null;
		this.photoURL = user.photoURL || null;
		this.headerURL = databaseUser ? databaseUser.headerURL : null;
	}
}

export default class UserStore {
	@observable user = {}
	
	/**
	 * sets up representation of user in mobx
	 * @param {object} user user object
	 */
	@action setUser(user, databaseUser) {
		if (user) this.user = databaseUser ? new User(user, databaseUser) : new User(user);
		else this.user = null;
	}
}