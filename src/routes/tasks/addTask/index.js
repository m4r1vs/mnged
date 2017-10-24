import { h, Component } from 'preact';
import { route } from 'preact-router';
import { observer } from 'preact-mobx';
import { firestore, auth } from '../../../lib/firebase';
import style from './style';

import TextInput from '../../../components/textInput';
import SelectInput from '../../../components/selectInput';
import DefaultButton from '../../../components/button';

@observer
export default class AddTask extends Component {

	addTask() {

		this.taskTitle.setAttribute('incomplete', 'false');
		this.taskBody.setAttribute('incomplete', 'false');
		this.taskDue.setAttribute('incomplete', 'false');
		this.taskSubject.setAttribute('incomplete', 'false');

		if (!this.taskTitle.value) this.taskTitle.setAttribute('incomplete', 'true');
		if (!this.taskBody.value) this.taskBody.setAttribute('incomplete', 'true');
		if (!this.taskDue.value) this.taskDue.setAttribute('incomplete', 'true');
		if (!this.taskSubject.value) this.taskSubject.setAttribute('incomplete', 'true');

		if (this.taskTitle.value && this.taskBody.value && this.taskDue.value && this.taskSubject.value) {
			firestore
				.collection('users')
				.doc(auth.currentUser.uid)
				.collection('tasks')
				.add({
					body: this.taskBody.value || 'No body',
					due: this.taskDue.value ? new Date(this.taskDue.value) : this.props.stores.uiStore.currentTime,
					subject: this.taskSubject.value || null,
					title: this.taskTitle.value || 'not given'
				})
				.then((doc) => {
					this.taskTitle.value = '';
					this.taskBody.value = '';
					this.taskDue.value = '';
					this.taskSubject.value = '';
					this.props.stores.uiStore.showSnackbar('Task created', 'SHOW', 5000, () => {
						route('/task/'+doc.id, true);
					});
					route('/tasks/', true);
				})
				.catch((err) => console.error(err));
		}
		else {
			this.props.stores.uiStore.showSnackbar('Please fill all inputs', null, 4000);
		}
	}
  
	render() {
    
		const { classes } = this.props.stores.classesStore;

		return (
			<div class={style.addTask + ' fadeIn'}>
				<div class={style.wrapper}>
					<h2>Add a Task</h2>
					<TextInput name="Title" inputRef={(input) => this.taskTitle = input} required />
					<TextInput name="Description" inputRef={(input) => this.taskBody = input} required />
					<SelectInput inputRef={(input) => this.taskSubject = input}>

						<option value="" disabled selected>Choose a class</option>
						{classes.map((subject) => (
							<option value={subject.id}>{subject.name}</option>
						))}

					</SelectInput>
					<input placeholder="due date" type="date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" ref={(input) => this.taskDue = input} />
					<DefaultButton onClick={this.addTask.bind(this)} name="Add Task" style={{
						float: 'right',
						margin: '16px 0 8px 0'
					}}
					/>
				</div>
			</div>
		);
	}
}