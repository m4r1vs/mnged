import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import style from './style';

import ClassList from './classList';
import SetClasses from './setClasses';

@observer
export default class Dashboard extends Component {

	getDate(date) {

		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'
		];

		let d = new Date(date);

		const month = monthNames[d.getMonth()];

		let day = d.getDate();

		if (day <= 1) day = day + 'st';
		else day = day + 'th';

		return month + ' the ' + day;
	}

	isItDayOne() {
		return true;
	}

	constructor() {
		super();
		this.state = null;
	}

	componentWillMount() {
		this.setState({ classes: JSON.parse(localStorage.getItem('classes')) });
	}

	render() {

		const { classes, schedule } = this.props.stores.classesStore;
		const { newUser } = this.props.stores.uiStore;

		const renderSchedule = input => {
			let day = 0;
			let notes = this.props.stores.classesStore.schedule.getEntryByDate(input);
			if (notes) {
				notes = notes.notes;
				if (/^day 1/.test(notes.toLowerCase())) day = 1;
				if (/^day 2/.test(notes.toLowerCase())) day = 2;
			}
			else notes = 'No data provided';

			if (day === 1) {
				return {
					notes,
					classes: [
						classes[0],
						classes[8],
						classes[1],
						classes[2],
						classes[3]
					]
				};
			}

			else if (day === 2) {
				return {
					notes,
					classes: [
						classes[4],
						classes[8],
						classes[5],
						classes[6],
						classes[7]
					]
				};
			}
			return {
				notes,
				classes: null
			};
		};

		const now = new Date().getTime();
		const renderClasses = () => (
			<div>
				<h3>{this.getDate(now)}: {schedule && renderSchedule(now).notes}</h3>
				{schedule && renderSchedule(now).classes && renderSchedule(now).classes.map((subject) => (
					<ClassList key={subject.id} block={subject} />
				))}
				<h3 class="border">{this.getDate(now + 86400000)}: {schedule && renderSchedule(now + 86400000).notes}</h3>
				{schedule && renderSchedule(now + 86400000).classes && renderSchedule(now + 86400000).classes.map((subject) => (
					<ClassList key={subject.id} block={subject} />
				))}
				<h3 class="border">{this.getDate(now + 86400000 + 86400000)}: {schedule && renderSchedule(now + 86400000 + 86400000).notes}</h3>
				{schedule && renderSchedule(now + 86400000 + 86400000).classes && renderSchedule(now + 86400000 + 86400000).classes.map((subject) => (
					<ClassList key={subject.id} block={subject} />
				))}
			</div>
		);

		return (
			<div class={style.home + ' fadeIn'}>

				{classes.map((subject) => (
					<ClassList key={subject.id} block={subject} />
				))}

				{!newUser ? renderClasses() : <SetClasses />}

			</div>
		);
	}
}
