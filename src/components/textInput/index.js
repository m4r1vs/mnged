import { h } from 'preact';
import style from './style';

const TextInput = props => (
	<div class={style.inputGroup}>
		<input onChange={props.eventHandler && props.eventHandler} name={props.name} type={props.inputType || 'text'} ref={props.inputRef} required />
		<span class={style.bar} />
		<label for={props.name}>{props.displayName || props.name}</label>
	</div>
);

export default TextInput;