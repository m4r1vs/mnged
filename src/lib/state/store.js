import { observable, computed } from 'mobx';
// import { enableLogging } from 'mobx-logger';

// enableLogging();

class Class {
	@observable id
	@observable color
	@observable name
	@observable room
	@observable teacher

	constructor(id, subject) {
		this.id = id;
		this.color = subject.color;
		this.name = subject.name;
		this.room = subject.room;
		this.teacher = subject.teacher;
	}
}

class User {
	@observable name
	@observable email
	@observable photoURL
	@observable headerURL

	constructor(user) {
		this.name = user.name;
		this.email = user.email;
		this.photoURL = user.photoURL;
		this.headerURL = user.headerURL;
	}
}

class Task {
	@observable id
	@observable body
	@observable due
	@observable subjectRef
	@observable title

	constructor(id, task) {
		this.id = id;
		this.body = task.body;
		this.due = task.due;
		this.subjectRef = task.subject;
		this.title = task.title;
	}

	@computed get timeLeft() {
		const now = new Date();
		const dueDate = this.due;
		const newDate = new Date(dueDate - now);
		return Math.round(newDate.getTime() / (1000*60*60*24)) + 'd ' + Math.round(newDate.getTime() / (1000*60*60)) + 'h';
	}

}

export class Store {
	@observable user = {}
	@observable classes = []
	@observable tasks = []
	@observable notification = null
	@observable general = {}
	@observable error = null

	@computed get taskList() {
		const taskList = this.tasks.sort((a, b) => a.due.getTime() - b.due.getTime());
		return taskList;
	}
	
	setUser(user) {
		this.user = new User(user);
		this.user = { ...this.user, loggedIn: true };
		this.general = {
			loaded: true
		};
	}

	addClass(id, subject) {
		this.classes.push(new Class(id, subject));
	}

	editClass(id, subjectNew) {
		for (let i = 0; i < this.classes.length; i++) {
			if (this.classes[i].id === id) this.classes[i] = { ...subjectNew, id };
		}
	}

	getClassFromName(name) {
		this.classes.forEach((subject) => {
			if (subject.name === name) return subject;
		});
	}

	addTask(id, task) {
		this.tasks.push(new Task(id, task));
	}

	editTask(id, taskNew) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === id) this.tasks[i] = { ...taskNew, id };
		}
	}

	removeTask(id) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === id) this.tasks.splice(i, 1);
		}
	}

	throwError(code, info) {
		if (typeof info === 'string') this.error = info + ' (Errorcode ' + code + ')';
		else this.error = 'Something went wrong. Error ' + code + '. Please look up the code under https://github.com/m4r1vs/mnged/errorcodes.md';
		console.error(this.error);
	}

	showSnackbar(text, actionText, time, action) {
		console.log(text);
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

export default new Store();