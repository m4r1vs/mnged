import { observable, computed, action } from 'mobx';

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

		const millisToTime = (millisec) => {
			if (millisec < 0) return 'overdue';
			let seconds = (millisec / 1000).toFixed(0);
			let hours = Math.floor(seconds / 3600);
			let days = '';

			if (hours < 24) return hours + 'h';
			days = Math.floor(hours / 24);
			hours = hours - (days * 24);
			return days + 'd ' + hours + 'h';
		};

		const now = new Date();
		const dueDate = this.due;
		const newDate = new Date(dueDate - now);
		return millisToTime(newDate);
	}
}

export default class TaskStore {
	@observable tasks = []
	@observable displayedTask = null

	@computed get taskList() {
		const taskList = this.tasks.sort((a, b) => a.due.getTime() - b.due.getTime());
		return taskList;
	}

	@action setDisplayedTask(id) {
		this.displayedTask = id;
	}

	@computed get getDisplayedTask() {
		let returnTask = null;
		if (this.displayedTask) {
			this.tasks.forEach((task) => {
				if (task.id === this.displayedTask) returnTask = task;
			});
		}
		return returnTask;
	}
        
	@action addTask(id, task) {
		this.tasks.push(new Task(id, task));
	}
        
	@action editTask(id, taskNew) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === id) this.tasks[i] = new Task(id, taskNew);
		}
	}

	@action removeTask(id) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === id) this.tasks.splice(i, 1);
		}
	}
}