import { h } from 'preact';
import style from './style';

export const DefaultButton = props => (
	<button class={style.button} {...props}>
		{props.name}
	</button>
);

export const CancelButton = props => (
	<button class={style.button + ' ' + style.cancelButton} {...props}>
		{props.name}
	</button>
);

export default DefaultButton;