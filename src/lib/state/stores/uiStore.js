import { observable, action } from 'mobx';

class SubPage {
	@observable headerTitle
	@observable headerColor
	@observable headerAction
	@observable headerActionIcon
	
	constructor(details) {
		this.headerTitle = details.headerTitle;
		this.headerColor = details.headerColor;
		this.headerAction = details.headerAction;
		this.headerActionIcon = details.headerActionIcon;
	}
}

export default class UiStore {
	@observable notification = null
	@observable error = null
	@observable appState = null
	@observable newUser = false
	@observable currentTime = new Date()
	@observable subPage = false
	@observable jobQueue = 'init'
	@observable dayNavOpened = false
  
	@action initUi(user) {
		// setInterval(() => this.currentTime = new Date(), 30000);
		this.appState = {
			userLoggedIn: !!user,
			appLoaded: true
		};
	}

	@action throwError(code, info) {
		if (typeof info === 'string') this.error = info + ' (Errorcode ' + code + ')';
		else this.error = 'Something went wrong. Error ' + code + '. Please look up the code under https://github.com/m4r1vs/mnged/errorcodes.md';
		console.error(this.error);
	}

	@action increaseJobs() {
		if (isNaN(this.jobQueue)) this.jobQueue = 1;
		else this.jobQueue++;
	}

	@action decreaseJobs() {
		if (isNaN(this.jobQueue)) this.jobQueue = 0;
		else this.jobQueue--;
	}

	@action showSnackbar(text, actionText, time, action) {
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

	@action setSubPage(details) {
		if (details) {
			this.subPage = new SubPage(details);
		}
		else this.subPage = false;

		if (typeof window !== 'undefined') {
			const themeColor = document.querySelector('meta[name=theme-color]') || null;
			if (themeColor) themeColor.setAttribute('content', details ? (details.headerColor || '#282d8c') : '#282d8c');
		}
	}

	@action toggleDayNav() {
		this.dayNavOpened = !this.dayNavOpened;
	}
}