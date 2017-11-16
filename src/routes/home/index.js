import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import style from './style';

import TaskItem from './taskItem';
import FloatingActionButton from '../../components/floatingActionButton';

@observer
export default class Home extends Component {

	componentDidMount() {
		console.warn('HOME COMPONENT MOUNTED');
	}

	render({ stores }) {

		return (
			<div class={style.home} >
				<FloatingActionButton onClick={() => route('/tasks/add', false)}>&#xE145;</FloatingActionButton>
				{stores.taskStore.listTasksByDate.map(task => (
					<TaskItem key={task.id} task={task} />
				))}
			</div>
		);
	}
}