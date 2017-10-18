import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import { route } from 'preact-router';
import style from './style';

@observer
export default class Class extends Component {

	constructor() {
		super();
		this.state = {
			class: null
		};
	}
  
	componentWillMount() {
		if (this.props.stores.classesStore.classes) {
			this.props.stores.classesStore.classes.forEach((subject) => {
				if (subject.name === this.props.class) this.setState({ subject });
			});
		}
	}
	
	componentDidMount() {
		if (this.state.subject) {
			this.props.stores.uiStore = {
				...this.props.stores.uiStore,
				headerTitle: this.state.subject.name + ' class'
			};
		}
		else {
			this.props.stores.uiStore = {
				...this.props.stores.uiStore,
				headerTitle: 'class not found: ' + this.props.class
			};
		}
		const navbtn = document.getElementById('navbtn');
		const header = document.getElementById('header');
		if (navbtn) navbtn.setAttribute('id', 'navbtn-arrow');
		if (header) header.setAttribute('id', 'header-big');
	}

	componentWillUnmount() {
		this.props.stores.uiStore = {
			...this.props.stores.uiStore,
			headerTitle: null
		};
		const navbtn = document.getElementById('navbtn-arrow');
		const header = document.getElementById('header-big');
		if (navbtn) navbtn.setAttribute('id', 'navbtn');
		if (header) header.setAttribute('id', 'header');
	}

	render() {

		const { classes } = this.props.stores.classesStore;
		const { taskList } = this.props.stores.taskStore;
		let currentSubject = null;

		classes.forEach((subject) => {
			if (subject.name === this.props.class) currentSubject = subject;
		});

		return (
			<div class={style.class + ' fadeIn'}>

				{currentSubject ? <div>
					<div class={style.listElement}>
						<i class="material-icons">&#xE878;</i>
						<span>10:30 - 11:40 AM Today</span>
					</div>
					<div class={style.listElement}>
						<i class="material-icons">&#xE80C;</i>
						<span>{currentSubject.teacher}</span>
					</div>
					<div class={style.listElement}>
						<i class="material-icons">&#xEB3F;</i>
						<span>{currentSubject.room}</span>
					</div>
					<hr />
					<h4>Tasks due for this class</h4>

					{taskList.map((task) => {
						if (task.subjectRef === currentSubject.id) {
							return (
								<div class={style.taskListElement} onClick={() => route('/task/' + task.id, false)}>
									<span class={style.taskTimeLeft}>{task.timeLeft}</span>
									<h5>{task.title}</h5>
									<span class={style.taskDescription}>{task.body}</span>
									<div class={style.colorIndicator} style={{ backgroundColor: currentSubject.color }} />
								</div>
							);
						}
					})}

				</div> : <div>
						Class not found: {this.props.class}
				</div>}
			</div>
		);
	}
}