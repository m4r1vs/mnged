import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import style from './style';

import DayNavigator from '../../components/dayNavigator';
import ClassList from './classList';
import SetClasses from './setClasses';

@observer
export default class Dashboard extends Component {

	getDate(date) {

		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		];

		const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		let d = new Date(date);
		const now = this.props.stores.uiStore.currentTime;

		if (d.getMonth() === now.getMonth() && d.getDate() === now.getDate()) return 'Today';

		const month = monthNames[d.getMonth()];
		const dayName = dayNames[d.getDay()];

		let day = d.getDate();

		if (day <= 1) day = day + 'st';
		else day = day + 'th';

		return dayName + ', ' + month + ' ' + day;
	}

	nextDay() {
		const currentState = this.state.displayedDate;
		this.props.stores.classesStore.changeDisplayedClasses(currentState + 86400000);
		this.setState({ displayedDate: currentState + 86400000 });
	}

	previosDay() {
		const currentState = this.state.displayedDate;
		this.props.stores.classesStore.changeDisplayedClasses(currentState - 86400000);
		this.setState({ displayedDate: currentState - 86400000 });
	}

	constructor(props) {
		super(props);
		this.state = {
			displayedDate: props.stores.uiStore.currentTime.getTime()
		};
	}

	componentDidMount() {
		const currentState = this.state.displayedDate;
		this.props.stores.classesStore.changeDisplayedClasses(currentState);
	}

	render() {

		const { newUser } = this.props.stores.uiStore;

		const classes = this.props.stores.classesStore.filteredClasses;

		const renderClasses = ms => (
			<div>
				<DayNavigator
					leftAction={this.previosDay.bind(this)}
					rightAction={this.nextDay.bind(this)}
					title={classes && this.getDate(this.state.displayedDate)}
				/>
				<h4 class={style.notes}>{classes.notes}</h4>
				{classes && classes.classes && classes.classes.map((subject) => (
					<ClassList key={subject.id} block={subject} />
				))}
			</div>
		);

		return (
			<div class={style.home + ' fadeIn'}>

				{!newUser ? renderClasses() : <SetClasses />}

			</div>
		);
	}
}
