import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import style from './style';

import ClassList from './classList';
import SetClasses from './setClasses';

@observer
export default class Dashboard extends Component {

	getDate(bool) {

		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'
		];

		let d = new Date();

		if (bool) d.setDate(d.getDate() + 1);

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

		const { classes } = this.props.stores.classesStore;
		const { newUser } = this.props.stores.uiStore;

		return (
			<div class={style.home + ' fadeIn'}>

				{!newUser ? classes.map((subject) => (
					<ClassList key={subject.id} block={subject} />
				)) : <SetClasses />}

			</div>
		);
	}
}
