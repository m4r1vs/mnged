import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import { route } from 'preact-router';
import { firestore, auth } from '../../../lib/firebase';

import style from './style';

@observer
export default class AddTask extends Component {

	createTask(e) {
		e.preventDefault();
    
		if (!this.inputTask.value) {
			this.props.stores.uiStore.showSnackbar(`Please don't submit an empty Task`, null, 4500);
			return false;
		}
    
		firestore
			.collection('user-data')
			.doc(auth.currentUser.uid)
			.collection('tasks')
			.add({
				title: this.inputTask.value,
				due: new Date(),
				created: new Date(),
				group: 'orange'
			})
			.then(task => {
				console.log(task);
				this.inputTask.value = '';
				this.props.stores.uiStore.showSnackbar(`Task successfully created!`, 'SHOW', 4500, () => route('/task/' + task.id));
			})
			.catch(err => {
				console.error(err);
				this.props.stores.uiStore.showSnackbar(`Error creating Task. See console for technical information`, null, 4500);
			});
	}

	constructor() {
		super();
		this.createTask = this.createTask.bind(this);
	}

	render() {
		return (
			<form class={style.addTask + ' card box-shadow-lvl-2'} onSubmit={this.createTask} autocomplete="off">
				<textarea ref={el => this.inputTask = el} type="text" name="task" placeholder="I want to.." autocomplete="off" />
			</form>
		);
	}
}