import { h } from 'preact';
import style from './style';

const TextInput = props => (
	<div class={style.inputGroup}>
		<input
			style={{ borderBottomColor: props.color || '#757575', color: props.color || 'initial' }}
			incomplete={props.incomplete}
			onChange={props.eventHandler && props.eventHandler}
			onFocus={props.inputOnFocus && props.inputOnFocus}
			name={props.name}
			type={props.inputType || 'text'}
			ref={props.inputRef}
			required={props.required}
		/>
		<span style={{ background: props.color || 'var(--secondary-color-dark)' }} class={style.bar} />
		<label class={!props.color && style.important} style={{ color: props.color || '#999' }} for={props.name}>{props.displayName || props.name}</label>
	</div>
);

export default TextInput;