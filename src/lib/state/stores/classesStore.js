import { observable } from 'mobx';

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

export default class ClassesStore {

	@observable classes = []
    
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

}