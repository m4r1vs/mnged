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
	@observable appLoaded = false
	@observable userLoggedIn = false
	@observable subPage = false
	@observable wasFirestoreLoaded = false
	@observable appMode = null

	/**
	 * set app loaded to true
	 */
	@action appIsLoaded() {
		this.appLoaded = true;
	}

	/**
	 * Set the mode of the app
	 * @param {string} mode app or landing
	 */
	@action setAppMode(mode) {
		switch (mode) {
			case 'app':
				this.appMode = 'app';
				break;
			case 'landing':
				this.appMode = 'landing';
				break;
			default:
				this.throwError('tried-to-assign-unknown-appmode');
		}
	}

	/**
	 * Throw a fatal error which causes the whole UI to freeze and display the error. For non-fatal error use snackbar
	 * @param {string} code an errorcode looking like following: 'firestore-error-creating-task'
	 * @param {string} [info] further information to display with the error
 	*/
	@action throwError(code, info) {
		if (info) this.error = info + ' (Error: ' + code + ')';
		else this.error = 'Something went wrong. Error: ' + code + '. Please consider contacting us under feedback or via Twitter @MariusNiveri';
		console.error(this.error);
	}

	/**
	 * Set Firestore loaded to true, so offline persistance doesn't get activated twice
	 */
	@action firestoreLoaded() {
		this.wasFirestoreLoaded = true;
	}

	/**
	 * Show a snackbar
	 * @param {string} text A text to display in the snackbar
	 * @param {string} [actionText] text of button
	 * @param {number} time how many ms should the snackbar be displayed
	 * @param {function} [action] a function to get executed when button clicked
	 */
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

	/**
	 * Transition the header to a sub-page mode
	 * @param {string} details.headerTitle Title of page displayed in header
	 * @param {string} details.headerColor Color of header
	 * @param {function} details.headerAction Gets executed when clicked on action
	 * @param {string} details.headerActionIcon icon from MD-icons to show at top right
	 */
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

	/**
	 * Function to set user state
	 * @param {boolean} user if user is logged in or not
	 */
	@action setUserState(user) {
		this.userLoggedIn = user;
	}
}