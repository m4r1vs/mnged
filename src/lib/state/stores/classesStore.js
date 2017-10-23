import { observable, action } from 'mobx';

class Class {
	@observable id
	@observable color
	@observable name
	@observable room
	@observable teacher

	constructor(id, subject) {
		this.id = id;
		this.color = subject.color;
		this.name = subject.class;
		this.room = subject.room;
		this.teacher = subject.teacher;
	}
}

class Schedule {
	@observable menu

	constructor(menu) {
		this.menu = menu;
	}

	getEntryByDate(ms) {
		let result = null;

		this.menu.forEach((obj, i) => {
			const date = new Date(obj.date);
			const now = new Date(ms);
			if (date.getMonth() === now.getMonth() && date.getDate()+1 === now.getDate()) result = obj;
		});

		return result;
	}
}

export default class ClassesStore {

	@observable classes = []
	@observable schedule = null
    
	@action addClass(id, subject) {
		this.classes.push(new Class(id, subject));
	}

	@action editClass(id, subjectNew) {
		for (let i = 0; i < this.classes.length; i++) {
			if (this.classes[i].id === id) this.classes[i] = new Class(id, subjectNew);
		}
	}

	@action getClassFromName(name) {
		this.classes.forEach((subject) => {
			if (subject.name === name) return subject;
		});
	}

	@action initSchedule(result) {
		this.schedule = new Schedule(result);
	}

}