import { observable, computed, action } from 'mobx';

class Attachment {
	@observable id
	@observable type
	@observable title
	@observable content
	@observable created

	constructor (id, attachment) {
		this.id = id;
		this.type = attachment.type;
		this.title = attachment.title;
		this.content = attachment.content;
		this.created = attachment.created;
	}
}

class Task {
	@observable id
	@observable title
	@observable attachments
	@observable due
	@observable created
	@observable group
	@observable done

	constructor(id, task) {
		this.id = id;
		this.title = task.title || 'empty task';
		this.attachments = [];
		this.due = task.due || null;
		this.created = task.created || new Date();
		this.group = task.group || null;
		this.done = task.done || false;
	}

	/**
	 * Return a color of group for task
	 */
	@computed get colorByGroup() {
		// TODO: make it real
		switch (this.group) {
			case 'red':
				return '#ef5350';
			case 'blue':
				return '#42a5f5';
			case 'purple':
				return '#ab47bc';
			case 'orange':
				return '#ffa726';
			case 'green':
				return '#66bb6a';
			default:
				return '#78909c';
		}
	}

	/**
	 * Returns number of attachments, pretty self-explaning, eh?
	 */
	@computed get numberOfAttachments() {
		return (this.attachments.length > 0) && this.attachments.length;
	}

	@computed get listOfAttachments() {
		const attachmentList = this.attachments.sort((a, b) => a.created.getTime() - b.created.getTime());
		return attachmentList;
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

	/**
	 * Edit an attachment
	 * @param {string} id the id of the attachment
	 * @param {object} attachment the attachment
	 */
	@action editAttachment(id, attachment) {
		for (let i = 0; i < this.attachments.length; i++) {
			if (this.attachments[i].id === id) this.attachments[i] = new Attachment(id, attachment);
		}
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

	/**
	 * add an attachment to a task
	 * @param {string} taskId the id of the task the attachment should be added to
	 * @param {string} attachmentId the id of the new attachment
	 * @param {object} attachment the attachment itself
	 */
	@action addAttachment(taskId, attachmentId, attachment) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === taskId) this.tasks[i].attachments.push(new Attachment(attachmentId, attachment));
		}
	}

	/**
	 * edit an attachment
	 * @param {string} taskId the id of the task which the edited attachment belongs t
	 * @param {string} attachmentId the id of the edited attachment
	 * @param {object} attachment the attachment itself
	 */
	@action editAttachment(taskId, attachmentId, attachment) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === taskId) this.tasks[i].editAttachment(attachmentId, attachment);
		}
	}
}