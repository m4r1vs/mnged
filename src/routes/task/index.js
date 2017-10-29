import { h, Component } from 'preact';
import { route } from 'preact-router';
import { observer } from 'preact-mobx';
import { firestore, auth } from '../../lib/firebase';
import style from './style';

@observer
export default class Task extends Component {
	
	removeTask(task) {
		
		const oldTask = {
			body: task.body,
			due: task.due,
			subject: task.subjectRef,
			title: task.title
		};
		
		firestore
			.collection('users')
			.doc(auth.currentUser.uid)
			.collection('tasks')
			.doc(task.id)
			.delete()
			.then(() => {
				route('/tasks');
				this.props.stores.uiStore.showSnackbar('Task deleted', 'UNDO', 7000, () => {
					firestore.collection('users')
						.doc(auth.currentUser.uid)
						.collection('tasks')
						.doc(task.id)
						.set(oldTask)
						.then(() => this.props.stores.uiStore.showSnackbar('Task restored', null, 2500))
						.catch((e) => this.props.stores.uiStore.throwError('#005', 'Error restoring task'));
				});
			})
			.catch((e) => this.props.stores.uiStore.throwError('#003', 'Error deleting task'));
	}
  
	componentDidMount() {
		this.props.stores.taskStore.setDisplayedTask(this.props.task);
		const displayedTask = this.props.stores.taskStore.getDisplayedTask;
		
		this.props.stores.uiStore.setSubPage({
			headerTitle: displayedTask ? displayedTask.title : 'Task not found',
			headerColor: null,
			headerAction: () => displayedTask ? this.removeTask(displayedTask) : () => this.props.stores.uiStore.showSnackbar('Error removing Task', null, 5000),
			headerActionIcon: 'delete'
		});
	}

	componentWillUnmount() {
		this.props.stores.uiStore.setSubPage(false);
	}
	
	render({ stores, task }) {
		
		const displayedTask = stores.taskStore.getDisplayedTask;

		return (
			<div class={style.task + ' fadeIn'}>
				{displayedTask ? <div>
					<div class={style.listElement}>
						<i class="material-icons">&#xE80C;</i>
						<span>{displayedTask.body}</span>
					</div>
					<div class={style.listElement}>
						<i class="material-icons">&#xEB3F;</i>
						<span>{displayedTask.title}</span>
					</div>
				</div> : <div>
					Task not found: {task}
				</div>}
			</div>
		);
	}
}