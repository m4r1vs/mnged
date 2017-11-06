import { h } from 'preact';
import style from './style';

export const DefaultButton = props => (
	<button class={style.button + ' ' + props.extraClass} {...props}>
		{props.name ? props.name : props.children}
	</button>
);

export const CancelButton = props => (
	<button class={style.button + ' ' + style.cancelButton} {...props}>
		{props.name ? props.name : props.children}
	</button>
);

export const SubmitButton = props => (
	<input value={props.name} type="submit" class={style.button} {...props} />
);

export default DefaultButton;