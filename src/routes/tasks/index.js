import { h, Component } from 'preact';
import { route } from 'preact-router';
import { observer } from 'preact-mobx';
import { firestore } from '../../lib/firebase';
import style from './style';

import FloatingActionButton from '../../components/floatingActionButton';

@observer
export default class Task extends Component {
  
	removeTask(task) {

		const oldTask = {
			body: task.body,
			due: task.due,
			subject: task.subjectRef,
			title: task.title
		};

		console.log(oldTask);

		firestore
			.collection('users')
			.doc('aqCB6Pw5QZSgNuxzueuR')
			.collection('tasks')
			.doc(task.id)
			.delete()
			.then(() => {
				this.props.store.showSnackbar('Task deleted', 'UNDO', 7000, () => {
					firestore.collection('users')
						.doc('aqCB6Pw5QZSgNuxzueuR')
						.collection('tasks')
						.doc(task.id)
						.set(oldTask)
						.then(() => this.props.store.showSnackbar('Task restored', null, 2500))
						.catch((e) => this.props.store.throwError('#005', 'Error restoring task'));
				});
			})
			.catch((e) => this.props.store.throwError('#003', 'Error deleting task'));
	}
  
	render() {

		const { taskList, classes } = this.props.store;
		
		const subjectColor = task => {
			let color = '#555555';
			classes.forEach((subject) => {
				if (subject.id === task.subjectRef) color = subject.color;
			});
			return color;
		};

		return (
			<div class={style.tasks + ' fadeIn'}>
				<FloatingActionButton onClick={() => route('/tasks/add', false)}>&#xE145;</FloatingActionButton>
				{taskList.map((task) => (
					<div key={task.id} class={style.taskElement}>
						<div class={style.colorIndicator} style={{ backgroundColor: subjectColor(task) }} />
						<span class={style.timeLeft}>{task.timeLeft}</span>
						<h3>{task.title}</h3>
						<span class={style.body}>{task.body}</span><br />
						{<button onClick={() => this.removeTask(task)}>remove</button>}
					</div>
				))}
				{(taskList.length <= 0) && <center>No Tasks</center>}
			</div>
		);
	}
}
