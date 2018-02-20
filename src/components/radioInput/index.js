import { h } from 'preact';

import style from './style';

const RadioInput = props => (
	<div class={style.radio}>
		<input onChange={props.eventHandlerChange} onKeyUp={props.eventHandlerKeyUp} id={props.id} value={props.id} type="radio" name={props.group} checked={props.checked} />
		<label tabIndex={0} onKeyUp={props.eventHandlerKeyUp} for={props.id}>{props.value}</label>
	</div>
);

export default RadioInput;