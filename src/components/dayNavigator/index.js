import { h, Component } from 'preact';

import style from './style';

export default class DayNavigator extends Component {

	componentDidMount() {
		this.props.stores.uiStore.toggleDayNav();
	}

	componentWillUnmount() {
		this.props.stores.uiStore.toggleDayNav();
	}

	render() {
		return (
			<div class={style.dayNavigator} id="daypicker">
				<button onClick={this.props.leftAction} class={style.left}>
					<i class="material-icons">&#xE314;</i>
				</button>
				<h2>
					{this.props.title}
				</h2>
				<button onClick={this.props.rightAction} class={style.right}>
					<i class="material-icons">&#xE315;</i>
				</button>
			</div>
		);
	}
}