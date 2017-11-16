import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import style from './style';

@observer
export default class Home extends Component {

	componentDidMount() {
		console.warn('HOME COMPONENT MOUNTED');
	}

	render({ stores }) {

		return (
			<div class={style.home} >
        Hello {stores.userStore.user && stores.userStore.user.uid}!
				{stores.taskStore.listTasksByDate.map(task => (
					<div key={task.id}>{task.title}</div>
				))}
			</div>
		);
	}
}