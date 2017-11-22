import { h, Component } from 'preact';
import { firestore, auth } from '../../lib/firebase';
import { observer } from 'preact-mobx';

import style from './style';

import AddTask from './addTask';
import TaskItem from './taskItem';
import FloatingActionButton from '../../components/floatingActionButton';

@observer
export default class Home extends Component {
	
	addTask() {
		firestore
			.collection('user-data')
			.doc(auth.currentUser.uid)
			.collection('tasks')
			.doc()
			.set({
				title: 'Auto generated Task',
				due: new Date()
			});
	}

	componentDidMount() {
		console.warn('HOME COMPONENT MOUNTED');
	}

	render({ stores }) {

		return (
			<div class={style.home} >
				<AddTask stores={stores} />
				<h2 class={style.title}>Up Next</h2>
				{stores.taskStore.listTasksByDate.map(task => (
					<TaskItem key={task.id} task={task} uiStore={stores.uiStore} />
				))}
			</div>
		);
	}
}