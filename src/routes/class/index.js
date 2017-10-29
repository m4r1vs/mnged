import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import { route } from 'preact-router';
import style from './style';

import Card from '../../components/card';
@observer
export default class Class extends Component {
  
	componentDidMount() {
		this.props.stores.classesStore.setDisplayedClass(this.props.class);
		const displayedClass = this.props.stores.classesStore.getDisplayedClass;

		this.props.stores.uiStore.setSubPage({
			headerTitle: displayedClass ? displayedClass.name : 'Class not found',
			headerColor: displayedClass ? displayedClass.color : null,
			headerAction: () => displayedClass ? route('/edit-class/'+displayedClass.name) : () => this.props.stores.uiStore.showSnackbar('No class selected', null, 5000),
			headerActionIcon: 'edit'
		});
	}

	componentWillUnmount() {
		this.props.stores.uiStore.setSubPage(false);
	}

	render({ stores }) {

		const { taskList } = stores.taskStore;
		const displayedClass = stores.classesStore.getDisplayedClass;

		return (
			<div class={style.class + ' fadeIn'}>

				<Card class={style.card}>

					{displayedClass ? <div style={{ display: 'inline-block', width: '100%' }}>
						<div class={style.listElement}>
							<i class="material-icons">&#xE878;</i>
							<span>10:30 - 11:40 AM Today</span>
						</div>
						<div class={style.listElement}>
							<i class="material-icons">&#xE80C;</i>
							<span>{displayedClass.teacher}</span>
						</div>
						<div class={style.listElement}>
							<i class="material-icons">&#xEB3F;</i>
							<span>{displayedClass.room}</span>
						</div>
						<h4>Tasks due for this class</h4>

						{taskList.map((task) => {
							if (task.subjectRef === displayedClass.id) {
								return (
									<div class={style.taskListElement} onClick={() => route('/task/' + task.id, false)}>
										<div class={style.colorIndicator} style={{ backgroundColor: displayedClass.color }} />
										<span class={style.taskTimeLeft}>{task.timeLeft}</span>
										<h5>{task.title}</h5>
										<span class={style.taskDescription}>{task.body}</span>
									</div>
								);
							}
						})}

					</div> : <div style={{ display: 'inline-block', width: '100%' }}>
						Class not found: {this.props.class}
					</div>}

				</Card>
			</div>
		);
	}
}