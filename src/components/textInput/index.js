import { h } from 'preact';
import style from './style';

const TextInput = props => (
	<div class={style.inputGroup}>
		<input
			style={{ borderBottomColor: props.color, color: props.color }}
			incomplete={props.incomplete}
			onChange={props.eventHandler && props.eventHandler}
			onFocus={props.inputOnFocus && props.inputOnFocus}
			name={props.name}
			type={props.inputType || 'text'}
			ref={props.inputRef}
			required={props.required}
		/>
		<span style={{ background: props.color }} class={style.bar} />
		<label style={{ color: props.color }} for={props.name}>{props.displayName || props.name}</label>
	</div>
);

export default TextInput;