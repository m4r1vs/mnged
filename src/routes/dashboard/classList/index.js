import { h } from 'preact';
import { route } from 'preact-router';
import style from './style';

const classList = props => {

	const routeToClass = () => route('/class/' + props.block.name, false);

	return (
		<div class={style.classList + ' fadeIn'} onClick={routeToClass}>
			<div class={style.colorIndicator} style={{ backgroundColor: props.block.color }} />
			<h3>{props.block.name}</h3>
			<span class={style.room}>{props.block.room}</span>
			<span class={style.teacher}><i class="material-icons">&#xE80C;</i> {props.block.teacher}</span>
		</div>
	);
}

export default classList;