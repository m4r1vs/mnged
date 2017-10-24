import { h } from 'preact';

import style from './style';

const DayNavigator = props => (
	<div class={style.dayNavigator} id="daypicker">
		<button onClick={props.leftAction} class={style.left}>
			<i class="material-icons">&#xE314;</i>
		</button>
		<h2>
			{props.title}
		</h2>
		<button onClick={props.rightAction} class={style.right}>
			<i class="material-icons">&#xE315;</i>
		</button>
	</div>
);

export default DayNavigator;