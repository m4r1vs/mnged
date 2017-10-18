import { observable } from 'mobx';

class User {
	@observable name
	@observable email
	@observable photoURL
	@observable headerURL

	constructor(user) {
		this.name = user.displayName;
		this.email = user.email;
		this.photoURL = user.photoURL;
		this.headerURL = user.headerURL;
	}
}

export default class UserStore {
	@observable user = {}
    
	setUser(user, loggedIn) {
		if (user) this.user = new User(user);
		this.user = { ...this.user, loggedIn };
	}
}