import { h } from 'preact';
import style from './style';

const TextInput = props => (
	<div class={style.inputGroup}>
		<input name={props.name} type="text" ref={props.inputRef} required />
		<span class={style.bar} />
		<label for={props.name}>{props.name}</label>
	</div>
);

export default TextInput;