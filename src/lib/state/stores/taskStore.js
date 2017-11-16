import { observable, computed, action } from 'mobx';

class Task {
	@observable id
	@observable title
	@observable attachments
	@observable due
	@observable created
	@observable group

	constructor(id, task) {
		this.id = id;
		this.title = task.title || 'empty task';
		this.attachments = task.attachments || null;
		this.due = task.due || null;
		this.created = task.created || new Date();
		this.group = task.group || null;
	}

	/**
	 * the time left in the task
	 */
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

	/**
	 * get the tasks ordered by date
	 */
	@computed get listTasksByDate() {
		const taskList = this.tasks.sort((a, b) => a.due.getTime() - b.due.getTime());
		return taskList;
	}
	
	/**
	 * append the taskstore with a new task
	 * @param {string} id the id of the new task
	 * @param {object} task the task
	 */
	@action addTask(id, task) {
		this.tasks.push(new Task(id, task));
	}
	
	/**
	 * edit a task in the taskstore
	 * @param {string} id the id of the new task
	 * @param {object} taskNew the new task
	 */
	@action editTask(id, taskNew) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === id) this.tasks[i] = new Task(id, taskNew);
		}
	}

	/**
	 * remove a task from the taskstore
	 * @param {string} id the id of the task to be removed
	 */
	@action removeTask(id) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === id) this.tasks.splice(i, 1);
		}
	}
}