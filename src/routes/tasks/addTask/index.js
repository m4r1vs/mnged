import { h, Component } from 'preact';
import { route } from 'preact-router';
import { observer } from 'preact-mobx';
import { firestore } from '../../../lib/firebase';
import style from './style';

import TextInput from '../../../components/textInput';

@observer
export default class AddTask extends Component {

	addTask() {
		firestore
			.collection('users')
			.doc('aqCB6Pw5QZSgNuxzueuR')
			.collection('tasks')
			.add({
				body: this.taskBody.value || 'No body',
				due: this.taskDue.value ? new Date(this.taskDue.value) : new Date(),
				subject: this.taskSubject.value || null,
				title: this.taskTitle.value || 'not given'
			})
			.then((doc) => {
				this.props.store.showSnackbar('Task created', 'SHOW', 5000, () => {
					route('/task/'+doc.id, true);
				});
				route('/tasks/', true);
			})
			.catch((err) => this.props.store.throwError('#003'));
	}
  
	render() {
    
		const { classes } = this.props.store;

		return (
			<div class={style.addTask + ' fadeIn'}>
				<div>
					<TextInput name="title" inputRef={(input) => this.taskTitle = input} required />
					<TextInput name="note" inputRef={(input) => this.taskBody = input} required />
					<select ref={(input) => this.taskSubject = input}>

						{classes.map((subject) => (
							<option value={subject.id}>{subject.name}</option>
						))}

					</select>
					<input placeholder="due date" type="date" ref={(input) => this.taskDue = input} />
					<button onClick={this.addTask.bind(this)}>Add Task</button>
				</div>
			</div>
		);
	}
}