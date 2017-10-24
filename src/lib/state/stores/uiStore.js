import { observable } from 'mobx';

export default class UiStore {
	@observable notification = null
	@observable error = null
	@observable appState = null
	@observable newUser = false
	@observable currentTime = new Date()
  
	initUi(user) {
		// setInterval(() => this.currentTime = new Date(), 30000);
		if (user) {
			this.appState = {
				userLoggedIn: true,
				appLoaded: true
			};
		}
		else {
			this.appState = {
				userLoggedIn: false,
				appLoaded: true
			};
		}
	}

	throwError(code, info) {
		if (typeof info === 'string') this.error = info + ' (Errorcode ' + code + ')';
		else this.error = 'Something went wrong. Error ' + code + '. Please look up the code under https://github.com/m4r1vs/mnged/errorcodes.md';
		console.error(this.error);
	}

	showSnackbar(text, actionText, time, action) {
		this.notification && this.notification.timeout && clearTimeout(this.notification.timeout);
		if (this.notification) {
			this.notification = null;
			this.notification = {
				timeout: setTimeout(() => {
					this.notification = {
						text,
						action,
						actionText,
						...this.notification
					};
					this.notification.timeout = setTimeout(() => this.notification = null, time);
				}, 500)
			};
		}
		else {
			this.notification = {
				text,
				action,
				actionText
			};
			this.notification.timeout = setTimeout(() => this.notification = null, time);
		}
	}
}