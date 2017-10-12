import { h, Component } from 'preact';
import { route } from 'preact-router';
import { observer } from 'preact-mobx';
import style from './style';

import FloatingActionButton from '../../components/floatingActionButton';

@observer
export default class Task extends Component {
  
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
					<div key={task.id} class={style.taskElement} onClick={() => route('/task/'+task.id)}>
						<div class={style.colorIndicator} style={{ backgroundColor: subjectColor(task) }} />
						<span class={style.timeLeft}>{task.timeLeft}</span>
						<h3>{task.title}</h3>
						<span class={style.body}>{task.body}</span><br />
					</div>
				))}
				{(taskList.length <= 0) && <center>No Tasks</center>}
			</div>
		);
	}
}
