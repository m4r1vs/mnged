import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import style from './style';

@observer
export default class Task extends Component {

	constructor() {
		super();
		this.state = {
			task: null
		};
	}
  
	componentWillMount() {
		if (this.props.store.tasks) {
			this.props.store.tasks.forEach((task) => {
				if (task.id === this.props.task) this.setState({ task });
			});
		}
	}
  
	componentDidMount() {
		if (this.state.task) {
			this.props.store.general = {
				...this.props.store.general,
				headerTitle: this.state.task.title
			};
		}
		else {
			this.props.store.general = {
				...this.props.store.general,
				headerTitle: 'class not found: ' + this.props.task
			};
		}
		const navbtn = document.getElementById('navbtn');
		const header = document.getElementById('header');
		if (navbtn) navbtn.setAttribute('id', 'navbtn-arrow');
		if (header) header.setAttribute('id', 'header-big');
	}
  
	componentWillUnmount() {
		this.props.store.general = {
			...this.props.store.general,
			headerTitle: null
		};
		const navbtn = document.getElementById('navbtn-arrow');
		const header = document.getElementById('header-big');
		if (navbtn) navbtn.setAttribute('id', 'navbtn');
		if (header) header.setAttribute('id', 'header');
	}

	render() {

		const { tasks } = this.props.store;
		let currentTask = null;

		tasks.forEach((task) => {
			if (task.id === this.props.task) currentTask = task;
		});

		return (
			<div class={style.task + ' fadeIn'}>
				{currentTask ? <div>
					<div class={style.listElement}>
						<i class="material-icons">&#xE80C;</i>
						<span>{currentTask.body}</span>
					</div>
					<div class={style.listElement}>
						<i class="material-icons">&#xEB3F;</i>
						<span>{currentTask.title}</span>
					</div>
				</div> : <div>
					Task not found: {this.props.task}
				</div>}
			</div>
		);
	}
}