import { observable, action } from 'mobx';

class User {
	@observable name
	@observable email
	@observable photoURL
	@observable headerURL

	constructor(user) {
		this.name = user.displayName || 'Unknown';
		this.email = user.email || 'Unknown';
		this.uid = user.uid || null;
		this.photoURL = user.photoURL || null;
		this.headerURL = user.headerURL || null;
	}
}

export default class UserStore {
	@observable user = {}
	
	/**
	 * sets up representation of user in mobx
	 * @param {object} user user object
	 */
	@action setUser(user) {
		if (user) this.user = new User(user);
		else this.user = null;
	}
}