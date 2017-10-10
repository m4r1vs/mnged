import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import { firestore } from '../../lib/firebase';
import style from './style';

@observer
export default class Task extends Component {

	addTask() {
		console.log(this.taskBody);
		firestore
			.collection('users')
			.doc('aqCB6Pw5QZSgNuxzueuR')
			.collection('tasks')
			.doc()
			.set({
				body: this.taskBody.value || 'No body',
				due: this.taskDue.value ? new Date(this.taskDue.value) : new Date(),
				subject: this.taskSubject.value || 'not given',
				title: this.taskTitle.value || 'not given'
			});
	}
  
	removeTask(id) {
		firestore
			.collection('users')
			.doc('aqCB6Pw5QZSgNuxzueuR')
			.collection('tasks')
			.doc(id)
			.delete()
			.catch((e) => {
				this.props.store.throwError('#003', 'Error deleting task');
			});
	}
  
	componentDidMount() {
		console.log(this.props.store.taskList);
	}
  
	render() {
		const { taskList } = this.props.store;

		return (
			<div class={style.tasks}>
				{taskList.map((task) => (
					<div key={task.id} class={style.taskElement}>
						<span>{task.timeLeft}</span>
						<h4>{task.title}</h4>
						<span>{task.body}</span><br />
						<button onClick={() => this.removeTask(task.id)}>remove</button>
					</div>
				))}
				<input placeholder="title" type="text" ref={(input) => { this.taskTitle = input; }} /> <br />
				<input placeholder="body" type="text" ref={(input) => { this.taskBody = input; }} /> <br />
				<input placeholder="subject" type="text" ref={(input) => { this.taskSubject = input; }} /> <br />
				<input placeholder="due date" type="date" ref={(input) => { this.taskDue = input; }} />
				<button onClick={this.addTask.bind(this)}>Add Task</button>
			</div>
		);
	}
}
